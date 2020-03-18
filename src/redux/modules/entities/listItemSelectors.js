/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { List } from 'immutable';
import { getCurrentEntity, getSelectedEntity, getCurrentEntityStore, getSelectedEntityId } from './selectors';
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

/**
 *
 * This selector is used when the members that are associated to the entity
 * are provided by the api as an array of ids
 */
export const getSidePanelTableItems = (state, entityName) => {
  const selectedEntity = getSelectedEntity(state);
  const requestedIds = selectedEntity && selectedEntity.getIn([entityName], new List([])).toJS();
  let requestedItems = state.getIn(['Entities', entityName, 'data']);
  if (requestedItems) {
    requestedItems = requestedItems.toJS().filter(member => requestedIds.includes(member.id));
    if (entityName === 'reasonLists') {
      requestedItems = requestedItems.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    }
  }
  return requestedItems;
};

export const getModalTableItems = (state, entityName) => {
  const requestedIds = getSelectedEntity(state)
    .getIn([entityName], new List([]))
    .toJS();
  const requestedItems = state.getIn(['Entities', entityName, 'data'], new List([]));
  if (requestedItems && entityName !== 'reasonLists') {
    return requestedItems.toJS().filter(member => !requestedIds.includes(member.id));
  } else if (requestedItems && entityName === 'reasonLists') {
    return requestedItems.toJS().filter(member => !requestedIds.includes(member.id) && !member.isDefault);
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
    .findIndex(entity => entity.get('id') === getSelectedEntityId(state));

export const availableEntityMembersForList = state => {
  const dependentEntity = entitiesMetaData[getCurrentEntity(state)].dependentEntity;
  const currentListMembers = getCurrentEntityStore(state)
    .getIn(['data', selectedEntityIndex(state), dependentEntity], new List([]))
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
    .getIn(
      ['data', selectedEntityIndex(state), entitiesMetaData[getCurrentEntity(state)].dependentEntity],
      new List([])
    )
    .toOrderedSet();
  const newMembers = currentListMembers.filter(item => item !== itemId);
  return newMembers.toJS();
};

export const entityAddedToList = (state, itemId) => {
  const currentListMembers = getCurrentEntityStore(state).getIn(
    ['data', selectedEntityIndex(state), entitiesMetaData[getCurrentEntity(state)].dependentEntity],
    new List([])
  );
  const newMembers = currentListMembers.toJS();
  return [itemId, ...newMembers];
};
