/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { removeLastLetter } from 'serenova-js-utils/strings';
import { Toast } from 'cx-ui-components';
import { getSelectedEntityBulkChangeItems, findEntity } from '../selectors';
import { entitiesMetaData } from '../metaData';
import { sdkPromise } from '../../../../utils/sdk';
import { handleBulkSuccess, handleSuccess } from '../handleResult';
import { getCurrentTenantId } from '../../userData/selectors';

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

      a.allSdkCalls = [...a.allIdsToProcess.toJS()].reduce((allCalls, item) => {
        const entityData = findEntity(store.getState(), a.entityName, item);
        if (getCurrentTenantId(store.getState()) !== entityData.get('tenantId')) {
          Toast.error(`"${entityData.get('name')}" is inherited and cannot be edited.`);
          return allCalls;
        }
        allCalls.push({
          ...a.sdkCall,
          data: {
            ...a.values,
            [removeLastLetter(a.entityName) + 'Id']: item,
            active: entityData.get('active')
          }
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
                    id: apiCall.data[removeLastLetter(a.entityName) + 'Id']
                  }))
                )
              )
            )
              .do(allResult => handleBulkSuccess(allResult))
              .mergeMap(result => from(result).map(response => handleSuccess(response, a)))
          : of({ type: 'BULK_ENTITY_UPDATE_cancelled' })
    );
