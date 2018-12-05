/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const getRoles = state => {
  return state.getIn(['Entities', 'roles'], new Map([]));
};

export const convertRoles = createSelector([getRoles], roles => roles.get('data').toJS());

export const selectTenantRoles = createSelector([getRoles], roles =>
  roles
    .get('data')
    .toJS()
    .map(role => ({
      value: role.id,
      label: role.name
    }))
);

export const getPlatformRoles = state => state.getIn(['Entities', 'platformRoles', 'data']);

export const selectPlatformRoles = createSelector([getPlatformRoles], roles =>
  roles.toJS().map(role => ({
    value: role.id,
    label: role.name
  }))
);
