/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';
import { getCurrentForm } from '../../form/selectors';
import { convertRoles } from '../roles/selectors';
import { convertPermissions } from '../permissions/selectors';
import { getEntityListMembers, availableEntityMembersForList } from '../../entities/listItemSelectors';

export const getUsers = state => state.getIn(['Entities', 'users', 'data']);

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

export const getDisplay = data => {
  if (data.firstName || data.lastName) {
    return ((data.firstName ? data.firstName : '') + ' ' + (data.lastName ? data.lastName : '')).trim();
  }
  return data.email;
};

export const getUserTenantStatus = state => getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'status']);

export const getInvitationScenario = state => {
  const id = getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'id']);
  const invitationStatus = getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'invitationStatus']);
  if (!id) {
    return 'invite:new:user';
  } else if (invitationStatus === 'pending' || invitationStatus === 'invited') {
    return 'invite:existing:user';
  }
  return 'update';
};

export const selectEntityListMembers = state =>
  getEntityListMembers(state).map(user => ({
    ...user,
    name: getDisplay(user),
    firstName: user.firstName !== null ? user.firstName : '',
    lastName: user.lastName !== null ? user.lastName : ''
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
    name: getDisplay(user),
    firstName: user.firstName !== null ? user.firstName : '',
    lastName: user.lastName !== null ? user.lastName : ''
  }));
};
