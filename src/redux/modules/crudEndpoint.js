/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS, Map } from 'immutable';
import { createSelector } from 'reselect';
import { submit } from 'redux-form';
import { sdkPromise } from '../../utils/sdk';
import {
  capitalizeFirstLetter,
  removeLastLetter,
  camelCaseToKebabCase
} from '../../utils/string';
import { createFormMetadata, updateFormMetadata } from './formMetadata';

// Constants

const SET_CURRENT_ENTITY = 'SET_CURRENT_ENTITY';
const DESELECT_CURRENT_ENTITY = 'DESELECT_CURRENT_ENTITY';
const SET_SELECTED_ENTITY_ID = 'SET_SELECTED_ENTITY_ID';
const FETCH_DATA = 'FETCH_DATA';
// const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
const FETCH_DATA_FULFILLED = 'FETCH_DATA_FULFILLED';
// const FETCH_DATA_REJECTED = 'FETCH_DATA_REJECTED';
const CREATE_ENTITY = 'CREATE_ENTITY';
const CREATE_ENTITY_PENDING = 'CREATE_ENTITY_PENDING';
const CREATE_ENTITY_FULFILLED = 'CREATE_ENTITY_FULFILLED';
// const CREATE_ENTITY_REJECTED = 'CREATE_ENTITY_REJECTED';
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
  return function(dispatch, getState) {
    const currentEntity = getState()
      .get('crudEndpoint')
      .get('currentEntity');
    const addUndefinedEntityMetadata = metadataEntity => {
      if (
        getState().getIn(['crudEndpoint', metadataEntity, 'data']) === undefined
      ) {
        dispatch(fetchData(metadataEntity));
      }
    };
    if (entityId === 'create' && createFormMetadata[currentEntity]) {
      createFormMetadata[currentEntity].forEach(addUndefinedEntityMetadata);
    } else if (entityId !== 'create' && updateFormMetadata[currentEntity]) {
      updateFormMetadata[currentEntity].forEach(addUndefinedEntityMetadata);
    }
    dispatch(setSelectedEntityIdInStore(entityId));
  };
}

function setSelectedEntityIdInStore(entityId) {
  return {
    type: SET_SELECTED_ENTITY_ID,
    payload: entityId
  };
}

export function fetchData(entityName) {
  return {
    type: FETCH_DATA,
    payload: sdkPromise(
      {
        module: 'entities',
        command: `get${capitalizeFirstLetter(entityName)}`,
        data: {}
      },
      `cxengage/entities/get-${camelCaseToKebabCase(entityName)}-response`
    ),
    meta: {
      entityName
    }
  };
}

export function onFormButtonSubmit() {
  return function(dispatch, getState) {
    dispatch(
      submit(
        `${getCurrentEntity(getState())}:${getSelectedEntityId(getState())}`
      )
    );
  };
}

export function onFormSubmit(values, { dirty }) {
  return function(dispatch, getState) {
    if (dirty) {
      const currentEntity = getCurrentEntity(getState());
      const selectedEntityId = getSelectedEntityId(getState());
      if (selectedEntityId === 'create') {
        dispatch(createEntity(currentEntity, values.toJS()));
      } else {
        dispatch(updateEntity(currentEntity, selectedEntityId, values.toJS()));
      }
    }
  };
}

export function toggleEntityActive() {
  return function(dispatch, getState) {
    const currentEntity = getCurrentEntity(getState());
    const selectedEntityId = getSelectedEntityId(getState());
    const selectedEntity = getAllEntities(getState()).find(
      entity => entity.get('id') === selectedEntityId
    );
    dispatch(
      updateEntity(currentEntity, selectedEntityId, {
        active: !selectedEntity.get('active')
      })
    );
  };
}

function createEntity(entityName, values) {
  const singularEntityName = removeLastLetter(entityName);
  return {
    type: CREATE_ENTITY,
    payload: sdkPromise(
      {
        module: 'entities',
        command: `create${capitalizeFirstLetter(singularEntityName)}`,
        data: values
      },
      `cxengage/entities/create-${singularEntityName}-response`
    ),
    meta: {
      entityName,
      fields: Object.keys(values)
    }
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
  lists: {
    selectedEntityId: '',
    data: []
  },
  listTypes: {
    data: undefined
  }
});

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ENTITY:
      return state.set('currentEntity', action.payload);
    case DESELECT_CURRENT_ENTITY:
      return state.setIn([state.get('currentEntity'), 'selectedEntityId'], '');
    case SET_SELECTED_ENTITY_ID:
      return state.setIn(
        [state.get('currentEntity'), 'selectedEntityId'],
        action.payload
      );
    case FETCH_DATA_FULFILLED:
      return state.setIn(
        [action.meta.entityName, 'data'],
        fromJS(action.payload.result)
      );
    case CREATE_ENTITY_PENDING: {
      return state.setIn([action.meta.entityName, 'creating'], true);
    }
    case CREATE_ENTITY_FULFILLED: {
      return state.update(action.meta.entityName, entityStore =>
        entityStore
          .update('data', data => data.push(fromJS(action.payload)))
          .set('selectedEntityId', action.payload.id)
          .set('creating', false)
      );
    }
    case UPDATE_ENTITY_PENDING: {
      const entityIndex = state
        .getIn([action.meta.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.meta.entityId);
      if (entityIndex !== -1) {
        return state.setIn(
          [action.meta.entityName, 'data', entityIndex, 'updating'],
          true
        );
      } else {
        return state;
      }
    }
    case UPDATE_ENTITY_FULFILLED: {
      const entityIndex = state
        .getIn([action.meta.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.meta.entityId);
      if (entityIndex !== -1) {
        let updatedFields = new Map({ updating: false });
        action.meta.fields.forEach(field => {
          updatedFields = updatedFields.set(field, action.payload[field]);
        });
        return state.mergeIn(
          [action.meta.entityName, 'data', entityIndex],
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

const getCrudEndpoint = state => state.get('crudEndpoint');

export const getCurrentEntity = createSelector(getCrudEndpoint, crudEndpoint =>
  crudEndpoint.get('currentEntity')
);

const getCurrentEntityStore = createSelector(
  [getCrudEndpoint, getCurrentEntity],
  (crudEndpoint, currentEntity) => crudEndpoint.get(currentEntity)
);

export const getSelectedEntityId = createSelector(
  getCurrentEntityStore,
  currentEntityStore =>
    currentEntityStore && currentEntityStore.get('selectedEntityId')
);

export const getAllEntities = createSelector(
  getCurrentEntityStore,
  currentEntityStore => currentEntityStore && currentEntityStore.get('data')
);

export const getSelectedEntity = createSelector(
  [getCurrentEntity, getAllEntities, getSelectedEntityId],
  (currentEntity, allEntities, id) => {
    if (currentEntity && id) {
      return allEntities.find(obj => obj.get('id') === id);
    }
    return undefined;
  }
);

export const isCreating = createSelector(
  getCurrentEntityStore,
  currentEntityStore => currentEntityStore && currentEntityStore.get('creating')
);
