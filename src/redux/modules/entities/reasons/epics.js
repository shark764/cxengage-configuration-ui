/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { removeLastLetter } from 'serenova-js-utils/strings';
import { getSelectedEntityBulkChangeItems, findEntity } from '../selectors';
import { entitiesMetaData } from '../metaData';
import { sdkPromise } from '../../../../utils/sdk';
import { handleBulkSuccess, handleSuccess } from '../handleResult';

export const BulkEntityUpdate = (action$, store) =>
  action$
    .ofType('BULK_ENTITY_UPDATE')
    .filter(a => a.entityName === 'reasons' || a.entityName === 'reasonLists')
    .map(a => {
      a.allIdsToProcess = getSelectedEntityBulkChangeItems(store.getState());
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      if (a.values.active) {
        delete a.values['shared'];
        a.values.active = a.values.active === 'enabled';
      }

      a.allSdkCalls = [...a.allIdsToProcess.toJS()].map(item => ({
        ...a.sdkCall,
        data: {
          ...a.values,
          [removeLastLetter(a.entityName) + 'Id']: item,
          active: findEntity(store.getState(), a.entityName, item).get('active')
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
