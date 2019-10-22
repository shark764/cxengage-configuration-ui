/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import { getSelectedEntity } from '../selectors';
import { selectFormInitialValues } from '../../form/selectors';

export const getRoles = state => state.getIn(['Entities', 'roles'], new Map([]));
export const getRolesData = state => state.getIn(['Entities', 'roles', 'data'], new List([]));

export const convertRoles = createSelector([getRolesData], roles => roles.toJS());

export const selectTenantRoles = createSelector([getRolesData], roles => {
  const rolesArray = roles
    .filter(role => role.get('active'))
    .map(role => ({ value: role.get('id'), label: role.get('name') }))
    .toJS();
  if (rolesArray.length > 0) {
    rolesArray.splice(0, 0, rolesArray[2]);
    rolesArray.splice(3, 1);
  }
  return rolesArray;
});

export const selectFirstTenantRoleValue = state => {
  const roles = selectTenantRoles(state);
  if (roles && roles.length > 0) {
    return roles[0].value;
  }
};

export const getPlatformRoles = state => state.getIn(['Entities', 'platformRoles', 'data'], new List([]));

export const selectPlatformRoles = createSelector([getPlatformRoles], roles =>
  roles
    .map(role => ({ value: role.get('id'), label: role.get('name') }))
    .reverse()
    .toJS()
);

export const selectFirstPlatformRoleValue = state => {
  const roles = selectPlatformRoles(state);
  if (roles && roles.length > 0) {
    return roles[0].value;
  }
};

export const selectRolesFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true, shared: false });
  }
  return selectFormInitialValues(state);
};

export const selectRolesDisableShared = state =>
  selectFormInitialValues(state).get('shared') && selectFormInitialValues(state).get('id') !== undefined;
