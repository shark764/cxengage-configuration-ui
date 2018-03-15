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
export const submitForm = form => ({
  type: '@@redux-form/SUBMIT',
  meta: { form: form }
});
export const setSelectedSubEntityId = selectedSubEntityId => {
  return { type: 'SET_SELECTED_SUB_ENTITY_ID', selectedSubEntityId };
};
export const onSubEntityFormSubmit = (values, { dirty }) => ({
  type: 'SUB_ENTITY_FORM_SUBMIT',
  values,
  dirty
});

// Initial Sub State

const initialState = fromJS({
  currentEntity: '',
  lists: {
    selectedEntityId: '',
    data: undefined,
    subEntity: 'listItems',
    selectedSubEntityId: undefined,
    subEntitySaving: false
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
          fromJS(Object.assign(action.payload, { updating: false}))
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
    case 'CREATE_SUB_ENTITY': {
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
    default:
      return state;
  }
}

// Selectors

const getCrudEndpoint = state => state.get('crudEndpoint');

export const getCurrentEntity = createSelector(getCrudEndpoint, crudEndpoint =>
  crudEndpoint.get('currentEntity')
);

export const getCurrentEntityStore = createSelector(
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
    if (currentEntity && allEntities && id) {
      return allEntities.find(obj => obj.get('id') === id);
    }
    return undefined;
  }
);

export const isCreating = createSelector(
  getCurrentEntityStore,
  currentEntityStore => currentEntityStore && currentEntityStore.get('creating')
);

export const getSelectedSubEntityId = createSelector(
  getCurrentEntityStore,
  currentEntityStore =>
    currentEntityStore && currentEntityStore.get('selectedSubEntityId')
);

export const isCreatingSubEntity = createSelector(
  getCurrentEntityStore,
  currentEntityStore =>
    currentEntityStore &&
    currentEntityStore.get('selectedSubEntityId') === 'create'
);

export const getCurrentSubEntity = createSelector(
  getCurrentEntityStore,
  currentEntityStore =>
    currentEntityStore && currentEntityStore.get('subEntity')
);
