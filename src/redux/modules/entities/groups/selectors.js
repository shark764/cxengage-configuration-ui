/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getDependantEntityTableItems } from '../listItemSelectors';
import { getDisplay } from '../users/selectors';
import { createSelector } from 'reselect';
import { getSelectedEntity } from '../selectors';
import { List } from 'immutable';

export const getGroupsDependantEntityTableItems = state => {
  return getDependantEntityTableItems(state).map(user => ({
    ...user,
    name: getDisplay(user)
  }));
};

export const getGroupsData = state => state.getIn(['Entities', 'groups', 'data'], new List([]));

export const selectGroups = createSelector([getGroupsData], groups => {
  const groupsArray = groups
    .filter(group => group.get('active'))
    .map(group => ({ value: group.get('id'), label: group.get('name') }))
    .toJS();
  return groupsArray;
});

export const isEveryone = createSelector(
  getSelectedEntity,
  selectedEntity => selectedEntity && selectedEntity.get('type') === 'everyone'
);
