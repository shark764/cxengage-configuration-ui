/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
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

export const FetchDataItem = action$ =>
  action$
    .ofType('FETCH_DATA_ITEM')
    .debounceTime(300)
    .filter(({ entityName }) => entityName === 'customAttributes')
    .map(a => {
      a.sdkCall = {
        module: 'entities',
        command: 'getEntity',
        topic: 'cxengage/entities/get-entity-response',
        data: {
          path: ['custom-attributes', a.id]
        }
      };
      return { ...a };
    })
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );
