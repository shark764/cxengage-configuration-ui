import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { initialize } from 'redux-form';
import { fromJS } from 'immutable';
import { Toast } from 'cx-ui-components';

import { sdkPromise, errorManager } from '../../../../utils/sdk';
import { fetchData } from '../index';
import { getCurrentAgentId } from '../../userData/selectors';
import { userProfileInitialValues } from './selectors';
import { handleError, handleSuccess } from '../handleResult';
import { entitiesMetaData } from '../metaData';

export const FetchUserProfileData = (action$, store) =>
  action$
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'userProfile')
    .switchMap(a =>
      fromPromise(
        sdkPromise({
          command: 'getTenantDetails',
          module: 'session',
          topic: 'cxengage/session/get-tenant-details'
        })
      )
        .map(response => ({ ...a, response }))
        .catch(error => ({ ...a, error }))
    )
    .switchMap(
      ({ response, error, ...a }) =>
        error
          ? handleError(error, a)
          : [
              handleSuccess(response, { ...a, type: 'USER_PROFILE_TENANTS' }),
              fetchData('integrations'),
              {
                type: 'FETCH_DATA_ITEM',
                entityName: 'users',
                id: getCurrentAgentId(store.getState())
              }
            ]
    );

// Reinitialize the forms when we sucesfully updated the userProfile or when the requests to fetch info for user profile
// are completed succesfully
export const ReInitializeUserProfileForms = (action$, store) =>
  action$
    .ofType(
      'UPDATE_USER_PROFILE_FULFILLED',
      'USER_PROFILE_TENANTS_FULFILLED',
      'FETCH_DATA_ITEM_FULFILLED',
      'FETCH_DATA_FULFILLED'
    )
    .filter(
      ({ type, id, entityName }) =>
        (type === 'FETCH_DATA_FULFILLED' && entityName === 'integrations') ||
        (type === 'FETCH_DATA_ITEM_FULFILLED' &&
          entityName === 'users' &&
          id === getCurrentAgentId(store.getState())) ||
        (type !== 'FETCH_DATA_FULFILLED' && type !== 'FETCH_DATA_ITEM_FULFILLED')
    )
    .switchMap(() => {
      const initialValues = userProfileInitialValues(store.getState());
      return [
        initialize('userProfile:details', initialValues.delete('extensions'), false),
        initialize('userProfile:extensions', fromJS({ extensions: initialValues.get('extensions') }), false)
      ];
    });

export const UpdateUserProfile = (action$, store) =>
  action$
    .ofType('UPDATE_USER_PROFILE')
    .switchMap(
      ({
        values: {
          extensions,
          password,
          currentPassword,
          firstName,
          lastName,
          defaultTenant,
          workStationId,
          noPassword,
          defaultIdentityProvider,
          externalId,
          username
        },
        profileEntity,
        ...a
      }) => {
        const userId = getCurrentAgentId(store.getState());
        return fromPromise(
          sdkPromise(
            profileEntity === 'platformUser'
              ? {
                  command: 'updatePlatformUser',
                  data: {
                    updateBody: {
                      firstName,
                      lastName,
                      defaultTenant,
                      ...(currentPassword &&
                        password && {
                          password,
                          currentPassword
                        }),
                      externalId
                    },
                    userId
                  },
                  module: 'entities',
                  topic: 'cxengage/entities/update-platform-user-response'
                }
              : {
                  ...entitiesMetaData['users'].entityApiRequest('update', 'singleMainEntity'),
                  data: {
                    updateBody: {
                      extensions: extensions.map(({ id, hide, ...ext }) =>
                        Object.entries(ext).reduce((obj, [key, value]) => (value ? { ...obj, [key]: value } : obj), {})
                      ),
                      defaultIdentityProvider,
                      noPassword,
                      workStationId
                    },
                    userId
                  }
                }
          )
        )
          .map(response => ({ ...a, currentPassword, password, profileEntity, response, userId, username }))
          .catch(error => of({ error, ...a }));
      }
    )
    .switchMap(({ currentPassword, password, profileEntity, username, userId, error, ...a }) => {
      const successfulResponse = {
        ...a,
        userId
      };

      if (profileEntity === 'platformUser' && currentPassword && password && !error) {
        return fromPromise(
          sdkPromise({
            command: 'login',
            module: 'authentication',
            data: {
              username,
              password,
              noStateReset: true
            },
            topic: 'cxengage/sessions/get-new-token-response'
          })
        )
          .map(() => successfulResponse)
          .catch(error => of({ error, ...a }));
      } else if (error) {
        return of({ error, ...a });
      } else {
        return of(successfulResponse);
      }
    })
    .map(({ error, response, ...a }) => {
      if (error) {
        Toast.error(errorManager(error).errorMessage);
        return {
          ...a,
          type: `${a.type}_REJECTED`
        };
      } else {
        return handleSuccess(response, a, 'Profile updated succesfully');
      }
    });
