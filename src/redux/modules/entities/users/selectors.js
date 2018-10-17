/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';

const getUsers = state => state.getIn(['Entities', 'users', 'data']);

export const selectTenantUsers = createSelector(getUsers, users => {
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

export const getDisplay = data => {
  if (data.firstName || data.lastName) {
    return ((data.firstName ? data.firstName : '') + ' ' + (data.lastName ? data.lastName : '')).trim();
  }
  return data.email;
};
