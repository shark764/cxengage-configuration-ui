/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';
import { generateUUID } from 'serenova-js-utils/uuid';
import { findEntityIndex } from './selectors';

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
    readPermission: ['VIEW_ALL_MONITORED_CALLS']
  },
  agentStateMonitoring: {
    ...defaultEntity,
    readPermission: ['MANAGE_ALL_USER_STATE', 'MANAGE_ALL_USERS_DIRECTION']
  },
  identityProviders: {
    ...defaultEntity
  },
  lists: {
    ...defaultEntity,
    sidePanelWidth: 750,
    subEntity: 'listItems',
    selectedSubEntityId: undefined,
    subEntitySaving: false,
    readPermission: ['VIEW_ALL_LISTS'],
    updatePermission: ['MANAGE_ALL_LISTS'],
    createPermission: ['MANAGE_ALL_LISTS']
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
    sidePanelWidth: 750,
    readPermission: ['USER_MANAGEMENT_EMAIL_READ'],
    updatePermission: ['USER_MANAGEMENT_EMAIL_UPDATE', 'PLATFORM_USER_MANAGEMENT_EMAIL_UPDATE']
  },
  outboundIdentifierLists: {
    ...defaultEntity,
    metaData: {
      listDependency: 'outboundIdentifiers'
    },
    sidePanelWidth: 750,
    readPermission: ['OUTBOUND_IDENTIFIER_READ'],
    updatePermission: ['OUTBOUND_IDENTIFIER_MODIFY'],
    createPermission: ['OUTBOUND_IDENTIFIER_CREATE'],
    disablePermission: ['OUTBOUND_IDENTIFIER_DISABLE'],
    assignPermission: ['OUTBOUND_IDENTIFIER_ASSIGN']
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
    sidePanelWidth: 600,
    readPermission: ['VIEW_ALL_USERS', 'PLATFORM_VIEW_ALL_USERS', 'CONFIG_USERS_VIEW', 'PLATFORM_CONFIG_USERS_VIEW'],
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
    createPermission: ['PLATFORM_CREATE_TENANT_ROLES', 'MANAGE_ALL_ROLES'],
    sharePermission: ['PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT', 'MANAGE_ALL_ROLES']
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
    sidePanelWidth: 750,
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
    sidePanelWidth: 750,
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
  standardDashboards: {
    ...defaultEntity
  },
  historicalReportFolders: {
    ...defaultEntity
  },
  capacityRules: {
    ...defaultEntity
  },
  dataAccessReports: {
    ...defaultEntity,
    metaData: {
      listDependency: 'users'
    },
    sidePanelWidth: 750,
    readPermission: ['CUSTOM_STATS_READ'],
    updatePermission: ['CUSTOM_STATS_UPDATE'],
    createPermission: ['CUSTOM_STATS_CREATE']
  },
  reasons: {
    ...defaultEntity,
    readPermission: ['READ_PRESENCE_REASONS'],
    updatePermission: ['UPDATE_PRESENCE_REASONS'],
    createPermission: ['CREATE_PRESENCE_REASONS'],
    disablePermission: ['UPDATE_PRESENCE_REASONS'],
    sharePermission: ['SHARE_PRESENCE_REASONS']
  },
  reasonLists: {
    ...defaultEntity,
    readPermission: ['READ_REASON_LIST'],
    updatePermission: ['UPDATE_REASON_LIST'],
    createPermission: ['CREATE_REASON_LIST'],
    disablePermission: ['UPDATE_REASON_LIST'],
    sharePermission: ['UPDATE_REASON_LIST']
  },
  flows: {
    ...defaultEntity,
    sidePanelWidth: 750,
    readPermission: ['VIEW_ALL_FLOWS'],
    updatePermission: ['MANAGE_ALL_FLOWS'],
    createPermission: ['MANAGE_ALL_FLOWS'],
    disablePermission: ['MANAGE_ALL_FLOWS'],
    assignPermission: ['MANAGE_ALL_FLOWS']
  },
  queues: {
    ...defaultEntity,
    sidePanelWidth: 750,
    readPermission: ['VIEW_ALL_QUEUES'],
    updatePermission: ['MANAGE_ALL_QUEUES'],
    createPermission: ['MANAGE_ALL_QUEUES'],
    disablePermission: ['MANAGE_ALL_QUEUES'],
    assignPermission: ['MANAGE_ALL_QUEUES']
  },
  transferLists: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_TRANSFER_LISTS'],
    updatePermission: ['MANAGE_ALL_TRANSFER_LISTS'],
    createPermission: ['MANAGE_ALL_TRANSFER_LISTS'],
    disablePermission: ['MANAGE_ALL_TRANSFER_LISTS'],
    assignPermission: ['MANAGE_ALL_TRANSFER_LISTS']
  },
  messageTemplates: {
    ...defaultEntity,
    sidePanelWidth: 750,
    readPermission: ['VIEW_ALL_MESSAGE_TEMPLATES'],
    updatePermission: ['MANAGE_ALL_MESSAGE_TEMPLATES'],
    createPermission: ['MANAGE_ALL_MESSAGE_TEMPLATES'],
    disablePermission: ['MANAGE_ALL_MESSAGE_TEMPLATES'],
    assignPermission: ['MANAGE_ALL_MESSAGE_TEMPLATES']
  },
  dispatchMappings: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_CONTACT_POINTS'],
    updatePermission: ['MAP_ALL_CONTACT_POINTS'],
    createPermission: ['MAP_ALL_CONTACT_POINTS'],
    disablePermission: ['MAP_ALL_CONTACT_POINTS']
  },
  integrations: {
    ...defaultEntity
  },
  dispositions: {
    ...defaultEntity,
    readPermission: ['READ_DISPOSITIONS'],
    updatePermission: ['UPDATE_DISPOSITIONS'],
    createPermission: ['CREATE_DISPOSITIONS'],
    sharePermission: ['SHARE_DISPOSITIONS']
  },
  slas: {
    ...defaultEntity,
    sidePanelWidth: 750,
    readPermission: ['CUSTOM_STATS_READ'],
    updatePermission: ['CUSTOM_STATS_UPDATE'],
    createPermission: ['CUSTOM_STATS_CREATE'],
    sharePermission: ['CUSTOM_STATS_UPDATE'],
    disablePermission: [],
    assignPermission: []
  },
  tenants: {
    ...defaultEntity,
    readPermission: [
      'PLATFORM_VIEW_ALL_TENANTS',
      'PLATFORM_MANAGE_ALL_TENANTS',
      'PLATFORM_CREATE_ALL_TENANTS',
      'PLATFORM_CREATE_TENANT_ROLES',
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
      'MANAGE_TENANT'
    ],
    updatePermission: ['PLATFORM_MANAGE_ALL_TENANTS', 'MANAGE_TENANT'],
    createPermission: ['CREATE_CHILD_TENANT'],
    disablePermission: ['MANAGE_TENANT', 'PLATFORM_MANAGE_ALL_TENANTS'],
    assignPermission: []
  },
  flowDebugger: {
    ...defaultEntity
  },
  apiKeys: {
    ...defaultEntity,
    readPermission: ['MANAGE_ALL_APP_CREDENTIALS'],
    updatePermission: ['MANAGE_ALL_APP_CREDENTIALS'],
    createPermission: ['MANAGE_ALL_APP_CREDENTIALS'],
    disablePermission: [],
    assignPermission: []
  },
  businessHours: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_BUSINESS_HOURS'],
    updatePermission: ['MANAGE_ALL_BUSINESS_HOURS'],
    createPermission: ['MANAGE_ALL_BUSINESS_HOURS'],
    disablePermission: ['MANAGE_ALL_BUSINESS_HOURS'],
    assignPermission: ['MANAGE_ALL_BUSINESS_HOURS']
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
export const openFlowDesigner = (listItemId, row, subEntityName) => ({
  type: 'OPEN_FLOW_DESIGNER',
  listItemId,
  row,
  subEntityName
});
export const createDraftItem = (listItemId, row, subEntityName) => ({
  type: 'CREATE_DRAFT_ITEM',
  listItemId,
  row,
  subEntityName
});
export const copyListItem = (listItemId, row, subEntityName) => ({
  type: 'COPY_LIST_ITEM',
  listItemId,
  row,
  subEntityName
});
export const removeListItem = (listItemId, subEntityName) => ({
  type: 'REMOVE_LIST_ITEM',
  listItemId,
  subEntityName
});
export const updateProficiency = (id, newValue) => ({
  type: 'UPDATE_PROFICIENCY',
  id,
  newValue
});
export const setConfirmationDialog = (modalType, metaData) => ({
  type: 'SET_CONFIRMATION_DIALOG',
  modalType,
  metaData
});
export const toggleProficiency = () => ({
  type: 'TOGGLE_PROFICIENCY'
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

export const fetchReportingEvents = interactionId => ({
  type: 'FETCH_REPORTING_EVENTS',
  interactionId
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
export const onCopyListItemFormSubmit = (values, { dirty }) => ({
  type: 'COPY_LIST_ITEM_FORM_SUBMIT',
  values,
  dirty
});
export const onInitialVersionFormSubmit = (values, { dirty }) => ({
  type: 'INITIAL_VERSION_FORM_SUBMIT',
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

export const changeUserInviteStatus = (toStatus, userId) => ({
  type: 'CHANGE_USER_INVITE_STATUS',
  toStatus,
  userId
});

export const toggleShared = () => ({
  type: 'TOGGLE_SHARED'
});

export const setTenantUserAsImpersonated = () => ({
  type: 'SET_TENANT_USER_AS_IMPERSONATED'
});

export const removeTransferListItem = (type, deleteEntityId) => {
  if (type === 'transferListItem') {
    return {
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      transferListItemId: deleteEntityId
    };
  } else if (type === 'categoryItems') {
    return {
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      categoryId: deleteEntityId
    };
  }
};

export const toggleMessageTemplateText = isDisplayContentInHtml => ({
  type: 'TOGGLE_MESSAGE_TEMPLATE_TEXT_CONTENT',
  isDisplayContentInHtml
});
export const removeReasonListItem = (type, deleteEntityId) => {
  if (type === 'reasonListItem') {
    return {
      type: 'REMOVE_REASON_LIST_ITEM',
      reasonListItemId: deleteEntityId
    };
  } else if (type === 'categoryItems') {
    return {
      type: 'REMOVE_REASON_LIST_ITEM',
      categoryId: deleteEntityId
    };
  }
};

export const removeSecretApiKey = () => ({
  type: 'REMOVE_SECRET_API_KEY'
});

export const deleteApiKey = () => ({
  type: 'DELETE_API_KEY'
});

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_ENTITY': {
      return state.set('currentEntity', action.entityName);
    }
    case 'REMOVE_SECRET_API_KEY': {
      const entityIndex = findEntityIndex(state, 'apiKeys', state.getIn(['apiKeys', 'selectedEntityId']));
      if (entityIndex !== -1) {
        return state.deleteIn(['apiKeys', 'data', entityIndex, 'secret']);
      } else {
        return state;
      }
    }
    case 'DELETE_API_KEY_FULFILLED': {
      const entityIndex = findEntityIndex(state, 'apiKeys', action.sdkCall.data.apiKeyId);
      if (entityIndex !== -1) {
        return state.deleteIn(['apiKeys', 'data', entityIndex]).setIn(['apiKeys', 'selectedEntityId'], '');
      } else {
        return state;
      }
    }
    case 'SET_CONFIRMATION_DIALOG': {
      return state.update(state.get('currentEntity'), entityStore =>
        entityStore.set('confirmationDialogType', action.modalType).set('confirmationDialogMetaData', action.metaData)
      );
    }
    case 'SET_SELECTED_ENTITY_ID': {
      if (state.get('currentEntity') === 'users') {
        return state
          .setIn([state.get('currentEntity'), 'fetching'], true)
          .setIn([state.get('currentEntity'), 'selectedEntityId'], action.entityId);
      }
      return state.setIn([state.get('currentEntity'), 'selectedEntityId'], action.entityId);
    }
    case 'UPDATE_USER_PERMISSIONS': {
      const { tenantId } = action.tenantInfo;
      return state.set('currentTenantId', tenantId);
    }
    case 'FETCH_DATA': {
      return state.setIn([action.entityName, 'fetching'], true);
    }
    case 'FETCH_DATA_FULFILLED': {
      // As we recieve the data we tag on the items that are considered inherited
      const { entityName, response: { result } } = action;
      switch (entityName) {
        case 'roles': {
          const newResult = result.map(entity => ({
            ...entity,
            inherited: entity.type === 'system' || entity.tenantId !== state.get('currentTenantId')
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult));
        }
        case 'apiKeys': {
          const newResult = result.map(entity => ({
            ...entity,
            active: entity.status === 'enabled'
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
        }
        case 'reasonLists': {
          const newResult = result.map(entity => ({
            ...entity,
            inherited: entity.tenantId !== state.get('currentTenantId')
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
        }
        case 'groups': {
          const newResult = result.map(entity => ({
            ...entity,
            inherited: entity.name === 'everyone'
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
        }
        case 'users': {
          const newResult = result.map(entity => {
            let newEntity = { ...entity };
            newEntity.extensions.forEach(ext => (ext.id = generateUUID()));
            return newEntity;
          });
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
        }
        case 'businessHours': {
          const newResult = result.map(entity => ({
            ...entity,
            businessHoursType: Object.entries(entity)
              .filter(([key, value]) => key.includes('TimeMinutes'))
              .every(([key, value]) => value <= 0)
              ? '24/7'
              : 'scheduledHours'
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([entityName, 'fetching']);
        }
        default:
          return state.setIn([entityName, 'data'], fromJS(result)).deleteIn([action.entityName, 'fetching']);
      }
    }
    case 'FETCH_DATA_REJECTED': {
      return state.setIn([action.entityName, 'data'], new List()).deleteIn([action.entityName, 'fetching']);
    }
    case 'FETCH_DATA_ITEM': {
      return state.setIn([action.entityName, 'fetching'], true);
    }
    case 'SET_SELECTED_ENTITY_ID_FULFILLED':
    case 'FETCH_DATA_ITEM_FULFILLED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.id);
      if (entityIndex !== -1) {
        return state
          .mergeIn([action.entityName, 'data', entityIndex], fromJS({ ...action.response.result, updating: false }))
          .deleteIn([action.entityName, 'fetching']);
      } else {
        return state;
      }
    }
    case 'FETCH_DATA_FLOW': {
      return state.setIn([action.entityName, 'fetching'], true);
    }
    case 'FETCH_DATA_FLOW_FULFILLED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.id);
      if (entityIndex !== -1) {
        return state
          .mergeIn([action.entityName, 'data', entityIndex], fromJS({ ...action.response.result }))
          .deleteIn([action.entityName, 'fetching']);
      } else {
        return state;
      }
    }
    case 'FETCH_DATA_ITEM_REJECTED': {
      return setEntityUpdatingHelper(state, action, false);
    }
    case 'TOGGLE_BULK_ENTITY_CHANGE': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
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

      if (action.entityName === 'dispatchMappings') {
        const entityIndex = findEntityIndex(state, 'flows', result.flowId);
        result.flow = { id: result.flowId, name: state.getIn(['flows', 'data', entityIndex]).get('name') };
      } else if (action.entityName === 'businessHours') {
        result.businessHoursType = Object.entries(result)
          .filter(([key, value]) => key.includes('TimeMinutes'))
          .every(([key, value]) => value <= 0)
          ? '24/7'
          : 'scheduledHours';
      } else if (action.entityName === 'apiKeys') {
        result.active = result.status === 'enabled';
      }

      return state.update(action.entityName, entityStore =>
        entityStore.update('data', data => data.push(fromJS(result))).set('creating', false)
      );
    }
    case 'CREATE_ENTITY_REJECTED': {
      return state.setIn([action.entityName, 'creating'], false);
    }
    case 'UPDATE_ENTITY': {
      if (action.entityName === 'transferLists' || action.entityName === 'reasonLists') {
        return setEntityUpdatingHelper(state, action, true).deleteIn([action.entityName, 'selectedSubEntityId']);
      }
      return setEntityUpdatingHelper(state, action, true);
    }
    case 'UPDATE_PROFICIENCY': {
      const currentEntity = state.get('currentEntity');
      const skillId = currentEntity === 'skills' ? state.getIn([currentEntity, 'selectedEntityId']) : action.id;
      const userId = currentEntity === 'skills' ? action.id : state.getIn([currentEntity, 'selectedEntityId']);

      if (currentEntity === 'skills') {
        const userIndex = state.getIn(['users', 'data']).findIndex(entity => entity.get('id') === userId);
        const skillIndex = state
          .getIn(['users', 'data', userIndex, 'skills'])
          .findIndex(entity => entity.get('id') === skillId);
        if (userIndex !== -1) {
          return state.setIn(['users', 'data', userIndex, 'skills', skillIndex, 'proficiency'], action.newValue);
        } else {
          return state;
        }
      } else if (currentEntity === 'users') {
        const userIndex = state.getIn(['users', 'data']).findIndex(entity => entity.get('id') === userId);
        const skillIndex = state
          .getIn(['users', 'data', userIndex, 'skillsWithProficiency'])
          .findIndex(entity => entity.get('skillId') === skillId);
        if (userIndex !== -1) {
          return state.setIn(
            ['users', 'data', userIndex, 'skillsWithProficiency', skillIndex, 'proficiency'],
            action.newValue
          );
        } else {
          return state;
        }
      } else {
        return state;
      }
    }
    case 'TOGGLE_ENTITY_FULFILLED':
    case 'UPDATE_ENTITY_FULFILLED':
    case 'CHANGE_USER_INVITE_STATUS_FULFILLED':
    case 'UPDATE_USER_CAPACITY_RULE_FULFILLED':
    case 'UPDATE_PLATFORM_USER_ENTITY_FULFILLED':
    case 'BULK_ENTITY_UPDATE_FULFILLED': {
      const { result } = action.response;
      const entityIndex = findEntityIndex(state, action.entityName, result.id || action.id);

      if (
        action.type === 'BULK_ENTITY_UPDATE_FULFILLED' &&
        action.entityName === 'users' &&
        (action.values.addSkill || action.values.removeSkill || action.values.addGroup || action.values.removeGroup)
      ) {
        const userEntityIndex = findEntityIndex(state, 'users', action.response.result.userId);
        if (action.values.addSkill) {
          return state.updateIn(['users', 'data', userEntityIndex, 'skills'], skills => skills.push(fromJS(result)));
        } else if (action.values.removeSkill) {
          const skillIndex = state.getIn(['users', 'data', userEntityIndex, 'skills']).findIndex(skill => {
            if (typeof skill === 'object') {
              return action.values.removeSkillId === (skill.get('skillId') || skill.get('id'));
            } else {
              return action.values.removeSkillId === skill;
            }
          });
          return state.deleteIn(['users', 'data', userEntityIndex, 'skills', skillIndex]);
        } else if (action.values.addGroup) {
          return state.updateIn(['users', 'data', userEntityIndex, 'groups'], groups => groups.push(fromJS(result)));
        } else if (action.values.removeGroup) {
          const groupIndex = state.getIn(['users', 'data', userEntityIndex, 'groups']).findIndex(group => {
            if (typeof group === 'object') {
              return action.values.removeGroupId === (group.get('groupId') || group.get('id'));
            } else {
              return action.values.removeGroupId === group;
            }
          });
          return state.deleteIn(['users', 'data', userEntityIndex, 'groups', groupIndex]);
        }
      }

      if (entityIndex !== -1) {
        if (action.type !== 'BULK_ENTITY_UPDATE_FULFILLED' && action.entityName === 'dispatchMappings') {
          // We probably haven't fetched flows data when performing
          // bulk actions, so we prevent accesing flows data.
          const flowIndex = findEntityIndex(state, 'flows', result.flowId);
          result.flow = { id: result.flowId, name: state.getIn(['flows', 'data', flowIndex]).get('name') };
        } else if (action.entityName === 'businessHours') {
          result.businessHoursType = Object.entries(result)
            .filter(([key, value]) => key.includes('TimeMinutes'))
            .every(([key, value]) => value <= 0)
            ? '24/7'
            : 'scheduledHours';
        } else if (action.entityName === 'apiKeys') {
          result.active = result.status === 'enabled';
        }

        return state
          .remove('loading')
          .mergeIn([action.entityName, 'data', entityIndex], fromJS({ ...result, updating: false }));
      }
      return state;
    }
    case 'TOGGLE_LIST_ITEM_ENTITY': {
      return state.set('loading', action.id);
    }
    case 'TOGGLE_LIST_ITEM_ENTITY_FULFILLED': {
      const { actionType, entityName, entityId, name, id, response } = action;
      const entityIndex = findEntityIndex(state, action.entityName, entityId);
      const currentList = state.getIn([entityName, 'data', entityIndex, name]);
      const modifiedList = actionType === 'associate' ? currentList.push(id) : currentList.filter(x => x !== id);
      if (entityIndex !== -1 && name === 'skills') {
        return state
          .remove('loading')
          .setIn([entityName, 'data', entityIndex, name], modifiedList)
          .updateIn([entityName, 'data', entityIndex, 'skillsWithProficiency'], list => {
            if (actionType === 'associate') {
              return list.push(fromJS(response.result));
            } else {
              const itemIndex = list.findIndex(item => item.get('skillId') === id);
              return list.delete(itemIndex);
            }
          });
      } else if (entityIndex !== -1 && name === 'users') {
        const userIndex = state.getIn(['users', 'data']).findIndex(entity => entity.get('id') === id);
        return state
          .remove('loading')
          .setIn([entityName, 'data', entityIndex, name], modifiedList)
          .updateIn(['users', 'data', userIndex, 'skills'], list => {
            if (actionType === 'associate') {
              return list.push(fromJS({ id: response.result.skillId, proficiency: response.result.proficiency }));
            } else {
              const itemIndex = list.findIndex(item => item.get('id') === entityId);
              return list.delete(itemIndex);
            }
          });
      } else if (entityIndex !== -1) {
        return state.remove('loading').setIn([entityName, 'data', entityIndex, name], modifiedList);
      } else {
        return state.remove('loading');
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
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
      if (entityIndex !== -1) {
        return state.setIn(
          [action.entityName, 'data', entityIndex, action.associatedEntityName],
          fromJS(response.map(x => x[idType]))
        );
      } else {
        return state;
      }
    }
    case 'FETCH_REPORTING_EVENTS_FULFILLED': {
      return state.set('reportingEvents', action.response);
    }
    case 'UPDATE_ENTITY_REJECTED':
    case 'UPLOAD_CSV_REJECTED': {
      return setEntityUpdatingHelper(state, action, false);
    }
    case 'SET_ENTITY_UPDATING': {
      return setEntityUpdatingHelper(state, action, action.updating);
    }
    case 'SET_SELECTED_SUB_ENTITY_ID': {
      return state.setIn([state.get('currentEntity'), 'selectedSubEntityId'], action.selectedSubEntityId);
    }
    case 'CREATE_DRAFT_ITEM':
    case 'COPY_LIST_ITEM': {
      return state
        .setIn([state.get('currentEntity'), 'selectedSubEntityId'], action.listItemId)
        .setIn([state.get('currentEntity'), 'selectedSubEntityName'], action.subEntityName)
        .setIn([state.get('currentEntity'), 'selectedSubEntityData'], action.row);
    }
    case 'CREATE_FLOW_VERSION_DRAFT_FULFILLED': {
      if (action.selectedSubEntityId === 'drafts') {
        const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
        if (entityIndex !== -1) {
          return state
            .update(action.entityName, entityStore =>
              entityStore
                .updateIn(['data', entityIndex, 'drafts'], subEntityList =>
                  subEntityList.push(fromJS(action.response.result))
                )
                .set('selectedSubEntityId', undefined)
                .set('subEntitySaving', false)
            )
            .setIn([state.get('currentEntity'), 'selectedSubEntityId'], undefined)
            .deleteIn([state.get('currentEntity'), 'selectedSubEntityName'])
            .deleteIn([state.get('currentEntity'), 'selectedSubEntityData']);
        } else {
          return state
            .setIn([state.get('currentEntity'), 'selectedSubEntityId'], undefined)
            .deleteIn([state.get('currentEntity'), 'selectedSubEntityName'])
            .deleteIn([state.get('currentEntity'), 'selectedSubEntityData']);
        }
      }
      return state
        .setIn([state.get('currentEntity'), 'selectedSubEntityId'], undefined)
        .deleteIn([state.get('currentEntity'), 'selectedSubEntityName'])
        .deleteIn([state.get('currentEntity'), 'selectedSubEntityData']);
    }
    case 'CREATE_EXCEPTION_FULFILLED': {
      const entityIndex = findEntityIndex(state, 'businessHours', action.entityId);
      if (entityIndex !== -1) {
        return state
          .update('businessHours', entityStore =>
            entityStore
              .updateIn(
                ['data', entityIndex, 'exceptions'],
                exceptions =>
                  !exceptions ? fromJS([action.response.result]) : exceptions.push(fromJS(action.response.result))
              )
              .set('selectedSubEntityId', undefined)
              .set('subEntitySaving', false)
          )
          .setIn([state.get('currentEntity'), 'selectedSubEntityId'], undefined);
      }
      return state.setIn([state.get('currentEntity'), 'selectedSubEntityId'], undefined);
    }
    case 'CREATE_EXCEPTION_REJECTED': {
      const entityIndex = findEntityIndex(state, 'businessHours', action.entityId);
      if (entityIndex !== -1) {
        return state.setIn(['businessHours', 'subEntitySaving'], false);
      }
      return state.setIn([state.get('currentEntity'), 'selectedSubEntityId'], undefined);
    }
    case 'INITIAL_VERSION_FORM_SUBMIT_FULFILLED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
      if (entityIndex !== -1 && action.entityName === 'slas') {
        // When creating a SLA version, we set it as the new default
        return state
          .remove('loading')
          .setIn([action.entityName, 'selectedSubEntityId'], undefined)
          .setIn([action.entityName, 'subEntitySaving'], false);
      } else {
        return state;
      }
    }
    case 'CREATE_SUB_ENTITY':
    case 'UPDATE_SUB_ENTITY': {
      return state.setIn([action.entityName, 'subEntitySaving'], true);
    }
    case 'CREATE_SUB_ENTITY_FULFILLED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
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
    case 'REMOVE_LIST_ITEM': {
      return state.set('loading', action.listItemId);
    }
    case 'REMOVE_LIST_ITEM_REJECTED': {
      return state.remove('loading');
    }
    case 'REMOVE_LIST_ITEM_FULFILLED': {
      const entity = selectedEntity(state);
      if (action.entityName === 'flows') {
        const filteredListMembers = state
          .getIn([entity.type, 'data', entity.index, 'drafts'])
          .filterNot(member => member.get('id') === action.listItemId);
        return state.remove('loading').setIn([entity.type, 'data', entity.index, 'drafts'], filteredListMembers);
      } else if (action.entityName === 'businessHours') {
        const filteredListMembers = state
          .getIn([entity.type, 'data', entity.index, 'exceptions'])
          .filterNot(member => member.get('id') === action.listItemId);
        return state.remove('loading').setIn([entity.type, 'data', entity.index, 'exceptions'], filteredListMembers);
      }
      const filteredListMembers = state
        .getIn([entity.type, 'data', entity.index, 'members'])
        .filterNot(member => member.get('id') === action.listItemId);
      return state.remove('loading').setIn([entity.type, 'data', entity.index, 'members'], filteredListMembers);
    }
    case 'ADD_LIST_ITEM': {
      return state.set('loading', action.listItemId);
    }
    case 'ADD_LIST_ITEM_REJECTED': {
      return state.remove('loading');
    }
    case 'ADD_LIST_ITEM_FULFILLED': {
      const entity = selectedEntity(state);
      const entityToAdd = state
        .getIn([entity.dependency, 'data'])
        .find(entity => entity.get('id') === action.listItemId);
      return state
        .remove('loading')
        .updateIn([entity.type, 'data', entity.index, 'members'], members => members.push(entityToAdd));
    }
    case 'UPDATE_SUB_ENTITY_FULFILLED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
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
      return setSubEntityDeleting(state.set('loading', action.subEntityId), action, true);
    }
    case 'DELETE_SUB_ENTITY_FULFILLED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
      if (entityIndex !== -1) {
        return state
          .update(action.entityName, entityStore =>
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
          )
          .remove('loading');
      } else {
        return state;
      }
    }
    case 'DELETE_SUB_ENTITY_REJECTED': {
      return state.remove('loading');
    }
    case 'FETCH_TENANT_DEFAULT_SLA': {
      const { result } = action.response;

      return state.update(action.entityName, entityStore =>
        entityStore.update('data', data => data.push(fromJS(result)))
      );
    }
    case 'SET_TIMEZONES': {
      return state.setIn(['businessHours', 'timezones'], fromJS(action.timezones));
    }
    case '@@redux-form/INITIALIZE':
    case '@@redux-form/CHANGE': {
      if (
        (action.entityName === 'transferLists' || action.entityName === 'reasonLists') &&
        state.getIn([action.entityName, 'selectedSubEntityId']) !== undefined
      ) {
        return state.deleteIn([action.entityName, 'selectedSubEntityId']);
      }
      return state;
    }
    case '@@redux-form/CHANGE_FULFILLED':
    case '@@redux-form/CHANGE_REJECTED':
    case '@@redux-form/DESTROY': {
      if (action.meta.form.includes('messageTemplates')) {
        return state.deleteIn(['messageTemplates', 'isDisplayContentInHtml']);
      }
      return setUserExistsInPlatform(state, action);
    }
    case 'TOGGLE_MESSAGE_TEMPLATE_TEXT_CONTENT': {
      return state.setIn(['messageTemplates', 'isDisplayContentInHtml'], action.isDisplayContentInHtml);
    }
    default:
      return state;
  }
}

// Reducer helper functions

export const setUserExistsInPlatform = (state, action) => {
  if (
    action.meta.form === 'users:create' &&
    action.meta.field === 'email' &&
    action.type === '@@redux-form/CHANGE_FULFILLED'
  ) {
    return state.setIn([state.get('currentEntity'), 'userExistInPlatform'], true);
  } else {
    return state.setIn([state.get('currentEntity'), 'userExistInPlatform'], false);
  }
};

export const setEntityUpdatingHelper = (state, { entityName, entityId }, updating) => {
  const entityIndex = findEntityIndex(state, entityName, entityId);
  if (entityIndex !== -1) {
    return state.setIn([entityName, 'data', entityIndex, 'updating'], updating);
  } else {
    return state;
  }
};

const setSubEntityDeleting = (state, { subEntityId }, deleting) => {
  const currentEntity = state.get('currentEntity');
  const selectedEntityId = state.getIn([currentEntity, 'selectedEntityId']);
  const entityIndex = findEntityIndex(state, currentEntity, selectedEntityId);
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
