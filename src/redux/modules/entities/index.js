/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';

// Initial Sub State
const defaultEntity = {
  data: [],
  selectedEntityId: '',
  sidePanelWidth: 550,
  confirmationDialogType: undefined
};
const initialState = fromJS({
  currentEntity: 'none',
  none: {},
  interactionMonitoring: {
    readPermission: ['MONITOR_ALL_CALLS']
  },
  identityProviders: {
    ...defaultEntity
  },
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
    ...defaultEntity
  },
  listTypes: {
    ...defaultEntity
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
    updatePermission: ['USER_MANAGEMENT_EMAIL_UPDATE', 'PLATFORM_USER_MANAGEMENT_EMAIL_UPDATE']
  },
  outboundIdentifierLists: {
    ...defaultEntity,
    metaData: {
      listDependency: 'outboundIdentifiers'
    },
    readPermission: ['OUTBOUND_IDENTIFIER_READ'],
    updatePermission: ['OUTBOUND_IDENTIFIER_MODIFY'],
    createPermission: ['OUTBOUND_IDENTIFIER_CREATE'],
    disablePermission: ['OUTBOUND_IDENTIFIER_DISABLE'],
    assignPermission: ['OUTBOUND_IDENTIFIER_ASSIGN']
  },
  customMetrics: {
    ...defaultEntity,
    readPermission: ['CUSTOM_STATS_READ'],
    updatePermission: ['CUSTOM_STATS_UPDATE'],
    // removing create permission 'CUSTOM_STATS_CREATE' until
    // we have the ability to create more than one sla
    createPermission: []
  },
  chatWidgets: {
    ...defaultEntity,
    readPermission: ['OUTBOUND_IDENTIFIER_READ'],
    updatePermission: ['OUTBOUND_IDENTIFIER_MODIFY'],
    createPermission: ['OUTBOUND_IDENTIFIER_CREATE'],
    disablePermission: ['OUTBOUND_IDENTIFIER_DISABLE'],
    assignPermission: ['OUTBOUND_IDENTIFIER_ASSIGN']
  },
  users: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_USERS'],
    updatePermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'MANAGE_ALL_USER_EXTENSIONS',
      'MANAGE_ALL_GROUP_USERS',
      'MANAGE_ALL_USER_SKILLS',
      'MANAGE_ALL_USER_LOCATIONS',
      'MANAGE_TENANT_ENROLLMENT'
    ],
    createPermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'MANAGE_ALL_USER_EXTENSIONS',
      'MANAGE_ALL_GROUP_USERS',
      'MANAGE_ALL_USER_SKILLS',
      'MANAGE_ALL_USER_LOCATIONS',
      'MANAGE_TENANT_ENROLLMENT'
    ]
  },
  platformRoles: {
    ...defaultEntity
  },
  roles: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_ROLES'],
    updatePermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'PLATFORM_CREATE_TENANT_ROLES',
      'VIEW_ALL_ROLES',
      'MANAGE_ALL_ROLES',
      'MANAGE_TENANT_ENROLLMENT'
    ],
    createPermission: ['PLATFORM_CREATE_TENANT_ROLES', 'MANAGE_ALL_ROLES']
  },
  permissions: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_ROLES'],
    updatePermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'PLATFORM_CREATE_TENANT_ROLES',
      'VIEW_ALL_ROLES',
      'MANAGE_ALL_ROLES',
      'MANAGE_TENANT_ENROLLMENT'
    ]
  },
  skills: {
    ...defaultEntity,
    metaData: {
      listDependency: 'users'
    },
    readPermission: ['VIEW_ALL_SKILLS'],
    updatePermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'MANAGE_ALL_SKILLS',
      'MANAGE_ALL_USER_SKILLS',
      'MANAGE_TENANT_ENROLLMENT'
    ],
    createPermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'MANAGE_ALL_SKILLS',
      'MANAGE_ALL_USER_SKILLS',
      'MANAGE_TENANT_ENROLLMENT'
    ]
  },
  groups: {
    ...defaultEntity,
    metaData: {
      listDependency: 'users'
    },
    readPermission: ['VIEW_ALL_GROUPS'],
    updatePermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'MANAGE_ALL_GROUPS',
      'MANAGE_ALL_GROUP_USERS',
      'MANAGE_ALL_GROUP_OWNERS',
      'MANAGE_TENANT_ENROLLMENT'
    ],
    createPermission: [
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'MANAGE_ALL_GROUPS',
      'MANAGE_ALL_GROUP_USERS',
      'MANAGE_ALL_GROUP_OWNERS',
      'MANAGE_TENANT_ENROLLMENT'
    ]
  },
  dashboards: {
    ...defaultEntity
  },
  historicalReportFolders: {
    ...defaultEntity
  },
  dataAccessReports: {
    ...defaultEntity,
    metaData: {
      listDependency: 'users'
    },
    readPermission: ['CUSTOM_STATS_READ'],
    updatePermission: ['CUSTOM_STATS_UPDATE'],
    createPermission: ['CUSTOM_STATS_CREATE']
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

export const copyCurrentEntity = () => ({ type: 'COPY_CURRENT_ENTITY' });

export const setSelectedEntityCreate = () => setSelectedEntityId('create');
export const unsetSelectedEntityId = () => setSelectedEntityId('');
export const setEntityUpdating = (entityName, entityId, updating) => ({
  type: 'SET_ENTITY_UPDATING',
  entityName,
  entityId,
  updating
});

export const toggleBulkEntityChange = (entityName, entityId, bool) => ({
  type: 'TOGGLE_BULK_ENTITY_CHANGE',
  entityName,
  entityId,
  bool
});

export const onFormButtonSubmit = () => ({ type: 'START_FORM_SUBMISSION' });
export const onFormSubmit = (values, { dirty }) => ({
  type: 'FORM_SUBMIT',
  values,
  dirty
});

export const toggleEntityListItemActive = entity => ({
  type: 'TOGGLE_ENTITY_LIST_ITEM',
  entity
});
export const addListItem = listItemId => ({
  type: 'ADD_LIST_ITEM',
  listItemId
});
export const toggleListItemEntity = (id, name, actionType) => ({
  type: 'TOGGLE_LIST_ITEM_ENTITY',
  id,
  name,
  actionType
});
export const removeListItem = listItemId => ({
  type: 'REMOVE_LIST_ITEM',
  listItemId
});

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
export const fetchListItems = (entityName, associatedEntityName) => ({
  type: 'FETCH_LIST_ITEMS',
  entityName,
  associatedEntityName
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
    case 'SET_CURRENT_ENTITY': {
      return state.set('currentEntity', action.entityName);
    }
    case 'SET_CONIFIRMATION_DIALOG': {
      return state.update(state.get('currentEntity'), entityStore =>
        entityStore.set('confirmationDialogType', action.modalType).set('confirmationDialogMetaData', action.metaData)
      );
    }
    case 'SET_SELECTED_ENTITY_ID': {
      return state.setIn([state.get('currentEntity'), 'selectedEntityId'], action.entityId);
    }
    case 'FETCH_DATA_FULFILLED': {
      return state.setIn([action.entityName, 'data'], fromJS(action.response.result));
    }
    case 'FETCH_DATA_REJECTED': {
      return state.setIn([action.entityName, 'data'], new List());
    }
    case 'CONVERT_NULLS_FOR_SELECT_FIELDS':
    case 'SET_SELECTED_ENTITY_ID_FULFILLED':
    case 'FETCH_DATA_ITEM_FULFILLED': {
      const entityIndex = state.getIn([action.entityName, 'data']).findIndex(entity => entity.get('id') === action.id);
      if (entityIndex !== -1) {
        return state.mergeIn(
          [action.entityName, 'data', entityIndex],
          fromJS({ ...action.response.result, updating: false })
        );
      } else {
        return state;
      }
    }
    case 'FETCH_DATA_ITEM_REJECTED': {
      return exports.setEntityUpdatingHelper(state, action, false);
    }
    case 'TOGGLE_BULK_ENTITY_CHANGE': {
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.entityId);
      if (entityIndex !== -1 && action.bool !== undefined) {
        return state
          .mergeIn([action.entityName, 'data', entityIndex], fromJS({ bulkChangeItem: action.bool }))
          .setIn([action.entityName, 'selectedEntityId'], 'bulk');
      } else if (entityIndex !== -1) {
        return state  
        .mergeIn(
            [action.entityName, 'data', entityIndex],
            fromJS({
              bulkChangeItem: !state.getIn([action.entityName, 'data', entityIndex, 'bulkChangeItem'], false)
            })
          )
          .setIn([action.entityName, 'selectedEntityId'], 'bulk');
      } else {
        return state;
      }
    }
    case 'CREATE_ENTITY': {
      return state.setIn([action.entityName, 'creating'], true);
    }
    case 'COPY_CURRENT_ENTITY_FULFILLED':
    case 'CREATE_ENTITY_FULFILLED': {
      const { result } = action.response;
      return state.update(action.entityName, entityStore =>
        entityStore
          .update('data', data => data.push(fromJS(result)))
          .set('creating', false)
      );
    }
    case 'CREATE_ENTITY_REJECTED': {
      return state.setIn([action.entityName, 'creating'], false);
    }
    case 'UPDATE_ENTITY': {
      return exports.setEntityUpdatingHelper(state, action, true);
    }
    case 'TOGGLE_ENTITY_FULFILLED':
    case 'UPDATE_ENTITY_FULFILLED':
    case 'BULK_ENTITY_UPDATE_FULFILLED': {
      const { result } = action.response;
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === result.id || entity.get('id') === action.id);
      if (entityIndex !== -1) {
        return state.mergeIn([action.entityName, 'data', entityIndex], fromJS({ ...result, updating: false }));
      } else {
        return state;
      }
    }
    case 'TOGGLE_LIST_ITEM_ENTITY_FULFILLED': {
      const { actionType, entityName, entityId, name, id } = action;
      const entityIndex = state.getIn([action.entityName, 'data']).findIndex(entity => entity.get('id') === entityId);
      const currentList = state.getIn([entityName, 'data', entityIndex, name]);
      const modifiedList = actionType === 'associate' ? currentList.push(id) : currentList.filter(x => x !== id);
      if (entityIndex !== -1) {
        return state.setIn([entityName, 'data', entityIndex, name], modifiedList);
      } else {
        return state;
      }
    }
    case 'FETCH_LIST_ITEMS_FULFILLED': {
      let idType, response;
      switch (action.associatedEntityName) {
        case 'groups': {
          idType = 'groupId';
          break;
        }
        case 'skills': {
          idType = 'skillId';
          break;
        }
        default: {
          idType = 'id';
        }
      }
      if (action.associatedEntityName === 'outboundIdentifierLists' && action.entityName === 'users') {
        response = action.response.result.assigned;
      } else {
        response = action.response.result;
      }
      if (action.associatedEntityName === 'outboundIdentifierLists' && action.entityName !== 'users') {
        idType = 'id';
      }
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.entityId);
      if (entityIndex !== -1) {
        return state.setIn(
          [action.entityName, 'data', entityIndex, action.associatedEntityName],
          fromJS(response.map(x => x[idType]))
        );
      } else {
        return state;
      }
    }
    case 'UPDATE_ENTITY_REJECTED':
    case 'UPLOAD_CSV_REJECTED': {
      return exports.setEntityUpdatingHelper(state, action, false);
    }
    case 'SET_ENTITY_UPDATING': {
      return exports.setEntityUpdatingHelper(state, action, action.updating);
    }
    case 'SET_SELECTED_SUB_ENTITY_ID': {
      return state.setIn([state.get('currentEntity'), 'selectedSubEntityId'], action.selectedSubEntityId);
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
    case 'TOGGLE_ENTITY_LIST_ITEM_FULFILLED': {
      const entity = selectedEntity(state);
      const { result } = action.response;
      return state
        .updateIn([entity.type, 'data', entity.index, 'members'], membersList => {
          const memberIndex = membersList.findIndex(member => member.get('id') === result.id);
          if (entity.index !== -1 && memberIndex !== -1) {
            return membersList.setIn([memberIndex], fromJS(result));
          } else {
            return membersList;
          }
        })
        .updateIn([entity.dependency, 'data', entity.dependencyItemIndex(result.id)], item =>
          item.merge(fromJS(result))
        );
    }
    case 'REMOVE_LIST_ITEM_FULFILLED': {
      const entity = selectedEntity(state);
      const filteredListMembers = state
        .getIn([entity.type, 'data', entity.index, 'members'])
        .filterNot(member => member.get('id') === action.listItemId);
      return state.setIn([entity.type, 'data', entity.index, 'members'], filteredListMembers);
    }
    case 'ADD_LIST_ITEM_FULFILLED': {
      const entity = selectedEntity(state);
      const entityToAdd = state
        .getIn([entity.dependency, 'data'])
        .find(entity => entity.get('id') === action.listItemId);
      return state.updateIn([entity.type, 'data', entity.index, 'members'], members => members.push(entityToAdd));
    }
    case 'UPDATE_SUB_ENTITY_FULFILLED': {
      const entityIndex = state
        .getIn([action.entityName, 'data'])
        .findIndex(entity => entity.get('id') === action.entityId);
      if (entityIndex !== -1) {
        return state.update(action.entityName, entityStore =>
          entityStore
            .updateIn(['data', entityIndex, 'items'], subEntityList => {
              const subEntityIndex = subEntityList.findIndex(subEntity => subEntity.get('key') === action.subEntityId);
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
      return state.setIn([state.get('currentEntity'), 'sidePanelWidth'], action.width);
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
              const subEntityIndex = subEntityList.findIndex(subEntity => subEntity.get('key') === action.subEntityId);
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

export const setEntityUpdatingHelper = (state, { entityName, entityId }, updating) => {
  const entityIndex = state.getIn([entityName, 'data']).findIndex(entity => entity.get('id') === entityId);
  if (entityIndex !== -1) {
    return state.setIn([entityName, 'data', entityIndex, 'updating'], updating);
  } else {
    return state;
  }
};

const setSubEntityDeleting = (state, { subEntityId }, deleting) => {
  const currentEntity = state.get('currentEntity');
  const selectedEntityId = state.getIn([currentEntity, 'selectedEntityId']);
  const entityIndex = state.getIn([currentEntity, 'data']).findIndex(entity => entity.get('id') === selectedEntityId);
  const subEntityIndex = state
    .getIn([currentEntity, 'data', entityIndex, 'items'])
    .findIndex(subEntity => subEntity.get('key') === subEntityId);
  return state.updateIn([currentEntity, 'data', entityIndex, 'items', subEntityIndex], subEntity =>
    subEntity.set('deleting', deleting)
  );
};

export function selectedEntity(state) {
  const currentEntity = state.get('currentEntity');
  const dependentEntity = state.getIn([currentEntity, 'metaData', 'listDependency'], undefined);
  const selectedEntityId = state.getIn([currentEntity, 'selectedEntityId']);
  let context = {
    index: state.getIn([currentEntity, 'data']).findIndex(entity => entity.get('id') === selectedEntityId),
    type: currentEntity,
    dependency: dependentEntity,
    dependencyItemIndex: itemId =>
      state.getIn([dependentEntity, 'data']).findIndex(entity => entity.get('id') === itemId)
  };
  return context;
}
