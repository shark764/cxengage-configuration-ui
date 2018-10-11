/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';
import { getCurrentForm } from '../../form/selectors';

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
