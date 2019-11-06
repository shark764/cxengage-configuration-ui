/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';

export const FetchData = (action$, store) =>
  action$
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'dispositionLists')
    .mergeMap(a =>
      fromPromise(
        sdkPromise({
          module: 'entities',
          command: 'getEntity',
          topic: 'cxengage/entities/get-entity-response',
          data: {
            path: ['disposition-lists']
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
    .filter(({ entityName }) => entityName === 'dispositionLists')
    .map(a => {
      a.sdkCall = {
        module: 'entities',
        command: 'getEntity',
        topic: 'cxengage/entities/get-entity-response',
        data: {
          path: ['disposition-lists', a.id]
        }
      };
      return { ...a };
    })
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );
