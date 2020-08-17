/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { List, fromJS } from 'immutable';

import { Toast } from 'cx-ui-components';
import { entitiesMetaData } from '../metaData';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError, handleBulkSuccess } from '../handleResult';

import { getContactAttributesFormSubmitValues } from './selectors';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntityBulkChangeItems,
  isItemInherited,
  getEntityItemDisplay
} from '../selectors';

export const ToggleContacAttributeItem = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY', 'TOGGLE_ENTITY')
    .filter(() => getCurrentEntity(store.getState()) === 'contactAttributes')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      values: getContactAttributesFormSubmitValues(store.getState())
        ? getContactAttributesFormSubmitValues(store.getState()).toJS()
        : {}
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData['contactAttributes'].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.data = { ...a.values, active: a.type === 'UPDATE_ENTITY' ? a.values.active : !a.values.active };
      a.sdkCall.path = ['contacts/attributes', a.entityId];
      return { ...a };
    })
    .concatMap(a => {
      let actionType;
      if (a.type === 'TOGGLE_ENTITY') {
        actionType = a.sdkCall.data.active === true ? 'enabled' : 'disabled';
      } else {
        actionType = 'updated';
      }
      const errorMessage =
        a.type === 'UPDATE_ENTITY' && a.values.mandatory === true && a.values.active === false
          ? 'Inactive contact attribute cannot be set mandatory'
          : undefined;
      return fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `Contact Attribute was ${actionType} successfully!`))
        .catch(error => handleError(error, { ...a, errorMessage }, errorMessage));
    });

export const ReInitContactAttributesFormForm = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED', 'TOGGLE_ENTITY_FULFILLED')
    .filter(({ entityName }) => entityName === 'contactAttributes')
    .map(a => {
      a.response.result = fromJS(a.response.result).update('label', label =>
        label.reduce((r, v, k) => r.push(fromJS({ label: v, language: k })), List())
      );
      return a;
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `contactAttributes:${a.entityId}`
      },
      payload: a.response.result
    }));

export const RevertMandatoryFieldValue = action$ =>
  action$
    .ofType('UPDATE_ENTITY_REJECTED')
    .filter(
      ({ entityName, errorMessage }) =>
        entityName === 'contactAttributes' && errorMessage === 'Inactive contact attribute cannot be set mandatory'
    )
    .map(({ entityId }) => ({
      type: '@@redux-form/CHANGE',
      meta: {
        form: `contactAttributes:${entityId}`,
        field: 'mandatory',
        touch: false,
        persistentSubmitErrors: false
      },
      payload: false
    }));

export const BulkEntityUpdate = (action$, store) =>
  action$
    .ofType('BULK_ENTITY_UPDATE')
    .filter(({ entityName }) => entityName === 'contactAttributes')
    .map(a => {
      a.allEntitiesToUpdate = getSelectedEntityBulkChangeItems(store.getState())
        ? getSelectedEntityBulkChangeItems(store.getState()).toJS()
        : [];
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      a.allSdkCalls = [...a.allEntitiesToUpdate].reduce((allCalls, item) => {
        if (isItemInherited(store.getState(), a.entityName, item.id)) {
          Toast.error(`"${item.objectName || item.id}" is inherited and cannot be edited.`);
          return allCalls;
        } else if (item.mandatory && !a.values.active) {
          Toast.error(`"${item.objectName || item.id}" is a mandatory attribute and cannot be set inactive.`);
          return allCalls;
        }
        allCalls.push({
          ...a.sdkCall,
          data: {
            active: a.values.active,
            default: item.default,
            mandatory: item.mandatory,
            label: item.label
          },
          path: ['contacts/attributes', item.id]
        });
        return allCalls;
      }, []);
      return { ...a };
    })
    .mergeMap(
      a =>
        a.allSdkCalls.length > 0
          ? forkJoin(
              a.allSdkCalls.map(apiCall =>
                from(
                  sdkPromise(apiCall).catch(error => ({
                    error: error,
                    id: apiCall.path[1],
                    toString: getEntityItemDisplay(store.getState(), apiCall.path[1])
                  }))
                )
              )
            )
              .do(allResult => handleBulkSuccess(allResult))
              .mergeMap(result => from(result).map(response => handleSuccess(response, a)))
          : of({ type: 'BULK_ENTITY_UPDATE_cancelled' })
    );
