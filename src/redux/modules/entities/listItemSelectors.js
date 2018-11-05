/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { List } from 'immutable';
import { getCurrentEntity, getSelectedEntity } from './selectors';
import { entitiesMetaData } from './metaData';

export const listMemberIds = state =>
  getSelectedEntity(state)
    .getIn([entitiesMetaData[getCurrentEntity(state)].dependentEntity], new List([]))
    .toJS();

export const listMemberObjects = state =>
  state.getIn(['Entities', entitiesMetaData[getCurrentEntity(state)].dependentEntity, 'data'], new List([]));

export const getDependantEntityTableItems = state =>
  listMemberObjects(state)
    ? listMemberObjects(state)
        .toJS()
        .filter(member => listMemberIds(state).includes(member.id))
    : [];

export const getSidePanelTableItems = (state, entityName) => {
  const requestedIds = getSelectedEntity(state)
    .getIn([entityName], new List([]))
    .toJS();
  const requestedItems = state.getIn(['Entities', entityName, 'data'], new List([]));
  if (requestedItems !== undefined) {
    return requestedItems.toJS().filter(member => requestedIds.includes(member.id));
  } else {
    return [];
  }
};

export const getModalTableItems = (state, entityName) => {
  const requestedIds = getSelectedEntity(state)
    .getIn([entityName], new List([]))
    .toJS();
  const requestedItems = state.getIn(['Entities', entityName, 'data'], new List([]));
  if (requestedItems !== undefined) {
    return requestedItems.toJS().filter(member => !requestedIds.includes(member.id));
  } else {
    return [];
  }
};

export const getListSize = state => getDependantEntityTableItems(state).length;

export const availableItemsForList = state =>
  listMemberObjects(state)
    ? listMemberObjects(state)
        .toJS()
        .filter(member => !listMemberIds(state).includes(member.id))
    : [];
