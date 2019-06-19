/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';
import { getSelectedEntity, userHasPermissions, userHasEveryPermissions } from '../selectors';
import { convertRoles, selectPlatformRoles } from '../roles/selectors';
import { convertPermissions } from '../permissions/selectors';
import {
  getEntityListMembers,
  availableEntityMembersForList,
  getModalTableItems,
  getSidePanelTableItems
} from '../listItemSelectors';
import { isTenantSetForReadAllMode } from '../../userData/selectors';

export const getUsers = state => state.getIn(['Entities', 'users', 'data']);

export const existsPlatformUserByEmail = state => state.getIn(['Entities', 'users', 'userExistInPlatform'], false);

export const selectNonDisabledUsers = createSelector([getUsers], users => {
  return users !== undefined
    ? users
        .toJS()
        .filter(user => user.platformStatus !== 'disabled' && user.status !== 'disabled')
        .map(user => ({
          ...user,
          name: getDisplay(user)
        }))
    : undefined;
});

export const filterUsersByPermissions = (state, users, permissionNames) => {
  const allRoles = convertRoles(state);
  const allPermissions = convertPermissions(state);
  const permissionIds = allPermissions.filter(perm => permissionNames.includes(perm.name)).map(item => item.id);

  return users.filter(
    user =>
      allRoles[allRoles.findIndex(role => role.id === user.roleId)].permissions.filter(perm =>
        permissionIds.includes(perm)
      ).length === permissionIds.length
  );
};

export const getDisplay = (data, showBlankString) => {
  if (data === undefined) {
    return '';
  } else if (data.firstName || data.lastName) {
    return `${data.firstName || ''} ${data.lastName || ''}`.trim();
  } else if (showBlankString) {
    return '';
  } else {
    return data.email;
  }
};

export const getUserInvitationStatus = state => getSelectedEntity(state).get('invitationStatus');

export const selectEntityListMembers = state =>
  getEntityListMembers(state).map(user => ({
    ...user,
    name: getDisplay(user)
  }));

/*
- Send permissions as empty array in case you don't want to filter the users by one or more permissions.
*/
export const selectAvailableEntityMembersForList = (state, permissions = []) => {
  let usersMap = null;
  //check if permissions is an actual array, if not then do a regular Entity Member call for this table, regardless of permissions
  if (Array.isArray(permissions) && permissions.length > 0) {
    //permissions is an array, so let's use all permissions a user should have to be used on this list.
    usersMap = filterUsersByPermissions(state, availableEntityMembersForList(state), permissions);
  } else {
    usersMap = availableEntityMembersForList(state);
  }
  return usersMap.map(user => ({
    ...user,
    name: getDisplay(user)
  }));
};

export const getModalTableUserItems = (state, entityName) => {
  return getModalTableItems(state, entityName).map(user => ({
    ...user,
    name: getDisplay(user)
  }));
};

export const getSkillsWithProficiencyTableItems = state =>
  getSkillsWithProficiency(getSelectedEntity(state), getSidePanelTableItems(state, 'skills'));

export const getSkillsWithProficiency = (selectedEntity, sidePanelTableItems) =>
  sidePanelTableItems.map(skill => ({
    ...skill,
    proficiency:
      skill.hasProficiency &&
      selectedEntity
        .get('skillsWithProficiency')
        .find(skillWP => skillWP.get('skillId') === skill.id)
        .get('proficiency')
  }));

export const isUserPlatformAdmin = state => {
  // Platform admin is allowed to view all platformRoles
  // otherwise, user is allowed to just view "Platform User"
  // and "Platform User Password Restricted"
  return selectPlatformRoles(state).filter(role => 'Platform Administrator' === role.label).length !== 0;
};

//
// Condition whether user belongs to tenant or
// non-active tenant has been set as active
//
export const userHasLogiImpersonatePermissions = state =>
  (!isTenantSetForReadAllMode(state) &&
    (userHasPermissions(state, ['PLATFORM_IMPERSONATE_REPORTING_USERS']) ||
      userHasEveryPermissions(state, ['IMPERSONATE_REPORTING_USERS', 'VIEW_ALL_USERS']))) ||
  (isTenantSetForReadAllMode(state) &&
    userHasEveryPermissions(state, [
      'PLATFORM_IMPERSONATE_REPORTING_USERS',
      'PLATFORM_VIEW_ALL_TENANTS',
      'PLATFORM_VIEW_ALL_USERS',
      'PLATFORM_CONFIG_USERS_VIEW'
    ]));
