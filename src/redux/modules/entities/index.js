/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';

// Initial Sub State
const defaultEntity = {
  data: undefined,
  selectedEntityId: '',
  sidePanelWidth: 550,
  confirmationDialogType: undefined
};
const initialState = fromJS({
  currentEntity: 'none',
  none: {},
  lists: {
    ...defaultEntity,
    subEntity: 'listItems',
    selectedSubEntityId: undefined,
    subEntitySaving: false,
    readPermission: ['VIEW_ALL_LISTS'],
    updatePermission: ['MANAGE_ALL_LISTS'],
    createPermission: ['MANAGE_ALL_LISTS']
  },
  flows: {
    data: undefined
  },
  listTypes: {
    data: undefined
  },
  outboundIdentifiers: {
    ...defaultEntity,
    readPermission: ['OUTBOUND_IDENTIFIER_READ'],
    updatePermission: ['OUTBOUND_IDENTIFIER_MODIFY'],
    createPermission: ['OUTBOUND_IDENTIFIER_CREATE'],
    disablePermission: ['OUTBOUND_IDENTIFIER_DISABLE'],
    assignPermission: ['OUTBOUND_IDENTIFIER_ASSIGN']
  },
  emailTemplates: {
    ...defaultEntity,
    readPermission: ['USER_MANAGEMENT_EMAIL_READ'],
    updatePermission: [
      'USER_MANAGEMENT_EMAIL_UPDATE',
      'PLATFORM_USER_MANAGEMENT_EMAIL_UPDATE'
    ]
  },
  outboundIdentifierLists: {
    ...defaultEntity,
    readPermission: ['OUTBOUND_IDENTIFIER_READ'],
    updatePermission: ['OUTBOUND_IDENTIFIER_MODIFY'],
    createPermission: ['OUTBOUND_IDENTIFIER_CREATE'],
    disablePermission: ['OUTBOUND_IDENTIFIER_DISABLE'],
    assignPermission: ['OUTBOUND_IDENTIFIER_ASSIGN']
  }
  //hygen-inject-before
});

// Actions

export const setCurrentEntity = entityName => ({
  type: 'SET_CURRENT_ENTITY',
  entityName
});
export const setSelectedEntityId = entityId => ({
  type: 'SET_SELECTED_ENTITY_ID',
  entityId
});

export const setSelectedEntityCreate = () => setSelectedEntityId('create');
export const unsetSelectedEntityId = () => setSelectedEntityId('');
export const setEntityUpdating = (entityName, entityId, updating) => ({
  type: 'SET_ENTITY_UPDATING',
  entityName,
  entityId,
  updating
});

export const onFormButtonSubmit = () => ({ type: 'START_FORM_SUBMISSION' });
export const onFormSubmit = (values, { dirty }) => ({
  type: 'FORM_SUBMIT',
  values,
  dirty
});
export const toggleEntityActive = () => ({ type: 'TOGGLE_ENTITY' });

export const setConfirmationDialog = (modalType, metaData) => ({
  type: 'SET_CONIFIRMATION_DIALOG',
  modalType,
  metaData
});

export const executeConfirmCallback = referenceData => ({
  type: 'EXECUTE_CONFIRM_CALLBACK',
  referenceData
});

export const fetchData = (entityName, tableType) => ({
  type: 'FETCH_DATA',
  entityName,
  tableType
});
export const fetchDataFulfilled = (entityName, response, tableType) => ({
  type: 'FETCH_DATA_FULFILLED',
  entityName,
  response,
  tableType
});
export const fetchDataRejected = entityName => ({
  type: 'FETCH_DATA_REJECTED',
  entityName
});
export const fetchDataItem = (entityName, id) => ({
  type: 'FETCH_DATA_ITEM',
  entityName,
  id
});
export const setSelectedSubEntityId = selectedSubEntityId => ({
  type: 'SET_SELECTED_SUB_ENTITY_ID',
  selectedSubEntityId
});

export const onSubEntityFormSubmit = (values, { dirty }) => ({
  type: 'SUB_ENTITY_FORM_SUBMIT',
  values,
  dirty
});
export const updateEntity = (entityName, entityId, values) => ({
  type: 'UPDATE_ENTITY',
  entityName,
  entityId,
  values
});
export const updateEntityFulfilled = (
  entityName,
  payload,
  entityId,
  values
) => ({
  type: 'UPDATE_ENTITY_FULFILLED',
  entityName,
  payload,
  entityId,
  values
});
export const updateEntityRejected = (entityName, entityId) => ({
  type: 'UPDATE_ENTITY_REJECTED',
  entityName,
  entityId
});
export const updateSidePanelWidth = width => ({
  type: 'UPDATE_SIDE_PANEL_WIDTH',
  width
});
export const deleteSubEntity = subEntityId => ({
  type: 'DELETE_SUB_ENTITY',
  subEntityId
});

export const downloadCsv = () => ({ type: 'DOWNLOAD_CSV' });

