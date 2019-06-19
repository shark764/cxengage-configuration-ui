import { fromPromise } from 'rxjs/observable/fromPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { generateUUID } from 'serenova-js-utils/uuid';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError, handleBulkSuccess, handleBulkUneeded } from '../handleResult';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntity,
  getSelectedEntityBulkChangeItems,
  getSelectedEntityFormId,
  findEntity,
  findEntityByProperty
} from '../selectors';
import { getDisplay } from './selectors';
import { selectFormInitialValues, getCurrentFormValueByFieldName } from '../../form/selectors';
import { entitiesMetaData } from '../metaData';
import { Toast } from 'cx-ui-components';
import { changeUserInviteStatus } from '../../entities';
import { validateEmail } from 'serenova-js-utils/validation';
import { change } from 'redux-form';

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
        userId: a.entityId
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
              id: apiCall.data['userId']
            }))
          )
        )
      )
        .do(allResult => Toast.success(`User updated successfully`))
        .mergeMap(result =>
          from(result).map(response => {
            if (response.result && response.result.extensions) {
              response.result.extensions = [
                ...response.result.extensions.map(item => ({
                  ...item,
                  id: generateUUID()
                }))
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

      // Setting externalId to null if value is not set
      // since this is the default API accepts
      if (!filterValues.externalId) {
        filterValues.externalId = null;
      }

      a.sdkCall.data = {
        updateBody: {
          ...filterValues
        },
        userId: a.entityId
      };

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => {
          delete response.result.status;
          if (response.result.extensions) {
            response.result.extensions = [
              ...response.result.extensions.map(item => ({
                ...item,
                id: generateUUID()
              }))
            ];
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

export const FetchSidePanelUserDataFulfilled = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID_FULFILLED')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'users')
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `users:${a.id}`,
        keepDirty: false,
        updateUnregisteredFields: false
      },
      payload: selectFormInitialValues(store.getState())
    }));

export const InviteNewUser = (action$, store) =>
  action$
    .ofType('CREATE_ENTITY_FULFILLED')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'users' && a.values.inviteNow === true)
    .map(a => changeUserInviteStatus('invited', a.id));

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
              a.currentStatus !== 'disabled' ? 'disabled' : 'enabled'
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
    .debounceTime(300)
    .map(a => ({
      ...a,
      currentEntity: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      proficiency: parseInt(a.newValue, 10)
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
            Toast.error('User requires a skill level that is greater than 0');
            return of({ type: 'MIN_VALUE_EXCEEDED_' });
          } else if (error && a.proficiency > 100) {
            Toast.error('User requires a skill level that is less than 100');
            return of({ type: 'MAX_VALUE_EXCEEDED_' });
          } else {
            return handleError(error, a);
          }
        })
    );

export const ChangeUsersInviteStatus = action$ =>
  action$
    .ofType('CHANGE_USER_INVITE_STATUS')
    .map(a => {
      a.id = a.userId;
      a.entityName = 'users';
      if (a.toStatus === 'passwordReset') {
        a.sdkCall = {
          command: 'updatePlatformUser',
          data: {
            userId: a.userId,
            updateBody: {
              resetPassword: true
            }
          },
          module: 'entities',
          topic: 'cxengage/entities/update-platform-user-response'
        };
      } else {
        a.sdkCall = {
          command: 'updateUser',
          data: {
            userId: a.userId,
            updateBody: {
              status: a.toStatus
            }
          },
          module: 'entities',
          topic: 'cxengage/entities/update-user-response'
        };
      }
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => {
          let msg = '';
          if (response.result && response.result.invitationStatus && a.toStatus === 'invited') {
            msg = 'User Invited';
            response = {
              result: {
                id: response.result.id,
                invitationStatus: 'invited'
              }
            };
          } else if (response.result && response.result.invitationStatus && a.toStatus === 'pending') {
            msg = 'Invitation Canceled';
            response = {
              result: {
                id: response.result.id,
                invitationStatus: 'pending'
              }
            };
          } else if (response.result && a.toStatus === 'passwordReset') {
            msg = 'Password Reset Requested';
            response = {
              result: {
                id: response.result.id
              }
            };
          }
          return handleSuccess(response, a, msg);
        })
        .catch(error => handleError(error, a))
    );

export const CheckIfEmailExists = action$ =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(a => a.meta.form === 'users:create' && a.meta.field === 'email' && (validateEmail(a.payload) || !a.payload))
    .map(a => ({
      sdkCall: {
        command: 'getPlatformUserEmail',
        data: {
          email: a.payload
        },
        module: 'entities',
        topic: 'cxengage/entities/get-platform-user-email-response'
      },
      ...a
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const BulkEntityUpdate = (action$, store) =>
  action$
    .ofType('BULK_ENTITY_UPDATE')
    .filter(a => a.entityName === 'users')
    .map(a => {
      a.allIdsToProcess = getSelectedEntityBulkChangeItems(store.getState());
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      a.uneededCalls = [];
      a.allSdkCalls = [];
      [...a.allIdsToProcess.toJS()].forEach(item => {
        const userData = findEntity(store.getState(), 'users', item).toJS();

        // Creating values to pass data to sdkCall, this data will be
        // used for a single call to updateUser function
        let sdkCallValues = {
          updateBody: {},
          userId: item
        };

        if (a.values.addSkill || a.values.removeSkill) {
          const addOrRemoveSkillData =
            (a.values.addSkill || a.values.removeSkill) &&
            findEntityByProperty(store.getState(), 'skills', 'name', a.values.addSkill || a.values.removeSkill);
          const userDoesntHaveSkill =
            userData.skills.filter(
              skill => addOrRemoveSkillData.get('id') === (skill.skillId || skill.id || skill)
            )[0] === undefined;
          a.values.addSkillId = a.values.addSkill && addOrRemoveSkillData.get('id');
          a.values.removeSkillId = a.values.removeSkill && addOrRemoveSkillData.get('id');
          if (a.values.addSkill) {
            if (userDoesntHaveSkill) {
              console.warn(`Attempting to associate skill (${a.values.addSkill}) to user (${userData.email})`);
              a.allSdkCalls.push({
                module: 'entities',
                data: {
                  originEntity: {
                    name: 'users',
                    id: item
                  },
                  destinationEntity: {
                    name: 'skills',
                    id: a.values.addSkillId
                  }
                },
                command: 'associate',
                topic: `cxengage/entities/associate-response`
              });
            } else {
              console.warn(`"${a.values.addSkill}" is already associated with user (${userData.email})`);
              a.uneededCalls.push(`"${a.values.addSkill}" is already associated to BULKED_ITEMS_AFFECTED user(s)`);
            }
          }
          if (a.values.removeSkill) {
            if (!userDoesntHaveSkill) {
              console.warn(`Attempting to dissociate skill (${a.values.removeSkill}) from user (${userData.email})`);
              a.allSdkCalls.push({
                module: 'entities',
                data: {
                  originEntity: {
                    name: 'users',
                    id: item
                  },
                  destinationEntity: {
                    name: 'skills',
                    id: a.values.removeSkillId
                  }
                },
                command: 'dissociate',
                topic: `cxengage/entities/dissociate-response`
              });
            } else {
              console.warn(`"${a.values.removeSkill}" is already not associated with user (${userData.email})`);
              a.uneededCalls.push(
                `"${a.values.removeSkill}" is already not associated to BULKED_ITEMS_AFFECTED user(s)`
              );
            }
          }
        }
        if (a.values.addGroup || a.values.removeGroup) {
          const addOrRemoveGroupData =
            (a.values.addGroup || a.values.removeGroup) &&
            findEntityByProperty(store.getState(), 'groups', 'name', a.values.addGroup || a.values.removeGroup);
          const userDoesntHaveGroup =
            userData.groups.filter(
              group => addOrRemoveGroupData.get('id') === (group.groupId || group.id || group)
            )[0] === undefined;
          a.values.addGroupId = a.values.addGroup && addOrRemoveGroupData.get('id');
          a.values.removeGroupId = a.values.removeGroup && addOrRemoveGroupData.get('id');
          if (a.values.addGroup) {
            if (userDoesntHaveGroup) {
              console.warn(`Attempting to associate group (${a.values.addGroup}) to user (${userData.email})`);
              a.allSdkCalls.push({
                module: 'entities',
                data: {
                  originEntity: {
                    name: 'groups',
                    id: a.values.addGroupId
                  },
                  destinationEntity: {
                    name: 'users',
                    id: item
                  }
                },
                command: 'associate',
                topic: `cxengage/entities/associate-response`
              });
            } else {
              console.warn(`"${a.values.addGroup}" is already associated with user (${userData.email})`);
              a.uneededCalls.push(`"${a.values.addGroup}" is already associated to BULKED_ITEMS_AFFECTED user(s)`);
            }
          }
          if (a.values.removeGroup) {
            if (!userDoesntHaveGroup) {
              console.warn(`Attempting to dissociate group (${a.values.removeGroup}) from user (${userData.email})`);
              a.allSdkCalls.push({
                module: 'entities',
                data: {
                  originEntity: {
                    name: 'groups',
                    id: a.values.removeGroupId
                  },
                  destinationEntity: {
                    name: 'users',
                    id: item
                  }
                },
                command: 'dissociate',
                topic: `cxengage/entities/dissociate-response`
              });
            } else {
              console.warn(`"${a.values.removeGroup}" is already not associated with user (${userData.email})`);
              a.uneededCalls.push(
                `"${a.values.removeGroup}" is already not associated to BULKED_ITEMS_AFFECTED user(s)`
              );
            }
          }
        }

        if (a.values.status !== undefined) {
          sdkCallValues.updateBody.status = a.values.status;
        }
        if (a.values.region !== undefined) {
          // TODO: setting region isn't working due null extension issue coming from api
          const activeExtension = userData.activeExtension;
          if (activeExtension) {
            activeExtension.region = a.values.region;
          }
          const extensions = userData.extensions;
          extensions.forEach(ext => {
            if (ext.provider && ext.provider === 'twilio') {
              ext.region = a.values.region;
            }
          });
          sdkCallValues.updateBody.activeExtension = activeExtension;
          sdkCallValues.updateBody.extensions = extensions;
        }
        if (a.values.noPassword !== undefined) {
          if (a.values.noPassword === 'null') {
            sdkCallValues.updateBody.noPassword = null;
          } else {
            sdkCallValues.updateBody.noPassword = a.values.noPassword === 'true';
          }
        }
        if (a.values.defaultIdentityProvider !== undefined) {
          sdkCallValues.updateBody.defaultIdentityProvider =
            a.values.defaultIdentityProvider === 'null' ? null : a.values.defaultIdentityProvider;
        }

        if (
          a.values.inviteNow &&
          ['invited', 'expired', 'enabled', 'disabled', 'sso-only'].includes(userData.invitationStatus)
        ) {
          console.warn(
            `Cannot send email invitation for User (${
              userData.email
            }) as he/she is in one of the following states: "Invited", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
          a.uneededCalls.push(
            `Cannot send email invitation for BULKED_ITEMS_AFFECTED user(s) as they are in one of the following states: "Invited", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
        } else if (
          a.values.resendInvitation &&
          ['enabled', 'disabled', 'sso-only'].includes(userData.invitationStatus)
        ) {
          console.warn(
            `Cannot resend an email invitation for User (${
              userData.email
            }) as he/she is in one of the following states: "Enabled", "Disabled" or "SSO Only".`
          );
          a.uneededCalls.push(
            `Cannot resend an email invitation for BULKED_ITEMS_AFFECTED user(s) as they are in one of the following states: "Enabled", "Disabled" or "SSO Only".`
          );
        } else if (
          a.values.cancelInvitation &&
          ['pending', 'expired', 'enabled', 'disabled', 'sso-only'].includes(userData.invitationStatus)
        ) {
          console.warn(
            `Cannot cancel email invitation for User (${
              userData.email
            }) as he/she is in one of the following states: "Pending Invitation", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
          a.uneededCalls.push(
            `Cannot cancel email invitation for BULKED_ITEMS_AFFECTED user(s) as they are in one of the following states: "Pending Invitation", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
        } else if (a.values.inviteNow || a.values.resendInvitation || a.values.cancelInvitation) {
          // Change each user invitation status if any of these options
          // are selected: inviteNow | resendInvitation | cancelInvitation
          sdkCallValues.updateBody.status = a.values.cancelInvitation ? 'pending' : 'invited';
        }

        if (Object.keys(sdkCallValues.updateBody).length) {
          // Using the default sdkCall to update single entity data,
          // by calling updateUser
          a.allSdkCalls.push({
            ...a.sdkCall,
            data: { ...sdkCallValues }
          });
        }

        if (a.values.passwordReset) {
          if (
            !userData.firstName ||
            !userData.lastName ||
            ['invited', 'pending', 'expired'].includes(userData.invitationStatus)
          ) {
            console.warn(
              `Cannot send a password reset email to User (${
                userData.email
              }) as he/she is in one of the following states: "Invited", "Pending Invitation", "Expired Invitation" or doesn't have firstName and lastName set.`
            );
            a.uneededCalls.push(
              `Cannot send a password reset email to BULKED_ITEMS_AFFECTED user(s) as they are in one of the following states: "Invited", "Pending Invitation", "Expired Invitation" or they don't have firstName and lastName set.`
            );
          } else {
            // Reset password for all users if option was selected
            a.allSdkCalls.push({
              command: 'updatePlatformUser',
              data: {
                userId: item,
                updateBody: {
                  resetPassword: true
                }
              },
              module: 'entities',
              topic: 'cxengage/entities/update-platform-user-response'
            });
          }
        }
      });
      return { ...a };
    })
    .do(a => {
      if (a.uneededCalls.length > 0 && a.allSdkCalls.length === 0) {
        handleBulkUneeded(a);
      }
    })
    .mergeMap(a =>
      forkJoin(
        a.allSdkCalls.map(apiCall =>
          from(
            sdkPromise(apiCall).catch(error => ({
              error: error,
              id: apiCall.data['userId']
            }))
          )
        )
      )
        .do(allResult => handleBulkSuccess(allResult, a))
        .mergeMap(result =>
          from(result).map(response => {
            if (response.result && response.result.invitationStatus && a.toStatus !== undefined) {
              return handleSuccess(
                {
                  result: {
                    ...response.result,
                    invitationStatus: a.toStatus
                  }
                },
                a
              );
            }
            return handleSuccess(response, a);
          })
        )
    );

export const FocusNoPasswordValueFormField = (action$, store) =>
  action$
    .ofType('@@redux-form/REGISTER_FIELD')
    .filter(
      a =>
        a.meta.form === 'users:bulk' &&
        (a.payload.name === 'noPassword' || a.payload.name === 'defaultIdentityProvider')
    )
    .map(a => change(a.meta.form, a.payload.name, 'null'));

export const ToggleInvitationStatusFormField = (action$, store) =>
  action$
    .ofType('TOGGLE_INVITATION_STATUS')
    .map(a =>
      change(
        getSelectedEntityFormId(store.getState()),
        a.fieldToToggle,
        a.toValue !== undefined ? a.toValue : !getCurrentFormValueByFieldName(store.getState(), a.fieldToToggle)
      )
    );

export const OpenAdvancedReports = (action$, store) =>
  action$
    .ofType('SET_TENANT_USER_AS_IMPERSONATED')
    .map(a => ({
      ...a,
      sdkCall: {
        module: 'Logi.impersonateTenantUser',
        data: {
          id: getSelectedEntityId(store.getState()),
          displayName: getDisplay({
            firstName: getSelectedEntity(store.getState()).get('firstName'),
            lastName: getSelectedEntity(store.getState()).get('lastName'),
            email: getSelectedEntity(store.getState()).get('email')
          })
        }
      }
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `You will be redirected to Advanced Reports`))
        .catch(error => handleError(error, a))
    );
