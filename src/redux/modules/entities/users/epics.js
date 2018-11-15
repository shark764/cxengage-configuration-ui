import { fromPromise } from 'rxjs/observable/fromPromise';
import { removeLastLetter, camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity } from '../selectors';

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
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
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
        externalId: a.values.externalId,
        personalTelephone: a.values.personalTelephone
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
