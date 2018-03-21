/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

// Actions

export const setCurrentEntity = entityName => ({
  type: 'SET_CURRENT_ENTITY',
  entityName
});
export const deselectCurrentEntity = () => ({
  type: 'DESELECT_CURRENT_ENTITYS_SELECTED_ENTITY'
});
export const setSelectedEntityId = entityId => {
  return { type: 'SET_SELECTED_ENTITY_ID', entityId };
};
export const onFormButtonSubmit = () => ({ type: 'START_FORM_SUBMISSION' });
export const onFormSubmit = (values, { dirty }) => ({
  type: 'FORM_SUBMIT',
  values,
  dirty
});
export const toggleEntityActive = () => {
  return { type: 'TOGGLE_ENTITY' };
};
export const fetchData = entityName => ({ type: 'FETCH_DATA', entityName });
export const setSelectedSubEntityId = selectedSubEntityId => {
  return { type: 'SET_SELECTED_SUB_ENTITY_ID', selectedSubEntityId };
};
export const onSubEntityFormSubmit = (values, { dirty }) => ({
  type: 'SUB_ENTITY_FORM_SUBMIT',
  values,
  dirty
});
export const updateEntityFulfilled = (entityName, payload) => ({
  type: 'UPDATE_ENTITY_FULFILLED',
  entityName,
  payload
});
export const updateSidePanelWidth = width => ({
  type: 'UPDATE_SIDE_PANEL_WIDTH',
  width
});

// Initial Sub State

const initialState = fromJS({
  currentEntity: '',
  lists: {
    selectedEntityId: '',
    data: undefined,
    subEntity: 'listItems',
    selectedSubEntityId: undefined,
    subEntitySaving: false,
    sidePanelWidth: 550
  },
  listTypes: {
    data: undefined
  }
});

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_ENTITY':
      return state.set('currentEntity', action.entityName);
    case 'DESELECT_CURRENT_ENTITYS_SELECTED_ENTITY':
      return state.setIn([state.get('currentEntity'), 'selectedEntityId'], '');
    case 'SET_SELECTED_ENTITY_ID': {
      return state.setIn(
        [state.get('currentEntity'), 'selectedEntityId'],
        action.entityId
      );
    }
    case 'FETCH_DATA_FULFILLED':
      return state.setIn(
        [action.entityName, 'data'],
        fromJS(action.response.result)
      );
    case 'CREATE_ENTITY': {
      return state.setIn([action.entityName, 'creating'], true);
    }
    case 'CREATE_ENTITY_FULFILLED': {
      return state.update(action.entityName, entityStore =>
        entityStore
          .update('data', data => data.push(fromJS(action.response)))
          .set('selectedEntityId', action.response.id)
          .set('creating', false)
      );
    }
    case 'UPDATE_ENTITY': {
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.entityId);
      if (entityIndex !== -1) {
        return state.setIn(
          [action.entityName, 'data', entityIndex, 'updating'],
          true
        );
      } else {
        return state;
      }
    }
    case 'UPDATE_ENTITY_FULFILLED': {
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.payload.id);
      if (entityIndex !== -1) {
        return state.mergeIn(
          [action.entityName, 'data', entityIndex],
          fromJS(Object.assign(action.payload, { updating: false }))
        );
      } else {
        return state;
      }
    }
    case 'SET_SELECTED_SUB_ENTITY_ID': {
      return state.setIn(
        [state.get('currentEntity'), 'selectedSubEntityId'],
        action.selectedSubEntityId
      );
    }
    case 'CREATE_SUB_ENTITY':
    case 'UPDATE_SUB_ENTITY': {
      return state.setIn([action.entityName, 'subEntitySaving'], true);
    }
    case 'CREATE_SUB_ENTITY_FULFILLED': {
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.entityId);
      if (entityIndex !== -1) {
        return state.update(action.entityName, entityStore =>
          entityStore
            .updateIn(['data', entityIndex, 'items'], subEntityList =>
              subEntityList.push(fromJS(action.response.itemValue))
            )
            .set('selectedSubEntityId', undefined)
            .set('subEntitySaving', false)
        );
      } else {
        return state;
      }
    }
    case 'UPDATE_SUB_ENTITY_FULFILLED': {
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.entityId);
      if (entityIndex !== -1) {
        return state.update(action.entityName, entityStore =>
          entityStore
            .updateIn(['data', entityIndex, 'items'], subEntityList => {
              const subEntityIndex = subEntityList.findIndex(
                subEntity => subEntity.get('key') === action.subEntityId
              );
              if (entityIndex !== -1) {
                return subEntityList.mergeIn(
                  [subEntityIndex],
                  fromJS(action.response.apiResponse.result.itemValue)
                );
              } else {
                return subEntityList;
              }
            })
            .set('selectedSubEntityId', undefined)
            .set('subEntitySaving', false)
        );
      } else {
        return state;
      }
    }
    case 'UPDATE_SIDE_PANEL_WIDTH': {
      return state.setIn(
        [state.get('currentEntity'), 'sidePanelWidth'],
        action.width
      );
    }
    default:
      return state;
  }
}

// Selectors

const getCrudEndpoint = state => state.get('crudEndpoint');

export const getCurrentEntity = state =>
  getCrudEndpoint(state).get('currentEntity');

export const getCurrentEntityStore = state =>
  getCrudEndpoint(state).get(getCurrentEntity(state));

export const getSidePanelWidth = state =>
  getCurrentEntityStore(state) &&
  getCurrentEntityStore(state).get('sidePanelWidth');

export const getSelectedEntityId = state =>
  getCurrentEntityStore(state) &&
  getCurrentEntityStore(state).get('selectedEntityId');

export const getAllEntities = state =>
  getCurrentEntityStore(state) && getCurrentEntityStore(state).get('data');

export const getSelectedEntity = createSelector(
  [getCurrentEntity, getAllEntities, getSelectedEntityId],
  (currentEntity, allEntities, selectedEntityId) =>
    selectedEntityId &&
    allEntities.find(obj => obj.get('id') === selectedEntityId)
);

export const getSelectedEntityName = state =>
  getSelectedEntity(state) && getSelectedEntity(state).get('name');

export const isCreating = state =>
  getCurrentEntityStore(state) && getCurrentEntityStore(state).get('creating');

export const getCurrentSubEntity = state =>
  getCurrentEntityStore(state) && getCurrentEntityStore(state).get('subEntity');

export const getSelectedSubEntityId = state =>
  getCurrentEntityStore(state) &&
  getCurrentEntityStore(state).get('selectedSubEntityId');

export const getSelectedSubEntity = createSelector(
  [getSelectedEntity, getCurrentSubEntity, getSelectedSubEntityId],
  (selectedEntity, currentSubEntity, selectedSubEntityId) =>
    selectedEntity &&
    selectedEntity
      .get('items')
      .find(subEntity => subEntity.get('key') === selectedSubEntityId)
);

export const isSubEntitySaving = state =>
  getCurrentEntityStore(state) &&
  getCurrentEntityStore(state).get('subEntitySaving');
