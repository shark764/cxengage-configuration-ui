/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { getCurrentForm } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';
import { getUsers } from '../users/selectors';

export const getDataAccessReports = state => {
  return state.getIn(['Entities', 'dataAccessReports'], new Map([]));
};

export const getReportTypeFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'reportType']);

export const getRealtimeReportTypeFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'realtimeReportType']);

export const getEntityListMembers = state => {
  if (getUsers(state) === undefined || getSelectedEntity(state).get('users') === undefined) {
    return [];
  } else {
    return getUsers(state)
      .filter(perm =>
        getSelectedEntity(state)
          .get('users')
          .includes(perm.get('id'))
      )
      .toJS();
  }
};

export const selectedEntityIndex = state =>
  getDataAccessReports(state)
    .get('data')
    .findIndex(entity => entity.get('id') === getDataAccessReports(state).get('selectedEntityId'));

export const availableUsersForList = state => {
  const currentListMembers = getDataAccessReports(state)
    .getIn(['data', selectedEntityIndex(state), 'users'])
    .toOrderedSet();
  const allListOptions = state.getIn(['Entities', 'users', 'data']).toOrderedSet();
  const availableOptions = allListOptions.filter(option => !currentListMembers.includes(option.get('id')));
  return availableOptions.toJS();
};

export const userRemovedFromList = (state, itemId) => {
  const currentListMembers = getDataAccessReports(state)
    .getIn(['data', selectedEntityIndex(state), 'users'])
    .toOrderedSet();
  const newUsers = currentListMembers.filter(item => item !== itemId);
  return newUsers.toJS();
};

export const userAddedToList = (state, itemId) => {
  const currentListMembers = getDataAccessReports(state).getIn(['data', selectedEntityIndex(state), 'users']);
  const newUsers = currentListMembers.toJS();
  return [itemId, ...newUsers];
};

export const entitiesUsers = state => {
  const currentListMembers = getDataAccessReports(state).getIn(['data', selectedEntityIndex(state), 'users']);
  return currentListMembers.toJS();
};

export const getListSize = state => getSelectedEntity(state).get('users') && getSelectedEntity(state).get('users').size;