export const uploadCsv = target => ({ type: 'UPLOAD_CSV', target });

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_ENTITY':
      return state.set('currentEntity', action.entityName);
    case 'SET_CONIFIRMATION_DIALOG':
      return state.update(state.get('currentEntity'), entityStore =>
        entityStore
          .set('confirmationDialogType', action.modalType)
          .set('confirmationDialogMetaData', action.metaData)
      );
    case 'SET_SELECTED_ENTITY_ID': {
      return state.setIn(
        [state.get('currentEntity'), 'selectedEntityId'],
        action.entityId
      );
    }
    case 'FETCH_DATA_FULFILLED': {
      return state.setIn(
        [action.entityName, 'data'],
        fromJS(action.response.result)
      );
    }
    case 'FETCH_DATA_REJECTED':
      return state.setIn([action.entityName, 'data'], new List());
    case 'FETCH_DATA_ITEM_FULFILLED': {
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.id);
      if (entityIndex !== -1) {
        return state.mergeIn(
          [action.entityName, 'data', entityIndex],
          fromJS(Object.assign(action.response.result, { updating: false }))
        );
      } else {
        return state;
      }
    }
    case 'FETCH_DATA_ITEM_REJECTED': {
      return exports.setEntityUpdatingHelper(state, action, false);
    }
    case 'CREATE_ENTITY': {
      return state.setIn([action.entityName, 'creating'], true);
    }
    case 'CREATE_ENTITY_FULFILLED': {
      const { result } = action.response;
      return state.update(action.entityName, entityStore =>
        entityStore
          .update('data', data => data.push(fromJS(result)))
          .set('selectedEntityId', result.id)
          .set('creating', false)
      );
    }
    case 'CREATE_ENTITY_REJECTED': {
      return state.setIn([action.entityName, 'creating'], false);
    }
    case 'UPDATE_ENTITY': {
      return exports.setEntityUpdatingHelper(state, action, true);
    }
    case 'UPDATE_ENTITY_FULFILLED': {
      const { result } = action.payload;
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === result.id);
      if (entityIndex !== -1) {
        return state.mergeIn(
          [action.entityName, 'data', entityIndex],
          fromJS(Object.assign(result, { updating: false }))
        );
      } else {
        return state;
      }
    }
    case 'UPDATE_ENTITY_REJECTED':
    case 'UPLOAD_CSV_REJECTED': {
      return exports.setEntityUpdatingHelper(state, action, false);
    }
    case 'SET_ENTITY_UPDATING':
      return exports.setEntityUpdatingHelper(state, action, action.updating);
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
        const { itemValue, key } = action.response.result;
        return state.update(action.entityName, entityStore =>
          entityStore
            .updateIn(['data', entityIndex, 'items'], subEntityList =>
              subEntityList.push(
                fromJS({
                  ...itemValue,
                  key
                })
              )
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
                const { itemValue, key } = action.response.result;
                return subEntityList.setIn(
                  [subEntityIndex],
                  fromJS({
                    ...itemValue,
                    key
                  })
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
    case 'CREATE_SUB_ENTITY_REJECTED':
    case 'UPDATE_SUB_ENTITY_REJECTED': {
      return state.setIn([action.entityName, 'subEntitySaving'], false);
    }
    case 'UPDATE_SIDE_PANEL_WIDTH': {
      return state.setIn(
        [state.get('currentEntity'), 'sidePanelWidth'],
        action.width
      );
    }
    case 'DELETE_SUB_ENTITY': {
      return setSubEntityDeleting(state, action, true);
    }
    case 'DELETE_SUB_ENTITY_FULFILLED': {
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
                return subEntityList.delete(subEntityIndex);
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
    case 'DELETE_SUB_ENTITY_REJECTED': {
      return setSubEntityDeleting(state, action, false);
    }
    default:
      return state;
  }
}

// Reducer helper functions

export const setEntityUpdatingHelper = (
  state,
  { entityName, entityId },
  updating
) => {
  const entityIndex = state
    .getIn([entityName, 'data'])
    .findIndex(entity => entity.get('id') === entityId);
  if (entityIndex !== -1) {
    return state.setIn([entityName, 'data', entityIndex, 'updating'], updating);
  } else {
    return state;
  }
};

const setSubEntityDeleting = (state, { subEntityId }, deleting) => {
  const currentEntity = state.get('currentEntity');
  const selectedEntityId = state.getIn([currentEntity, 'selectedEntityId']);
  const entityIndex = state
    .getIn([currentEntity, 'data'])
    .findIndex(entity => entity.get('id') === selectedEntityId);
  const subEntityIndex = state
    .getIn([currentEntity, 'data', entityIndex, 'items'])
    .findIndex(subEntity => subEntity.get('key') === subEntityId);
  return state.updateIn(
    [currentEntity, 'data', entityIndex, 'items', subEntityIndex],
    subEntity => subEntity.set('deleting', deleting)
  );
};
