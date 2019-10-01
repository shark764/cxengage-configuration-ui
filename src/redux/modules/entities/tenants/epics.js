import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { fromPromise } from 'rxjs/observable/fromPromise';

import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';
import { userHasPermissions } from '../selectors';

export const fetchTenants = ($action, store) =>
  $action
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'tenants')
    .mergeMap(a => {
      if (
        userHasPermissions(store.getState(), [
          'PLATFORM_VIEW_ALL_TENANTS',
          'PLATFORM_MANAGE_ALL_TENANTS',
          'PLATFORM_CREATE_ALL_TENANTS',
          'PLATFORM_CREATE_TENANT_ROLES',
          'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT'
        ])
      ) {
        return fromPromise(sdkPromise(entitiesMetaData['tenants'].entityApiRequest('get', 'mainEntity')))
          .map(response => handleSuccess(response, a))
          .catch(error => handleError(error, a));
      } else if (userHasPermissions(store.getState(), ['MANAGE_TENANT'])) {
        let sdkCall = {
          command: 'getEntity',
          module: 'entities',
          topic: 'cxengage/entities/get-tenant-response',
          data: {
            path: '',
            customTopic: 'cxengage/entities/get-tenant-response'
          }
        };
        return fromPromise(sdkPromise(sdkCall))
          .map(response => ({
            ...a,
            type: 'FETCH_DATA_FULFILLED',
            response: {
              result: [response.result]
            }
          }))
          .catch(error => handleError(error, a));
      } else {
        return of({
          type: 'FETCH_DATA_FULFILLED',
          entityName: 'tenants',
          response: {
            result: []
          }
        });
      }
    });
