/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

// TESTING ONLY
import { testListData } from './mocks';

// Constants

const SET_CURRENT_ENTITY = 'SET_CURRENT_ENTITY';
const DESELECT_CURRENT_ENTITY = 'DESELECT_CURRENT_ENTITY';
const SET_SELECTED_ENTITY_ID = 'SET_SELECTED_ENTITY_ID';
const FETCH_DATA = 'FETCH_DATA';
// const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
const FETCH_DATA_FULFILLED = 'FETCH_DATA_FULFILLED';
const ON_FORM_SUBMIT = 'ON_FORM_SUBMIT';

// Actions

export function setCurrentEntity(entityName) {
  return {
    type: SET_CURRENT_ENTITY,
    payload: entityName
  };
}

export function deselectCurrentEntity() {
  return {
    type: DESELECT_CURRENT_ENTITY
  };
}

export function setSelectedEntityId(entityId) {
  return {
    type: SET_SELECTED_ENTITY_ID,
    payload: entityId
  };
}

export function fetchData(entityName) {
  // Use entityName to replace the demo promise and meta data below
  return {
    type: FETCH_DATA,
    payload: new Promise(function(resolve, reject) {
      setTimeout(resolve, 100, testListData);
    }),
    meta: {
      entityName: 'lists'
    }
  };
}

export function onFormSubmit() {
  return {
    type: ON_FORM_SUBMIT
  };
}

// Initial Sub State

const initialState = fromJS({
  currentEntity: '',
  selectedEntityId: '',
  data: {
    lists: []
  }
});

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ENTITY:
      return state.set('currentEntity', action.payload);
    case DESELECT_CURRENT_ENTITY:
      return state.set('selectedEntityId', '');
    case SET_SELECTED_ENTITY_ID:
      return state.set('selectedEntityId', action.payload);
    case FETCH_DATA_FULFILLED:
      return state.setIn(
        ['data', action.meta.entityName],
        fromJS(action.payload.result)
      );
    case ON_FORM_SUBMIT:
      // TODO add in SDK
      return state;
    default:
      return state;
  }
}

// Selectors

const getCurrentEntity = state =>
  state.get('crudEndpoint').get('currentEntity');
const getAllEntities = state => state.get('crudEndpoint').get('data');
const getSelectedEntityId = state =>
  state.get('crudEndpoint').get('selectedEntityId');

export const getSelectedEntity = createSelector(
  [getCurrentEntity, getAllEntities, getSelectedEntityId],
  (currentEntity, allEntities, id) => {
    if (currentEntity && id) {
      return allEntities.get(currentEntity).find(obj => obj.get('id') === id);
    }
    return undefined;
  }
);
