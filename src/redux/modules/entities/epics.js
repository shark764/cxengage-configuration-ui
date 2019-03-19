/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Toast } from 'cx-ui-components';
import { clearFields, touch, change } from 'redux-form';

import * as MODALS from '../../../containers/ConfirmationDialog/constants.js';

import { sdkPromise } from '../../../utils/sdk';
import { handleError, handleSuccess, handleBulkSuccess } from './handleResult';

import { entityAddedToList, entityRemovedFromList } from '../../modules/entities/listItemSelectors';

import { uploadCsv, setEntityUpdating } from './index';
import { isInIframe } from 'serenova-js-utils/browser';
import { generateUUID } from 'serenova-js-utils/uuid';

import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntity,
  getCurrentSubEntity,
  getSelectedSubEntityId,
  getSelectedEntityStatus,
  getConfirmationDialogType,
  getConfirmationDialogMetaData,
  getSelectedEntityName,
  getSelectedEntityBulkChangeItems,
  getSelectedEntityFormId
} from './selectors';

import { getHasProficiencyFormValue } from './skills/selectors';

import { entitiesMetaData } from './metaData';

import { hasCustomCreateEntity, hasCustomUpdateEntity, hasCustomRemoveSubEntity } from './config';

import { downloadFile } from 'serenova-js-utils/browser';
import {
  removeLastLetter,
  camelCaseToRegularForm,
  camelCaseToRegularFormAndRemoveLastLetter,
  camelCaseToKebabCase
} from 'serenova-js-utils/strings';

import { getCurrentSharedValue } from './reasons/selectors';

/**
 * Note: When you see the variable 'a' shorthand being used
 * it represents the keyword 'action'
 * Redux observable epics are actions in and actions out,
 * you will notice we keep the original action and just add
 * to it as it passes throught the observable
 *
 */

export const StartFormSubmission = (action$, store) =>
  action$
    .ofType('START_FORM_SUBMISSION')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      selectedIdentityId: getSelectedEntityId(store.getState())
    }))
    .map(a => ({
      type: '@@redux-form/SUBMIT',
      meta: { form: `${a.entityName}:${a.selectedIdentityId}` }
    }));

