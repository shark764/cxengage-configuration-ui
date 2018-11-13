import { fromPromise } from 'rxjs/observable/fromPromise';
import {
  removeLastLetter,
  camelCaseToRegularFormAndRemoveLastLetter,
} from 'serenova-js-utils/strings';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import {
  getCurrentEntity,
  getSelectedEntityId,
} from '../selectors';

export const UpdateUserEntity = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'users')
    .map(a => {
      a.sdkCall = {
        command: "updateUser",
        data: {},
        module: "entities",
        topic: "cxengage/entities/update-user-response"
      }
      const filterValues = {...a.values};
      delete filterValues.aliasTenantUserId;
      delete filterValues.created;
      delete filterValues.createdBy;
      delete filterValues.email;
      delete filterValues.externalId;
      delete filterValues.firstName;
      delete filterValues.groups;
      delete filterValues.id;
      delete filterValues.invitationStatus;
      delete filterValues.lastName;
      delete filterValues.personalTelephone;
      delete filterValues.platformStatus;
      delete filterValues.roleName;
      delete filterValues.skills;
      delete filterValues.state;
      delete filterValues.updated;

      a.sdkCall.data = {
        updateBody: {
          ...filterValues,
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
        command: "updatePlatformUser",
        data: {},
        module: "entities",
        topic: "cxengage/entities/update-platform-user-response"
      }
      const filterValues = {...a.values};
      delete filterValues.activeExtension;
      delete filterValues.clientLogLevel;
      delete filterValues.extensions;
      delete filterValues.workStationId;
      delete filterValues.roleId;
      delete filterValues.aliasTenantUserId;
      delete filterValues.created;
      delete filterValues.createdBy;
      delete filterValues.groups;
      delete filterValues.id;
      delete filterValues.invitationStatus;
      delete filterValues.personalTelephone;
      delete filterValues.platformStatus;
      delete filterValues.roleName;
      delete filterValues.skills;
      delete filterValues.state;
      delete filterValues.updated;
      delete filterValues.updatedBy;
      delete filterValues.email;
      delete filterValues.noPassword;

      if(filterValues.externalId === null) {
        delete filterValues.externalId;
      }


      // disabled', 'pending', 'enabled'"
      // console.warn('status1', filterValues.status)
      if(filterValues.status === 'accepted') {
        delete filterValues.status;
        // a.values.status = 'enabled'
      } 
      // else if(a.values.status === 'disabled') {
      //   a.values.status = 'disabled'
      // }
      console.warn('filteredValues', filterValues)

      a.sdkCall.data = {
        updateBody: {
          ...filterValues,
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


export const FetchSidePanelUserData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState()),
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'users')
    .map(a => ({
      sdkCall: {
        command: "getUser",
        data: {resourceId: a.id},
        module: "entities",
        topic: "cxengage/entities/get-user-response"
      },
      ...a
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `User was retrieved successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );
