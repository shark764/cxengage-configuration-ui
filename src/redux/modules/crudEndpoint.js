/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS, Map } from 'immutable';
import { createSelector } from 'reselect';
import { submit } from 'redux-form';
import { sdkPromise } from '../../utils/sdk';
import { capitalizeFirstLetter, removeLastLetter } from '../../utils/string';

// Constants

const SET_CURRENT_ENTITY = 'SET_CURRENT_ENTITY';
const DESELECT_CURRENT_ENTITY = 'DESELECT_CURRENT_ENTITY';
const SET_SELECTED_ENTITY_ID = 'SET_SELECTED_ENTITY_ID';
const FETCH_DATA = 'FETCH_DATA';
// const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
const FETCH_DATA_FULFILLED = 'FETCH_DATA_FULFILLED';
// const FETCH_DATA_REJECTED = 'FETCH_DATA_REJECTED';
const UPDATE_ENTITY = 'UPDATE_ENTITY';
const UPDATE_ENTITY_PENDING = 'UPDATE_ENTITY_PENDING';
const UPDATE_ENTITY_FULFILLED = 'UPDATE_ENTITY_FULFILLED';
// const UPDATE_ENTITY_REJECTED = 'UPDATE_ENTITY_REJECTED';

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
    payload: sdkPromise(
      {
        module: 'entities',
        command: `get${capitalizeFirstLetter(entityName)}`,
        data: {}
      },
      `cxengage/entities/get-${entityName}-response`
    ),
    meta: {
      entityName
    }
  };
}

export function onFormButtonSubmit() {
  return function(dispatch, getState) {
    const currentEntity = getState()
      .get('crudEndpoint')
      .get('currentEntity');
    dispatch(submit(currentEntity));
  };
}

export function onFormSubmit(values, { dirty }) {
  return function(dispatch, getState) {
    if (dirty) {
      const crudEndpoint = getState().get('crudEndpoint');
      const currentEntity = crudEndpoint.get('currentEntity');
      const selectedEntityId = crudEndpoint.get('selectedEntityId');
      dispatch(updateEntity(currentEntity, selectedEntityId, values.toJS()));
    }
  };
}

export function toggleEntityActive() {
  return function(dispatch, getState) {
    const crudEndpoint = getState().get('crudEndpoint');
    const currentEntity = crudEndpoint.get('currentEntity');
    const selectedEntityId = crudEndpoint.get('selectedEntityId');
    const selectedEntity = crudEndpoint
      .get('data')
      .get(currentEntity)
      .find(entity => entity.get('id') === selectedEntityId);
    dispatch(
      updateEntity(currentEntity, selectedEntityId, {
        active: !selectedEntity.get('active')
      })
    );
  };
}

function updateEntity(entityName, entityId, updatedValues) {
  const singularEntityName = removeLastLetter(entityName);
  return {
    type: UPDATE_ENTITY,
    payload: sdkPromise(
      {
        module: 'entities',
        command: `update${capitalizeFirstLetter(singularEntityName)}`,
        data: Object.assign(updatedValues, {
          [`${singularEntityName}Id`]: entityId
        })
      },
      `cxengage/entities/update-${singularEntityName}-response`
    ),
    meta: {
      entityName,
      entityId,
      fields: Object.keys(updatedValues)
    }
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
    case UPDATE_ENTITY_PENDING: {
      const entityIndex = state
        .getIn(['data', action.meta.entityName])
        .findIndex(entity => entity.get('id') === action.meta.entityId);
      if (entityIndex !== -1) {
        return state.setIn(
          ['data', action.meta.entityName, entityIndex, 'updating'],
          true
        );
      } else {
        return state;
      }
    }
    case UPDATE_ENTITY_FULFILLED: {
      const entityIndex = state
        .getIn(['data', action.meta.entityName])
        .findIndex(entity => entity.get('id') === action.meta.entityId);
      if (entityIndex !== -1) {
        let updatedFields = new Map({ updating: false });
        action.meta.fields.forEach(field => {
          updatedFields = updatedFields.set(field, action.payload[field]);
        });
        return state.mergeIn(
          ['data', action.meta.entityName, entityIndex],
          updatedFields
        );
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

// Selectors

const getCurrentEntity = state =>
  state.getIn(['crudEndpoint', 'currentEntity']);
const getAllEntities = state => state.get('crudEndpoint').get('data');
const getSelectedEntityId = state =>
  state.getIn(['crudEndpoint', 'selectedEntityId']);

export const getSelectedEntity = createSelector(
  [getCurrentEntity, getAllEntities, getSelectedEntityId],
  (currentEntity, allEntities, id) => {
    if (currentEntity && id) {
      return allEntities.get(currentEntity).find(obj => obj.get('id') === id);
    }
    return undefined;
  }
);
