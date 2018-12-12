import { fromPromise } from 'rxjs/observable/fromPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { removeLastLetter, camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { generateUUID } from 'serenova-js-utils/uuid';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity } from '../selectors';
import { entitiesMetaData } from '../metaData';
import { Toast } from 'cx-ui-components';

export const UpdateUserEntity = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'users')
    .map(a => {
      a.sdkCall = {
        command: 'updateUser',
        data: {},
        module: 'entities',
        topic: 'cxengage/entities/update-user-response'
      };
      const filterValues = {
        workStationId: a.values.workStationId,
        roleId: a.values.roleId,
        noPassword: a.values.noPassword === 'null' ? null : a.values.noPassword,
        defaultIdentityProvider: a.values.defaultIdentityProvider === 'null' ? null : a.values.defaultIdentityProvider
      };

      // Users Extensions
      const modifiedExtensions = [...a.values.extensions];
      modifiedExtensions.splice(-1, 1);
      /**
        1. remove the fake uuid we attached from before
        2. remove any empty values except description
        3. return the modified extension
      **/
      modifiedExtensions.map(
        extension =>
          delete extension.id &&
          Object.keys(extension).map(key => extension[key] || key === 'description' || delete extension[key]) && {
            ...extension
          }
      );
      filterValues.extensions = modifiedExtensions;

      a.sdkCall.data = {
        updateBody: {
          ...filterValues
        },
        [removeLastLetter(a.entityName) + 'Id']: a.entityId
      };

      // Changing users capacity
      a.sdkCall2 = {
        command: 'updateUsersCapacityRule',
        data: {
          userId: a.values.id,
          capacityRuleId: a.values.effectiveCapacityRule === 'null' ? null : a.values.effectiveCapacityRule
        },
        module: 'entities',
        topic: 'cxengage/entities/update-users-capacity-rule-response'
      };

      a.allSdkCalls = [a.sdkCall, a.sdkCall2];
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
        .do(allResult => Toast.success(`User updated successfully`))
        .mergeMap(result => from(result).map(response => handleSuccess(response, a)))
    );

export const UpdatePlatformUserEntity = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'users')
    .map(a => {
      a.sdkCall = {
        command: 'updatePlatformUser',
        data: {},
        module: 'entities',
        topic: 'cxengage/entities/update-platform-user-response'
      };
      const filterValues = {
        firstName: a.values.firstName,
        lastName: a.values.lastName,
        externalId: a.values.externalId
      };

      if (filterValues.externalId === null) {
        delete filterValues.externalId;
      }

      a.sdkCall.data = {
        updateBody: {
          ...filterValues
        },
        [removeLastLetter(a.entityName) + 'Id']: a.entityId
      };

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => {
          delete response.result.status;
          return handleSuccess(response, a);
        })
        .catch(error => handleError(error, a))
    );

export const FetchSidePanelUserData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'users')
    .map(a => ({
      sdkCall: {
        command: 'getUser',
        data: { resourceId: a.id },
        module: 'entities',
        topic: 'cxengage/entities/get-user-response'
      },
      ...a
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const ToggleUserEntity = (action$, store) =>
  action$
    .ofType('TOGGLE_ENTITY')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState()),
      currentStatus: getSelectedEntity(store.getState()).get('status'),
      sdkCall: {
        command: 'updateUser',
        data: {
          userId: getSelectedEntityId(store.getState()),
          status: getSelectedEntity(store.getState()).get('status') === 'accepted' ? 'disabled' : 'accepted'
        },
        module: 'entities',
        topic: 'cxengage/entities/update-user-response'
      }
    }))
    .filter(a => a.entityName === 'users')
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was ${
              a.entityStatusActive ? 'disabled' : 'enabled'
            } successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const CreateEntity = action$ =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(a => a.entityName === 'users')
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('create', 'singleMainEntity');
      const filteredValues = {
        firsName: a.values.firstName,
        lastName: a.values.lastName,
        externalId: a.values.externalId,
        workStationId: a.values.workStationId,
        roleId: a.values.roleId,
        platformRoleId: a.values.platformRoleId,
        inviteNow: a.values.inviteNow,
        email: a.values.email,
        noPassword: a.values.noPassword === 'null' ? null : a.values.noPassword,
        defaultIdentityProvider: a.values.defaultIdentityProvider === 'null' ? null : a.values.defaultIdentityProvider
      };
      a.sdkCall.data = filteredValues;
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was created successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const ConvertNullsForSelectFields = action$ =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID_FULFILLED')
    .filter(a => a.entityName === 'users')
    .map(a => {
      const emptyListItem = () => ({
        type: 'pstn',
        value: '',
        provider: '',
        region: '',
        description: '',
        id: generateUUID()
      });
      a.response.result.extensions = [
        ...a.response.result.extensions.map(item => ({ ...item, id: generateUUID() })),
        emptyListItem()
      ];
      if (a.response.result.noPassword === null) {
        a.response.result.noPassword = 'null';
      }
      if (a.response.result.defaultIdentityProvider === null) {
        a.response.result.defaultIdentityProvider = 'null';
      }
      a.type = 'CONVERT_NULLS_FOR_SELECT_FIELDS';
      return { ...a };
    });
