/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';

export const FetchData = action$ =>
  action$
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'customAttributes')
    .mergeMap(a =>
      fromPromise(
        sdkPromise({
          module: 'entities',
          command: 'getEntity',
          topic: 'cxengage/entities/get-entity-response',
          data: {
            path: ['custom-attributes']
          }
        })
      )
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

// In the custom-attributes PUT request body, "identifier" gets removed as identfier cannnot be modified,
// that's the reason we are using a custom "UPDATE_ENTITY_FULFILLED" to add it back from the redux state once the update is successfull
export const ReInitCustomAttributesForm = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(a => a.entityName === 'customAttributes')
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.entityId}`
      },
      payload: a.response.result
    }));
