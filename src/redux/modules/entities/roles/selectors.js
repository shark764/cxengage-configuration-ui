/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { getSelectedEntity } from '../selectors';
import { getAllPermissions } from '../permissions/selectors';

export const getRoles = state => {
  return state.getIn(['Entities', 'roles'], new Map([]));
};

export const getEntityListMembers = state => {
  if (getAllPermissions(state) === undefined) {
    return [];
  } else {
    return getAllPermissions(state)
      .filter(perm =>
        getSelectedEntity(state)
          .get('permissions')
          .includes(perm.get('id'))
      )
      .toJS();
  }
};

export const selectedEntityIndex = state =>
  getRoles(state)
    .get('data')
    .findIndex(entity => entity.get('id') === getRoles(state).get('selectedEntityId'));

export const availablePermissionsForList = state => {
  const currentListMembers = getRoles(state)
    .getIn(['data', selectedEntityIndex(state), 'permissions'])
    .toOrderedSet();
  const allListOptions = state.getIn(['Entities', 'permissions', 'data']).toOrderedSet();
  const availableOptions = allListOptions.filter(option => !currentListMembers.includes(option.get('id')));
  return availableOptions.toJS();
};

export const entityRemovedFromList = (state, itemId) => {
  const currentListMembers = getRoles(state)
    .getIn(['data', selectedEntityIndex(state), 'permissions'])
    .toOrderedSet();
  const newPermissions = currentListMembers.filter(item => item !== itemId);
  return newPermissions.toJS();
};

export const entityAddedToList = (state, itemId) => {
  const currentListMembers = getRoles(state).getIn(['data', selectedEntityIndex(state), 'permissions']);
  const newPermissions = currentListMembers.toJS();
  return [itemId, ...newPermissions];
};

export const entitiesPermissions = state => {
  const currentListMembers = getRoles(state).getIn(['data', selectedEntityIndex(state), 'permissions']);
  return currentListMembers.toJS();
};

export const getListSize = state => getSelectedEntity(state).get('permissions').size;
