/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { getSelectedEntity } from '../selectors';
import { selectFormInitialValues } from '../../form/selectors';

export const getRoles = state => state.getIn(['Entities', 'roles'], new Map([]));

export const convertRoles = createSelector([getRoles], roles => roles.get('data').toJS());

export const selectTenantRoles = createSelector([getRoles], roles => {
  const rolesArray = roles
    .get('data')
    .toJS()
    .filter(role => role.active)
    .map(role => ({
      value: role.id,
      label: role.name
    }));
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

export const getPlatformRoles = state => state.getIn(['Entities', 'platformRoles', 'data']);

export const selectPlatformRoles = createSelector([getPlatformRoles], roles =>
  roles
    .toJS()
    .map(role => ({
      value: role.id,
      label: role.name
    }))
    .reverse()
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
