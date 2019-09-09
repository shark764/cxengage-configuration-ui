/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { entitiesMetaData } from '../metaData';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { getSelectedEntityId, getCurrentEntity } from '../selectors';

import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';

export const getRolesAfterFetchingApiKeys = action$ =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(a => a.entityName === 'apiKeys')
    .map(a => ({ type: 'FETCH_DATA', entityName: 'roles' }));

export const UpdateApiKey = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'apiKeys')
    .map(a => {
      a.sdkCall = entitiesMetaData['apiKeys'].entityApiRequest('update', 'singleMainEntity');

      const { name, description, roleId, status } = a.values;

      a.sdkCall.data = { status, roleId, name, description, apiKeyId: a.entityId };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('apiKeys')} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const DeteleApiKey = (action$, store) =>
  action$
    .ofType('DELETE_API_KEY')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'apiKeys')
    .map(a => {
      a.sdkCall = {
        command: 'deleteApiKey',
        data: { apiKeyId: getSelectedEntityId(store.getState()) },
        module: 'entities',
        topic: 'cxengage/entities/delete-api-key-response'
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('apiKeys')} was deleted successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );
