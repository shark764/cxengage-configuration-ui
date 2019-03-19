/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { change } from 'redux-form';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity, getSelectedEntityFormId } from '../selectors';
import { selectNonReusableFlows, getFlowIdFormValue, selectVersionsFromFlow } from '../flows/selectors';

export const UpdateDispatchMapping = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'dispatchMappings')
    .map(a => {
      a.sdkCall = entitiesMetaData['dispatchMappings'].entityApiRequest('update', 'singleMainEntity');

      a.values.version = a.values.version === 'null' ? null : a.values.version;

      a.sdkCall.data = {
        ...a.values,
        dispatchMappingId: a.entityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('dispatchMappings')} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const CreateDispatchMapping = action$ =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'dispatchMappings')
    .map(a => {
      a.sdkCall = entitiesMetaData['dispatchMappings'].entityApiRequest('create', 'singleMainEntity');

      a.values.version = a.values.version === 'null' ? null : a.values.version;

      a.sdkCall.data = a.values;

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('dispatchMappings')} was created successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const ClearMappingValue = (action$, store) =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(
      a =>
        a.meta.form.includes('dispatchMappings') &&
        a.meta.field.includes('interactionField') &&
        getSelectedEntity(store.getState()) !== undefined
    )
    // We set the first option of the selectField if interactionField
    // is either 'direction' or 'source', otherwise we set null to clear
    .map(a =>
      change(a.meta.form, 'value', a.payload === 'direction' ? 'inbound' : a.payload === 'source' ? 'twilio' : null)
    );

export const TriggerFlowFetch = (action$, store) =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(a => a.meta.form.includes('dispatchMappings') && a.meta.field.includes('flowId') && a.payload !== '')
    .map(a => ({
      type: 'FETCH_DATA_FLOW',
      entityName: 'flows',
      id: a.payload
    }));

export const SetDispatchMappingVersionToNull = (action$, store) =>
  // We set version field to empty until flow single data is fetched,
  // then it gets first value "Active Version"
  action$
    .ofType('FETCH_DATA_FLOW')
    // We set value of version field to null while is fetching flow single data,
    // that way we get it disabled until data is retrieved
    .map(a => change(getSelectedEntityFormId(store.getState()), 'version', null));

export const ChangeDispatchMappingVersion = (action$, store) =>
  action$
    .ofType('@@redux-form/REGISTER_FIELD', 'FETCH_DATA_FLOW_FULFILLED')
    .map(a => ({
      ...a,
      flowVersions: selectVersionsFromFlow(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      initialVersion: getSelectedEntity(store.getState()) && getSelectedEntity(store.getState()).get('version')
    }))
    .filter(
      a =>
        a.selectedEntityId !== '' &&
        a.selectedEntityId !== 'bulk' &&
        ((a.meta !== undefined &&
          a.meta.form === getSelectedEntityFormId(store.getState()) &&
          a.payload.name === 'version' &&
          a.flowVersions &&
          a.flowVersions.length > 1) ||
          (a.type === 'FETCH_DATA_FLOW_FULFILLED' &&
            getCurrentEntity(store.getState()) === 'dispatchMappings' &&
            a.entityName === 'flows'))
    )
    .map(a =>
      //This change action is required as sometimes the flowId field
      // has not been loaded and the field is left not initialized.
      // That would not allow the user to submit, so the 'change'
      // function will leave the field as 'touched' to Redux Form
      change(getSelectedEntityFormId(store.getState()), 'version', a.initialVersion ? a.initialVersion : 'null')
    );

export const ActivateVersionsFromFlow = (action$, store) =>
  action$
    .ofType('@@redux-form/REGISTER_FIELD', 'FETCH_DATA_FULFILLED')
    .map(a => ({
      ...a,
      flowVersions: selectVersionsFromFlow(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState())
    }))
    //We want to fetch the versions for the currently selected flow,
    //but only if it has not been done before
    .filter(
      a =>
        (a.meta !== undefined &&
          a.meta.form === getSelectedEntityFormId(store.getState()) &&
          a.payload.name === 'flowId' &&
          selectNonReusableFlows(store.getState()).size &&
          a.selectedEntityId !== 'create' &&
          !a.flowVersions) ||
        (getCurrentEntity(store.getState()) === 'dispatchMappings' &&
          a.entityName === 'flows' &&
          a.selectedEntityId !== 'create' &&
          !a.flowVersions)
    )
    .map(a => ({
      type: 'FETCH_DATA_FLOW',
      entityName: 'flows',
      id: getFlowIdFormValue(store.getState())
    }));
