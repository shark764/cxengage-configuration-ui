/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { List } from 'immutable';
import { getCurrentEntity, getSelectedEntity, getCurrentEntityStore } from './selectors';
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

export const getEntityListMembers = state => {
  const dependentEntity = entitiesMetaData[getCurrentEntity(state)].dependentEntity;
  if (listMemberObjects(state) === undefined || getSelectedEntity(state).get(dependentEntity) === undefined) {
    return [];
  } else {
    return listMemberObjects(state)
      .filter(member =>
        getSelectedEntity(state)
          .get(dependentEntity)
          .includes(member.get('id'))
      )
      .toJS();
  }
};

export const selectedEntityIndex = state =>
  getCurrentEntityStore(state)
    .get('data')
    .findIndex(entity => entity.get('id') === getCurrentEntityStore(state).get('selectedEntityId'));

export const availableEntityMembersForList = state => {
  const dependentEntity = entitiesMetaData[getCurrentEntity(state)].dependentEntity;
  const currentListMembers = getCurrentEntityStore(state)
    .getIn(['data', selectedEntityIndex(state), dependentEntity])
    .toOrderedSet();
  const allListOptions =
    state.getIn(['Entities', dependentEntity, 'data']) !== undefined
      ? state.getIn(['Entities', dependentEntity, 'data']).toOrderedSet()
      : new List([]);
  const availableOptions = allListOptions.filter(option => !currentListMembers.includes(option.get('id')));
  return availableOptions.toJS();
};

export const entityRemovedFromList = (state, itemId) => {
  const currentListMembers = getCurrentEntityStore(state)
    .getIn(['data', selectedEntityIndex(state), entitiesMetaData[getCurrentEntity(state)].dependentEntity])
    .toOrderedSet();
  const newMembers = currentListMembers.filter(item => item !== itemId);
  return newMembers.toJS();
};

export const entityAddedToList = (state, itemId) => {
  const currentListMembers = getCurrentEntityStore(state).getIn([
    'data',
    selectedEntityIndex(state),
    entitiesMetaData[getCurrentEntity(state)].dependentEntity
  ]);
  const newMembers = currentListMembers.toJS();
  return [itemId, ...newMembers];
};

export const entitiesMembers = state => {
  const currentListMembers = getCurrentEntityStore(state).getIn([
    'data',
    selectedEntityIndex(state),
    entitiesMetaData[getCurrentEntity(state)].dependentEntity
  ]);
  return currentListMembers.toJS();
};