export const reInitForm = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    // This filter prevents entity form from reinitializing
    // when modifying entity membersList
    // values just contains the dependentEntity as key
    .filter(a => a.values.id !== undefined)
    .map(a => {
      if (a.entityName && a.entityName === 'users') {
        a.values.extensions.forEach(ext => (ext.id = generateUUID()));
        return a;
      } else {
        return a;
      }
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.entityId}`
      },
      payload: { ...a.values }
    }));

export const ClearBulkFormFields = action$ =>
  action$
    .ofType('@@redux-form/UNREGISTER_FIELD')
    .filter(a => a.meta.form.includes('bulk'))
    .map(a => clearFields(a.meta.form, false, false, a.payload.name));

export const ClearCustomMetricsFormFields = action$ =>
  action$
    .ofType('@@redux-form/UNREGISTER_FIELD')
    .filter(a => a.meta.form.includes('customMetrics'))
    .filter(a => a.payload.name.includes('slaAbandonThreshold'))
    .map(a => clearFields(a.meta.form, false, false, a.payload.name));

export const FocusOutboundIdentifiersValueFormField = (action$, store) =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(
      a =>
        a.meta.form.includes('outboundIdentifiers') &&
        a.meta.field.includes('channelType') &&
        getSelectedEntity(store.getState()) !== undefined
    )
    .map(a => touch(a.meta.form, 'value'));

export const ToggleHasProficiencyFormField = (action$, store) =>
  action$
    .ofType('TOGGLE_PROFICIENCY')
    .map(a =>
      change(getSelectedEntityFormId(store.getState()), 'hasProficiency', !getHasProficiencyFormValue(store.getState()))
    );

export const FormSubmission = (action$, store) =>
  action$
    .ofType('FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState())
    }))
    .map(a => {
      if (a.selectedEntityId === 'create') {
        return {
          type: 'CREATE_ENTITY',
          entityName: a.entityName,
          values: a.values.toJS()
        };
      } else if (a.selectedEntityId === 'bulk') {
        return {
          type: 'BULK_ENTITY_UPDATE',
          entityName: a.entityName,
          values: a.values.toJS()
        };
      } else {
        return {
          type: 'UPDATE_ENTITY',
          entityName: a.entityName,
          entityId: a.selectedEntityId,
          values: a.values.toJS()
        };
      }
    });

export const ToggleSharedFormField = (action$, store) =>
  action$
    .ofType('TOGGLE_SHARED')
    .map(a => change(getSelectedEntityFormId(store.getState()), 'shared', !getCurrentSharedValue(store.getState())));

export const FetchData = action$ =>
  action$.ofType('FETCH_DATA').mergeMap(a =>
    fromPromise(sdkPromise(entitiesMetaData[a.entityName].entityApiRequest('get', 'mainEntity')))
      .map(response => handleSuccess(response, a))
      .catch(error => handleError(error, a))
  );

export const FetchDataItem = action$ =>
  action$
    .ofType('FETCH_DATA_ITEM', 'FETCH_DATA_FLOW')
    .debounceTime(300)
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('get', 'singleMainEntity');
      a.sdkCall.data = { [removeLastLetter(a.entityName) + 'Id']: a.id };
      return { ...a };
    })
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const getTenantPermissions = action$ =>
  action$
    .ofType('SET_CURRENT_ENTITY', 'START_SUPERVISOR_TOOLBAR_$', 'FETCH_BRANDING_$')
    .filter(a => !isInIframe())
    .switchMap(a =>
      fromPromise(
        sdkPromise({
          module: 'updateLocalStorage',
          command: `updateLocalStorage`,
          data: 'updateLocalStorage',
          topic: 'updateLocalStorage'
        })
      ).map(response => ({
        type: 'UPDATE_USER_PERMISSIONS',
        tenantInfo: {
          tenantId: response.tenant.tenantId,
          tenantName: response.tenant.tenantName,
          tenantPermissions: response.tenant.tenantPermissions
        },
        agentId: response.agentId
      }))
    );

export const CreateEntity = (action$, store) =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => hasCustomCreateEntity(entityName))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('create', 'singleMainEntity');
      a.sdkCall.path = [camelCaseToKebabCase(a.entityName)];
      a.sdkCall.data = a.values;
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was created successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const CreateEntityFullfilled = action$ =>
  action$.ofType('CREATE_ENTITY_FULFILLED', 'COPY_CURRENT_ENTITY_FULFILLED').map(a => ({
    type: 'SET_SELECTED_ENTITY_ID',
    entityId: a.response.result.id || a.response.result.userId
  }));

export const CopyEntity = (action$, store) =>
  action$
    .ofType('COPY_CURRENT_ENTITY')
    .map(a => {
      a.entityName = getCurrentEntity(store.getState());
      a.sdkCall = entitiesMetaData[getCurrentEntity(store.getState())].entityApiRequest('create', 'singleMainEntity');
      a.sdkCall.data = getSelectedEntity(store.getState()).toJS();
      a.sdkCall.data.name += ' (Copy)';
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was copied successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const UpdateEntity = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => hasCustomUpdateEntity(entityName))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.path = [camelCaseToKebabCase(a.entityName), a.entityId];
      a.sdkCall.data = {
        ...a.values,
        [removeLastLetter(a.entityName) + 'Id']: a.entityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const BulkEntityUpdate = (action$, store) =>
  action$
    .ofType('BULK_ENTITY_UPDATE')
    .filter(a => a.entityName !== 'users')
    .map(a => {
      a.allIdsToProcess = getSelectedEntityBulkChangeItems(store.getState());
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      a.allSdkCalls = [...a.allIdsToProcess.toJS()].map(item => ({
        ...a.sdkCall,
        data: {
          ...a.values,
          [removeLastLetter(a.entityName) + 'Id']: item
        }
      }));
      return { ...a };
    })
    .mergeMap(a =>
      forkJoin(
        a.allSdkCalls.map(apiCall =>
          from(
            sdkPromise(apiCall).catch(error => ({
              error: error,
              id: apiCall.data[removeLastLetter(a.entityName) + 'Id']
            }))
          )
        )
      )
        .do(allResult => handleBulkSuccess(allResult))
        .mergeMap(result => from(result).map(response => handleSuccess(response, a)))
    );

export const ToggleEntity = (action$, store) =>
  action$
    .ofType('TOGGLE_ENTITY')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      entityStatusActive: getSelectedEntityStatus(store.getState())
    }))
    .filter(a => a.entityName !== 'users')
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.data = {
        active: !a.entityStatusActive,
        [removeLastLetter(a.entityName) + 'Id']: a.selectedEntityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was ${
              a.entityStatusActive ? 'disabled' : 'enabled'
            } successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const ToggleEntityListItem = (action$, store) =>
  action$
    .ofType('TOGGLE_ENTITY_LIST_ITEM')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState())
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityListItemApiRequest('update');
      a.sdkCall.data = {
        [`${removeLastLetter(entitiesMetaData[a.entityName].dependentEntity)}Id`]: a.entity.id,
        active: !a.entity.active
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const RemoveListItem = (action$, store) =>
  action$
    .ofType('REMOVE_LIST_ITEM')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      listId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => hasCustomRemoveSubEntity(entityName))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityListItemApiRequest('remove');
      a.sdkCall.data = {
        [`${removeLastLetter(entitiesMetaData[a.entityName].entityName)}Id`]: a.listId,
        [`${removeLastLetter(entitiesMetaData[a.entityName].dependentEntity)}Id`]: a.listItemId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const AddListItem = (action$, store) =>
  action$
    .ofType('ADD_LIST_ITEM')
    .debounceTime(300)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      listId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityName !== 'roles' && a.entityName !== 'dataAccessReports')
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityListItemApiRequest('add');
      a.sdkCall.data = {
        [`${removeLastLetter(entitiesMetaData[a.entityName].entityName)}Id`]: a.listId,
        [`${removeLastLetter(entitiesMetaData[a.entityName].dependentEntity)}Id`]: a.listItemId
      };
      return a;
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const AddingListItems = (action$, store) =>
  action$
    .ofType('ADD_LIST_ITEM')
    .debounceTime(300)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityName === 'roles' || a.entityName === 'dataAccessReports')
    .map(a => ({
      ...a,
      values: {
        [entitiesMetaData[getCurrentEntity(store.getState())].dependentEntity]: entityAddedToList(
          store.getState(),
          a.listItemId
        )
      }
    }))
    .map(a => ({
      type: 'UPDATE_ENTITY',
      values: a.values,
      entityName: a.entityName,
      entityId: a.entityId
    }));

export const addAndRemoveListItemEntities = (action$, store) =>
  action$
    .ofType('TOGGLE_LIST_ITEM_ENTITY')
    .debounceTime(300)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      assoc: entitiesMetaData[getCurrentEntity(store.getState())].associations
    }))
    .map(a => ({
      ...a,
      values: {
        originEntity: {
          name: camelCaseToKebabCase(a.assoc[a.name][0]),
          id: a.assoc[a.name][0] !== a.entityName ? a.id : a.entityId
        },
        destinationEntity: {
          name: camelCaseToKebabCase(a.assoc[a.name][1]),
          id: a.assoc[a.name][1] !== a.entityName ? a.id : a.entityId
        }
      }
    }))
    .concatMap(a =>
      fromPromise(
        sdkPromise({
          module: 'entities',
          data: { ...a.values },
          command: a.actionType,
          topic: `cxengage/entities/${a.actionType}-response`
        })
      )
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const fetchEntityListItems = (action$, store) =>
  action$
    .ofType('FETCH_LIST_ITEMS')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      name: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      assoc: entitiesMetaData[getCurrentEntity(store.getState())].associations
    }))
    .map(a => ({
      ...a,
      values: {
        path: [a.entityName, a.entityId, camelCaseToKebabCase(a.associatedEntityName)]
      }
    }))
    .concatMap(a =>
      fromPromise(
        sdkPromise({
          module: 'entities',
          data: { ...a.values },
          command: 'getEntity',
          topic: `cxengage/entities/get-entity-response`
        })
      )
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const fetchEntityListItemDependency = (action$, store) =>
  action$.ofType('FETCH_LIST_ITEMS').map(a => ({
    type: 'FETCH_DATA',
    entityName: a.associatedEntityName
  }));

export const RemovingListItems = (action$, store) =>
  action$
    .ofType('REMOVE_LIST_ITEM')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityName === 'roles' || a.entityName === 'dataAccessReports')
    .map(a => ({
      ...a,
      values: {
        [entitiesMetaData[getCurrentEntity(store.getState())].dependentEntity]: entityRemovedFromList(
          store.getState(),
          a.listItemId
        )
      }
    }))
    .map(a => ({
      type: 'UPDATE_ENTITY',
      values: a.values,
      entityName: a.entityName,
      entityId: a.entityId
    }));

export const FetchFormMetaData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(a => ({
      ...a,
      currentEntityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      isDefined: name => store.getState().getIn(['Entities', name, 'data']).size === 0
    }))
    .switchMap(
      a =>
        a.entityId === 'create'
          ? from(entitiesMetaData[a.currentEntityName].createFormDependencies)
              .filter(entityName => a.isDefined(entityName))
              .map(entityName => ({ type: 'FETCH_DATA', entityName }))
          : from(entitiesMetaData[a.currentEntityName].updateFormDependencies)
              .filter(entityName => a.isDefined(entityName))
              .map(entityName => ({ type: 'FETCH_DATA', entityName }))
    );

export const FetchBulkFormMetaData = (action$, store) =>
  action$
    .ofType('TOGGLE_BULK_ENTITY_CHANGE')
    .map(a => ({
      ...a,
      entityId: getSelectedEntityId(store.getState()),
      isDefined: name => store.getState().getIn(['Entities', name, 'data']).size === 0
    }))
    .filter(a => a.entityId === 'bulk')
    .switchMap(a =>
      from(entitiesMetaData[a.entityName].bulkFormDependencies)
        .filter(entityName => a.isDefined(entityName))
        .map(entityName => ({ type: 'FETCH_DATA', entityName }))
    );

export const FetchSidePanelData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(action => ({
      ...action,
      currentEntityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityId !== 'create' && a.entityId !== '' && entitiesMetaData[a.currentEntityName].dependentEntity)
    .map(a => ({
      type: 'FETCH_DATA_ITEM',
      entityName: a.currentEntityName,
      id: a.entityId
    }));

export const SubEntityFormSubmission = (action$, store) =>
  action$
    .ofType('SUB_ENTITY_FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      selectedEntity: getSelectedEntity(store.getState()),
      subEntityName: getCurrentSubEntity(store.getState()),
      selectedSubEntityId: getSelectedSubEntityId(store.getState())
    }))
    .filter(({ selectedSubEntityId }) => selectedSubEntityId)
    .map(
      a =>
        a.selectedSubEntityId === 'create'
          ? {
              type: 'CREATE_SUB_ENTITY',
              entityName: a.entityName,
              selectedEntity: a.selectedEntity,
              subEntityName: a.subEntityName,
              values: a.values.toJS()
            }
          : {
              type: 'UPDATE_SUB_ENTITY',
              entityName: a.entityName,
              selectedEntity: a.selectedEntity,
              subEntityName: a.subEntityName,
              values: a.values.toJS()
            }
    );

export const CreateSubEntity = (action$, store) =>
  action$
    .ofType('CREATE_SUB_ENTITY')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('create', 'subEntity');
      a.sdkCall.data = {
        [`${removeLastLetter(a.entityName)}Id`]: a.entityId,
        itemValue: a.values
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(response, a, `<i>${camelCaseToRegularForm(a.entityName)}</i> was created successfully!`)
        )
        .catch(error => handleError(error, a))
    );

export const UpdateSubEntity = (action$, store) =>
  action$
    .ofType('UPDATE_SUB_ENTITY')
    .map(action => ({
      ...action,
      subEntityId: getSelectedSubEntityId(store.getState()),
      entityName: getCurrentEntity(store.getState()),
      subEntityName: getSelectedEntityName(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'subEntity');
      a.sdkCall.data = {
        listId: a.selectedEntity.get('id'),
        listItemKey: a.subEntityId,
        itemValue: a.values
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(response, a, `<i>${camelCaseToRegularForm(a.subEntityName)} </i> was updated successfully!`)
        )
        .catch(error => handleError(error, a))
    );

export const DeleteSubEntity = (action$, store) =>
  action$
    .ofType('DELETE_SUB_ENTITY')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      selectedEntity: getSelectedEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      subEntityName: getSelectedEntityName(store.getState())
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('delete', 'subEntity');
      a.sdkCall.data = {
        listId: a.entityId,
        listItemKey: a.subEntityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `<i>${camelCaseToRegularForm(a.selectedEntity.get('name'))}</i> was deleted successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const ExecuteConfirmationDialogCallback = (action$, store) =>
  action$.ofType('EXECUTE_CONFIRM_CALLBACK').switchMap(action => {
    const currentConfirmationModal = getConfirmationDialogType(store.getState());
    const metaData = getConfirmationDialogMetaData(store.getState());
    switch (currentConfirmationModal) {
      case MODALS.CONFIRM_ENTITY_ACTIVE_TOGGLE:
        return [
          {
            type: 'TOGGLE_ENTITY'
          },
          {
            type: 'SET_CONFIRMATION_DIALOG',
            modalType: undefined
          }
        ];
      case MODALS.CONFIRM_ENTITY_CSV_UPLOAD:
        return [
          uploadCsv(metaData),
          setEntityUpdating(getCurrentEntity(store.getState()), getSelectedEntityId(store.getState()), true),
          {
            type: 'SET_CONFIRMATION_DIALOG',
            modalType: undefined,
            metaData: undefined
          }
        ];
      default:
        console.log(`No epic callback found for: ${currentConfirmationModal}`);
        return {}; // nothing necessary to do here
    }
  });

export const UploadCsv = (action$, store) =>
  action$
    .ofType('UPLOAD_CSV')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState())
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('upload', 'singleMainEntity');
      a.sdkCall.data = {
        [`${removeLastLetter(a.entityName)}Id`]: a.selectedEntityId,
        file: a.target
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .do(response => {
          if (response.result.totalItemsProcessed > 0) {
            Toast.success(`
            Items Created: ${response.result.itemsCreated}
            </br>
            Items Updated: ${response.result.itemsUpdated}
            </br>
            Items Deleted: ${response.result.itemsDeleted}
            </br>
            </br>
            Total Items Processed: ${response.result.totalItemsProcessed}
          `);
          }

          if (response.result.numberOfFailures > 0) {
            Toast.error(`Number of Failures: ${response.result.numberOfFailures}`);
          }
        })
        .map(response => ({
          type: 'FETCH_DATA_ITEM',
          entityName: a.entityName,
          id: a.selectedEntityId
        }))
        .catch(error => handleError(error, a))
    );

export const DownloadCsv = (action$, store) =>
  action$
    .ofType('DOWNLOAD_CSV')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      selectedEntityName: getSelectedEntityName(store.getState())
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('download', 'singleMainEntity');
      a.sdkCall.data = {
        [`${removeLastLetter(a.entityName)}Id`]: a.selectedEntityId
      };
      return { ...a };
    })
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => {
          downloadFile(response, 'text/csv', a.selectedEntityName, '.csv');
          return handleSuccess(response, a, 'CSV Download Started');
        })
        .catch(error => handleError(error, a))
    );
