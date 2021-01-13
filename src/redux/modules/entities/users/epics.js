import { fromPromise } from 'rxjs/observable/fromPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { isEmpty } from 'serenova-js-utils/strings';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { generateUUID } from 'serenova-js-utils/uuid';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError, handleBulkSuccess } from '../handleResult';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntity,
  getSelectedEntityBulkChangeItems,
  findEntity,
  findEntityByProperty,
  getEntityItemDisplay
} from '../selectors';
import { selectTenantRoles } from '../roles/selectors';
import { getDisplay, getUpdatedUserExtensions } from './selectors';
import { selectFormInitialValues } from '../../form/selectors';
import { entitiesMetaData } from '../metaData';
import { Toast } from 'cx-ui-components';
import { changeUserInviteStatus } from '../../entities';
import { validateEmail } from 'serenova-js-utils/validation';
import { change } from 'redux-form';
import { fetchData } from '../index';
import { currentTenantId } from '../../userData/selectors';

export const getRolesAfterFetchingUsers = (action$, store) =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(a => getCurrentEntity(store.getState()) === 'users' && a.entityName === 'users')
    .mergeMap(() => [fetchData('roles'), fetchData('skills'), fetchData('groups'), fetchData('integrations')]);

export const UpdateUserEntity = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'users')
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
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
        2. remove hide property (used in layout to hide/show the extensions)
        3. remove any empty values except description
        4. return the modified extension
      **/
      modifiedExtensions.map(
        extension =>
          delete extension.id &&
          delete extension.hide &&
          Object.keys(extension).map(key => extension[key] || key === 'description' || delete extension[key]) && {
            ...extension
          }
      );
      filterValues.extensions = modifiedExtensions;

      a.sdkCall.data = { updateBody: { ...filterValues }, userId: a.entityId };

      return { ...a };
    })
    .mergeMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .mergeMap(response => {
          if (response.result.roleId !== getSelectedEntity(store.getState()).get('roleId')) {
            response.result.roleName = findEntity(store.getState(), 'roles', response.result.roleId).get('name');
          }
          if (response.result && response.result.extensions) {
            const userExtensions = getUpdatedUserExtensions(store.getState(), response.result.extensions);
            if (userExtensions.length) {
              a.values.extensions = userExtensions.map(item => ({
                ...item,
                id: generateUUID()
              }));
            }
          }

          const actionList = [
            handleSuccess(response, a, `User was updated successfully!`),
            { ...a, type: 'UPDATE_USER_CAPACITY_RULE' },
            { ...a, type: 'UPDATE_PLATFORM_USER_ENTITY' }
          ];

          // skip 'UPDATE_PLATFORM_USER_ENTITY' submission if the invitation status is still pending (pending, invited or expired)
          // and if there is not yet entered the firstName and lastName
          if (
            (a.values.invitationStatus === 'pending' ||
              a.values.invitationStatus === 'invited' ||
              a.values.invitationStatus === 'expired') &&
            isEmpty(a.values.firstName) &&
            isEmpty(a.values.lastName)
          ) {
            actionList.splice(2, 1);
          }
          return actionList;
        })
        .catch(error => handleError(error, a))
    );

