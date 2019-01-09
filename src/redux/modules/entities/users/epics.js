import { fromPromise } from 'rxjs/observable/fromPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
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
        .mergeMap(result =>
          from(result).map(response => {
            if (response.result && response.result.extensions) {
              response.result.extensions = [
                ...response.result.extensions.map(item => ({ ...item, id: generateUUID() }))
              ];
            }
            return handleSuccess(response, a);
          })
        )
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
          if (response.result.extensions) {
            response.result.extensions = [...response.result.extensions.map(item => ({ ...item, id: generateUUID() }))];
          }
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
        .map(response => {
          delete response.result.extensions;
          return handleSuccess(response, a);
        })
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
      if (filteredValues.noPassword === 'true') {
        filteredValues.noPassword = true;
      } else if (filteredValues.noPassword === 'false') {
        filteredValues.noPassword = false;
      }
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

export const UpdateSkillProficiency = (action$, store) =>
  action$
    .ofType('UPDATE_PROFICIENCY')
    .map(a => ({
      ...a,
      currentEntity: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      proficiency: parseInt(a.newValue)
    }))
    .filter(a => a.currentEntity === 'skills' || a.currentEntity === 'users')
    .debounceTime(600)
    .map(a => ({
      ...a,
      sdkCall: {
        command: 'updateUserSkillMember',
        data: {
          userId: a.currentEntity === 'skills' ? a.id : a.selectedEntityId,
          skillId: a.currentEntity === 'skills' ? a.selectedEntityId : a.id,
          proficiency: a.proficiency
        },
        module: 'entities',
        topic: 'cxengage/entities/update-user-skill-member-response'
      }
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `Proficiency was updated successfully!`))
        .catch(error => {
          if (error && (a.proficiency < 1 || isNaN(a.proficiency))) {
            Toast.error('Min value is 1');
            return of({ type: 'MIN_VALUE_EXCEEDED_' });
          } else if (error && a.proficiency > 100) {
            Toast.error('Max value is 100');
            return of({ type: 'MAX_VALUE_EXCEEDED_' });
          } else {
            return handleError(error, a);
          }
        })
    );
