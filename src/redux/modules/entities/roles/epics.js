import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleError } from '../handleResult';
import { isInherited } from '../selectors';

export const UpdatePlatformRoleEntity = (action$, store) =>
  action$
    .ofType('FETCH_DATA_ITEM_FULFILLED')
    .filter(a => a.entityName === 'roles' && isInherited(store.getState()) && location.hash.includes('alpha'))
    .map(a => {
      a.sdkCall = {
        command: 'getTenant',
        data: {
          tenantId: a.response.result.tenantId
        },
        module: 'entities',
        topic: 'cxengage/entities/get-tenant-response'
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => ({
          ...a,
          parentTenantName: a.response.result.type === 'system' ? response.result.parent.name : response.result.name,
          type: 'FETCH_ROLE_PARENT_TENANT'
        }))
        .catch(error => {
          //  In case of error, we check if it is a forbidden error, it means it is trying to get the Platform tenant information with a user without enough permissions to make the request
          if (error && error.data.apiResponse.status !== '403') {
            return [];
          } else {
            return handleError(error, a);
          }
        })
    );
