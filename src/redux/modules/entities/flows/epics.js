/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntity,
  getSelectedSubEntityId,
  getSelectedSubEntityName,
  getSelectedSubEntityData,
  userHasPermissions
} from '../selectors';
import { change } from 'redux-form';
import { getNewFlowDraftName } from './selectors';

export const FetchDataItem = (action$, store) =>
  action$
    .ofType('FETCH_DATA_ITEM', 'FETCH_DATA_FLOW')
    .debounceTime(300)
    .filter(({ entityName }) => entityName === 'flows')
    .map(a => {
      a.sdkCall = entitiesMetaData['flows'].entityApiRequest('get', 'singleMainEntity');
      a.sdkCall.data = {
        flowId: a.id,
        includeDrafts:
          userHasPermissions(store.getState(), ['MANAGE_ALL_FLOWS']) &&
          getCurrentEntity(store.getState()) !== 'dispatchMappings'
      };
      return { ...a };
    })
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const CreateFlow = action$ =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'flows')
    .map(a => {
      a.sdkCall = entitiesMetaData['flows'].entityApiRequest('create', 'singleMainEntity');
      a.sdkCall.data = {
        ...a.values,
        flowType: a.values.type,
        active: false
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `Flow was created successfully!`))
        .catch(error => handleError(error, a))
    );

export const CreateFlowFullfilled = action$ =>
  action$
    .ofType('CREATE_ENTITY_FULFILLED', 'CREATE_FLOW_DRAFT_FULFILLED')
    .filter(({ entityName }) => entityName === 'flows')
    .map(a => {
      if (a.type === 'CREATE_FLOW_DRAFT_FULFILLED' && a.subEntityName === undefined) {
        // We don't need to redirect to draft view when creating
        // new draft from scratch
        return {
          ...a,
          type: 'CREATE_FLOW_VERSION_DRAFT_FULFILLED'
        };
      } else if (a.selectedSubEntityId === 'drafts' && a.subEntityName === 'versions') {
        // When editing a version, new draft is created and we have to open
        // flow-designer with its data
        return {
          row: {
            flowId: a.response.result.flowId,
            draftId: a.response.result.id,
            name: a.response.result.name
          },
          type: 'OPEN_FLOW_DESIGNER'
        };
      } else {
        // When copying flow or draft, new flow with its own initial draft is created
        // we have to open draft with data copied from original
        return {
          row: {
            flowId: a.response.result.id,
            draftId: a.response.result.drafts[0].id,
            name: a.response.result.drafts[0].name
          },
          type: 'OPEN_FLOW_DESIGNER'
        };
      }
    });

export const CreateFlowDraft = action$ =>
  action$
    .ofType('CREATE_FLOW_DRAFT')
    .map(a => ({
      ...a,
      sdkCall: {
        command: 'createFlowDraft',
        data: {
          ...a.values,
          flowId: a.entityId
        },
        module: 'entities',
        topic: 'cxengage/entities/create-flow-draft-response'
      }
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `Flow draft was created successfully!`))
        .catch(error => handleError(error, a))
    );

export const UpdateFlow = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'flows')
    .map(a => {
      a.sdkCall = entitiesMetaData['flows'].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.data = {
        ...a.values,
        flowType: a.values.type,
        flowId: a.entityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `Flow was updated successfully!`))
        .catch(error => handleError(error, a))
    );

export const CopyFlowFormSubmission = (action$, store) =>
  action$
    .ofType('COPY_LIST_ITEM_FORM_SUBMIT')
    .debounceTime(300)
    .filter(({ dirty }) => dirty)
    .map(a => ({
      ...a,
      selectedSubEntityId: getSelectedSubEntityId(store.getState())
    }))
    .filter(({ selectedSubEntityId }) => selectedSubEntityId)
    .map(a => {
      a.subEntityName = getSelectedSubEntityName(store.getState());
      a.row = getSelectedSubEntityData(store.getState());
      a.entityName = getCurrentEntity(store.getState());
      a.entityId = getSelectedEntityId(store.getState());
      if (a.selectedSubEntityId === 'drafts' && a.row === undefined && a.subEntityName === undefined) {
        //When creating a draft, we don't need
        //current flow data, just flowId
        a.values = a.values.toJS();
      } else {
        //When copying a flow or a draft, we create a new flow
        //with same type, flow string configuration and metadata.
        //When editing a version, we create a new draft and use
        //data from existing version
        a.values = {
          ...a.values.toJS(),
          type: getSelectedEntity(store.getState()).get('type'),
          flow: a.row.flow,
          metadata: a.row.metadata || ''
        };
      }
      return { ...a };
    })
    // We forward copy handle to create action with data set to
    // create new flow with initial draft from original
    .map(a => ({
      ...a,
      type: a.selectedSubEntityId === 'drafts' ? 'CREATE_FLOW_DRAFT' : 'CREATE_ENTITY',
      values: a.values,
      entityName: a.entityName,
      entityId: a.entityId,
      selectedSubEntityId: a.selectedSubEntityId
    }));

export const RemoveFlowDraft = (action$, store) =>
  action$
    .ofType('REMOVE_LIST_ITEM')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      listId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'flows')
    .map(a => ({
      ...a,
      sdkCall: {
        command: 'removeFlowDraft',
        data: {
          flowId: a.listId,
          draftId: a.listItemId
        },
        module: 'entities',
        topic: 'cxengage/entities/remove-flow-draft-response'
      }
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const OpenFlowDesigner = action$ =>
  action$
    .ofType('OPEN_FLOW_DESIGNER')
    .map(a => ({
      ...a,
      sdkCall: {
        module: `FlowDesigner.${a.row.version !== undefined ? 'openPublishedVersion' : 'draftPublished'}`,
        data: {
          flowId: a.row.flowId,
          versionId: a.row.version,
          draftId: a.row.id || a.row.draftId
        }
      }
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `You will be redirected to ${a.row.name}`))
        .catch(error => handleError(error, a))
    );

export const FocusCopyFlowDraftFormField = (action$, store) =>
  action$
    .ofType('@@redux-form/REGISTER_FIELD')
    .filter(a => a.meta.form === 'copyFlow:create' && a.payload.name === 'name')
    .map(a => change(a.meta.form, 'name', getNewFlowDraftName(store.getState())));