export const UpdateUserCapacityRule = (action$, store) =>
  action$
    .ofType('UPDATE_USER_CAPACITY_RULE')
    .map(a => ({
      ...a,
      currentCapacityRule: getSelectedEntity(store.getState()).getIn(['effectiveCapacityRule', 'id'], null)
    }))
    .filter(
      ({ entityName, currentCapacityRule, values: { effectiveCapacityRule } }) =>
        entityName === 'users' && effectiveCapacityRule !== null && effectiveCapacityRule !== currentCapacityRule
    )
    .map(a => {
      a.sdkCall = {
        command: 'updateUsersCapacityRule',
        data: {
          userId: a.values.id,
          capacityRuleId: a.values.effectiveCapacityRule,
          // SDK fetchs user data to get effectiveCapacityRule,
          // we add it to avoid that call
          effectiveCapacityRule: a.currentCapacityRule
        },
        module: 'entities',
        topic: 'cxengage/entities/update-users-capacity-rule-response'
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const UpdatePlatformUserEntity = action$ =>
  action$
    .ofType('UPDATE_PLATFORM_USER_ENTITY')
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

      a.sdkCall.data = { updateBody: { ...filterValues }, userId: a.entityId };

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
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .switchMap(response => {
          delete response.result.extensions;
          return [
            handleSuccess(response, a),
            {
              type: 'FETCH_DATA_ITEM',
              entityName: 'tenants',
              id: currentTenantId(store.getState())
            }
          ];
        })
        .catch(error => handleError(error, a))
    );

export const FetchSidePanelUserDataFulfilled = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID_FULFILLED')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'users')
    .map(a => {
      const roles = selectTenantRoles(store.getState());
      const initialValues = selectFormInitialValues(store.getState());

      const userExtensions = getUpdatedUserExtensions(store.getState(), initialValues.extensions);
      if (userExtensions.length) {
        a.payloadValues = { ...initialValues, extensions: userExtensions };
      }

      a.payloadValues = roles.find(role => role.value === initialValues.roleId)
        ? initialValues
        : { ...initialValues, roleId: null };
      return { ...a };
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `users:${a.id}`,
        keepDirty: false,
        updateUnregisteredFields: false
      },
      payload: a.payloadValues
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
      entityName: getCurrentEntity(store.getState())
    }))
    .filter(a => a.entityName === 'users')
    .map(a => ({
      ...a,
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
      if (!a.values.platformRoleId) {
        a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('invite', 'singleMainEntity');
        const filteredValues = {
          workStationId: a.values.workStationId,
          roleId: a.values.roleId,
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
      }
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
      const allIdsToProcess = getSelectedEntityBulkChangeItems(store.getState());
      const sdkCall = entitiesMetaData['users'].entityApiRequest('update', 'singleMainEntity');
      const allSdkCalls = [];
      const allUsersSelected = [...allIdsToProcess.toJS()];
      for (let index = 0, len = allUsersSelected.length; index < len; index++) {
        let item = allUsersSelected[index];
        let currentBulkUser = findEntity(store.getState(), 'users', item);

        // Cannot perform bulk actions on users with no firstName and lastName set
        if (
          !(currentBulkUser.get('firstName') && currentBulkUser.get('lastName')) &&
          !a.values.inviteNow &&
          !a.values.resendInvitation &&
          !a.values.cancelInvitation
        ) {
          Toast.error(
            `User "${currentBulkUser.get('email')}" must have firstName and lastName set before performing any action.`
          );
          continue;
        }

        // Creating values to pass data to sdkCall, this data will be
        // used for a single call to updateUser function
        let sdkCallValues = { updateBody: {}, userId: item };

        /**
         * Users Status
         */
        if (a.values.status !== undefined) {
          sdkCallValues.updateBody.status = a.values.status;
        }

        /**
         * Users region
         */
        if (a.values.region !== undefined) {
          // Active Extension
          // We update user's active extension if exists
          // by setting the new region.
          let activeExtension = currentBulkUser.get('activeExtension');
          if (activeExtension) {
            activeExtension.region = a.values.region;
          }
          // Users Extensions
          // All extensions where provider is twilio must
          // be updated with new region.
          // A user should have just one twilio extension.
          // Active extension must be twilio.
          const extensions = [...currentBulkUser.get('extensions').toJS()];
          for (let index = 0; index < extensions.length; index++) {
            let extension = extensions[index];
            if (extension.provider && extension.provider === 'twilio') {
              extension.region = a.values.region;
              activeExtension = extension;
            }
            delete extension.id;
          }

          sdkCallValues.updateBody.activeExtension = activeExtension;
          sdkCallValues.updateBody.extensions = extensions;
        }

        /**
         * Users Platform Authentication
         */
        if (a.values.noPassword !== undefined) {
          if (a.values.noPassword === 'null') {
            sdkCallValues.updateBody.noPassword = null;
          } else {
            sdkCallValues.updateBody.noPassword = a.values.noPassword === 'true';
          }
        }

        /**
         * Users Default Identity Provider
         */
        if (a.values.defaultIdentityProvider !== undefined) {
          sdkCallValues.updateBody.defaultIdentityProvider =
            a.values.defaultIdentityProvider === 'null' ? null : a.values.defaultIdentityProvider;
        }

        /**
         * Users Invite Status
         */
        if (
          a.values.inviteNow &&
          ['invited', 'expired', 'enabled', 'disabled', 'sso-only'].includes(currentBulkUser.get('invitationStatus'))
        ) {
          console.warn(
            `Cannot send email invitation for User (${currentBulkUser.get(
              'email'
            )}) as he/she is in one of the following states: "Invited", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
          Toast.error(
            `Cannot send email invitation for User (${currentBulkUser.get(
              'email'
            )}) as he/she is in one of the following states: "Invited", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
        } else if (
          a.values.resendInvitation &&
          ['enabled', 'disabled', 'sso-only'].includes(currentBulkUser.get('invitationStatus'))
        ) {
          console.warn(
            `Cannot resend an email invitation for User (${currentBulkUser.get(
              'email'
            )}) as he/she is in one of the following states: "Enabled", "Disabled" or "SSO Only".`
          );
          Toast.error(
            `Cannot resend an email invitation for User (${currentBulkUser.get(
              'email'
            )}) as he/she is in one of the following states: "Enabled", "Disabled" or "SSO Only".`
          );
        } else if (
          a.values.cancelInvitation &&
          ['pending', 'expired', 'enabled', 'disabled', 'sso-only'].includes(currentBulkUser.get('invitationStatus'))
        ) {
          console.warn(
            `Cannot cancel email invitation for User (${currentBulkUser.get(
              'email'
            )}) as he/she is in one of the following states: "Pending Invitation", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
          Toast.error(
            `Cannot cancel email invitation for User (${currentBulkUser.get(
              'email'
            )}) as he/she is in one of the following states: "Pending Invitation", "Expired Invitation", "Enabled", "Disabled" or "SSO Only".`
          );
        } else if (a.values.inviteNow || a.values.resendInvitation || a.values.cancelInvitation) {
          // Change each user invitation status if any of these options
          // are selected: inviteNow | resendInvitation | cancelInvitation
          sdkCallValues.updateBody.status = a.values.cancelInvitation ? 'pending' : 'invited';
        }

        if (Object.keys(sdkCallValues.updateBody).length) {
          // Using the default sdkCall to update single entity data,
          // by calling updateUser
          allSdkCalls.push({ ...sdkCall, data: { ...sdkCallValues } });
        }

        /**
         * Users Password Reset
         */
        if (a.values.passwordReset) {
          if (['invited', 'pending', 'expired'].includes(currentBulkUser.get('invitationStatus'))) {
            console.warn(
              `Cannot send a password reset email to User (${currentBulkUser.get(
                'email'
              )}) as he/she is in one of the following states: "Invited", "Pending Invitation", "Expired Invitation" or doesn't have firstName and lastName set.`
            );
            Toast.error(
              `Cannot send a password reset email to User (${currentBulkUser.get(
                'email'
              )}) as he/she is in one of the following states: "Invited", "Pending Invitation", "Expired Invitation" or doesn't have firstName and lastName set.`
            );
          } else {
            // Reset password for all users if option was selected
            allSdkCalls.push({
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

        /**
         * Associate / Dissociate Skills
         */
        if (a.values.addSkill || a.values.removeSkill) {
          const skillSelected = findEntityByProperty(
            store.getState(),
            'skills',
            'name',
            a.values.addSkill || a.values.removeSkill
          );
          const userHasSkillSelected =
            currentBulkUser.get('skills').filter(skill => {
              if (typeof skill === 'object') {
                return skillSelected.get('id') === (skill.get('skillId') || skill.get('id'));
              }
              return skill === skillSelected.get('id');
            }).size > 0;
          const callData = {
            module: 'entities',
            data: {
              originEntity: { name: 'users', id: item },
              destinationEntity: { name: 'skills', id: skillSelected.get('id') }
            },
            command: 'associate',
            topic: `cxengage/entities/associate-response`
          };

          if (a.values.addSkill) {
            if (userHasSkillSelected) {
              console.warn(`"${a.values.addSkill}" is already associated with user (${currentBulkUser.get('email')})`);
              Toast.warning(`"${a.values.addSkill}" is already associated with user (${currentBulkUser.get('email')})`);
              continue;
            }
            console.warn(
              `Attempting to associate skill (${a.values.addSkill}) to user (${currentBulkUser.get('email')})`
            );
            allSdkCalls.push(callData);
          } else {
            if (!userHasSkillSelected) {
              console.warn(
                `"${a.values.removeSkill}" is not associated with the user (${currentBulkUser.get('email')})`
              );
              Toast.warning(
                `"${a.values.removeSkill}" is not associated with the user (${currentBulkUser.get('email')})`
              );
              continue;
            }
            console.warn(
              `Attempting to dissociate skill (${a.values.removeSkill}) from user (${currentBulkUser.get('email')})`
            );
            allSdkCalls.push({ ...callData, command: 'dissociate', topic: `cxengage/entities/dissociate-response` });
          }
        }

        /**
         * Associate / Dissociate Groups
         */
        if (a.values.addGroup || a.values.removeGroup) {
          const groupSelected = findEntityByProperty(
            store.getState(),
            'groups',
            'name',
            a.values.addGroup || a.values.removeGroup
          );
          const userHasGroupSelected =
            currentBulkUser.get('groups').filter(group => {
              if (typeof group === 'object') {
                return groupSelected.get('id') === (group.get('groupId') || group.get('id'));
              }
              return group === groupSelected.get('id');
            }).size > 0;
          const callData = {
            module: 'entities',
            data: {
              originEntity: { name: 'groups', id: groupSelected.get('id') },
              destinationEntity: { name: 'users', id: item }
            },
            command: 'associate',
            topic: `cxengage/entities/associate-response`
          };

          if (a.values.addGroup) {
            if (userHasGroupSelected) {
              console.warn(`"${a.values.addGroup}" is already associated with user (${currentBulkUser.get('email')})`);
              Toast.warning(`"${a.values.addGroup}" is already associated with user (${currentBulkUser.get('email')})`);
              continue;
            }
            console.warn(
              `Attempting to associate group (${a.values.addGroup}) to user (${currentBulkUser.get('email')})`
            );
            allSdkCalls.push(callData);
          } else {
            if (!userHasGroupSelected) {
              console.warn(
                `"${a.values.removeGroup}" is not associated with the user (${currentBulkUser.get('email')})`
              );
              Toast.warning(
                `"${a.values.removeGroup}" is not associated with the user (${currentBulkUser.get('email')})`
              );
              continue;
            }
            console.warn(
              `Attempting to dissociate group (${a.values.removeGroup}) from user (${currentBulkUser.get('email')})`
            );
            allSdkCalls.push({ ...callData, command: 'dissociate', topic: `cxengage/entities/dissociate-response` });
          }
        }
      }
      return { ...a, allSdkCalls };
    })
    .mergeMap(
      a =>
        a.allSdkCalls.length > 0
          ? forkJoin(
              a.allSdkCalls.map(apiCall =>
                from(
                  sdkPromise(apiCall).catch(error => ({
                    error: error,
                    id: apiCall.data['userId'],
                    toString: getEntityItemDisplay(store.getState(), apiCall.data['userId'])
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
          : of({ type: 'BULK_ENTITY_UPDATE_cancelled' })
    );

export const FocusNoPasswordValueFormField = action$ =>
  action$
    .ofType('@@redux-form/REGISTER_FIELD')
    .filter(
      a =>
        a.meta.form === 'users:bulk' &&
        (a.payload.name === 'noPassword' || a.payload.name === 'defaultIdentityProvider')
    )
    .map(a => change(a.meta.form, a.payload.name, 'null'));

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
