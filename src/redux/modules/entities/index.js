/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';
import { generateUUID } from 'serenova-js-utils/uuid';
import { findEntityIndex, getSelectedEntityWithIndex } from './selectors';

// Initial Sub State
const defaultEntity = {
  data: [],
  selectedEntityId: '',
  sidePanelWidth: 550,
  confirmationDialogType: undefined
};

// Permissions shared by businessHour and businessHourV2 entities
const businessHourPermisssions = {
  readPermission: ['VIEW_ALL_BUSINESS_HOURS'],
  updatePermission: ['MANAGE_ALL_BUSINESS_HOURS'],
  createPermission: ['MANAGE_ALL_BUSINESS_HOURS'],
  disablePermission: ['MANAGE_ALL_BUSINESS_HOURS'],
  sharePermission: ['MANAGE_ALL_BUSINESS_HOURS']
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
    ...defaultEntity,
    readPermission: ['IDENTITY_PROVIDERS_CREATE'],
    updatePermission: ['IDENTITY_PROVIDERS_UPDATE'],
    createPermission: ['IDENTITY_PROVIDERS_CREATE'],
    deletePermission: ['IDENTITY_PROVIDERS_DELETE'],
    disablePermission: [''],
    sharePermission: ['']
  },
  lists: {
    ...defaultEntity,
    sidePanelWidth: 600,
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
    sidePanelWidth: 650,
    readPermission: ['USER_MANAGEMENT_EMAIL_READ'],
    updatePermission: ['USER_MANAGEMENT_EMAIL_UPDATE', 'PLATFORM_USER_MANAGEMENT_EMAIL_UPDATE']
  },
  outboundIdentifierLists: {
    ...defaultEntity,
    metaData: {
      listDependency: 'outboundIdentifiers'
    },
    sidePanelWidth: 650,
    readPermission: ['OUTBOUND_IDENTIFIER_READ'],
    updatePermission: ['OUTBOUND_IDENTIFIER_MODIFY'],
    createPermission: ['OUTBOUND_IDENTIFIER_CREATE'],
    disablePermission: ['OUTBOUND_IDENTIFIER_DISABLE'],
    assignPermission: ['OUTBOUND_IDENTIFIER_ASSIGN']
  },
  chatWidgets: {
    ...defaultEntity,
    readPermission: ['WEB_INTEGRATIONS_APP_READ'],
    updatePermission: ['WEB_INTEGRATIONS_APP_UPDATE'],
    createPermission: ['WEB_INTEGRATIONS_APP_UPDATE']
  },
  digitalChannelsApps: {
    data: []
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
    sidePanelWidth: 650,
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
  standardDashboards: {
    ...defaultEntity
  },
  forecastDashboards: {
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
    sidePanelWidth: 600,
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
    sidePanelWidth: 600,
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
    sidePanelWidth: 650,
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
  dispositions: {
    ...defaultEntity,
    readPermission: ['READ_DISPOSITIONS'],
    updatePermission: ['UPDATE_DISPOSITIONS'],
    createPermission: ['CREATE_DISPOSITIONS'],
    sharePermission: ['SHARE_DISPOSITIONS']
  },
  slas: {
    ...defaultEntity,
    sidePanelWidth: 650,
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
    ...businessHourPermisssions
  },
  dispositionLists: {
    ...defaultEntity,
    readPermission: ['READ_DISPOSITION_LIST'],
    updatePermission: ['UPDATE_DISPOSITION_LIST'],
    createPermission: ['CREATE_DISPOSITION_LIST'],
    sharePermission: ['UPDATE_DISPOSITION_LIST'],
    disablePermission: [''],
    assignPermission: ['']
  },
  businessHoursV2: {
    subEntity: 'drafts',
    data: [],
    selectedEntityId: '',
    confirmationDialogType: undefined,
    ...businessHourPermisssions
  },
  customAttributes: {
    ...defaultEntity,
    readPermission: ['INTERACTION_ATTRIBUTES_CONFIG_READ', 'PLATFORM_VIEW_ALL'],
    createPermission: ['INTERACTION_ATTRIBUTES_CONFIG_CREATE', 'PLATFORM_MANAGE_ALL_INTERACTION_ATTRIBUTES'],
    updatePermission: ['INTERACTION_ATTRIBUTES_CONFIG_UPDATE', 'PLATFORM_MANAGE_ALL_INTERACTION_ATTRIBUTES']
  },
  integrations: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_PROVIDERS'],
    updatePermission: ['MANAGE_ALL_PROVIDERS'],
    createPermission: ['MANAGE_ALL_PROVIDERS'],
    disablePermission: [],
    assignPermission: []
  },
  timezones: {
    data: []
  },
  regions: {
    data: []
  },
  contactAttributes: {
    ...defaultEntity,
    readPermission: ['CONTACTS_ATTRIBUTES_READ'],
    updatePermission: ['CONTACTS_ATTRIBUTES_UPDATE'],
    createPermission: ['CONTACTS_ATTRIBUTES_CREATE']
  },
  contactLayouts: {
    ...defaultEntity,
    readPermission: ['CONTACTS_LAYOUTS_READ'],
    updatePermission: ['CONTACTS_LAYOUTS_UPDATE'],
    createPermission: ['CONTACTS_LAYOUTS_CREATE']
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

export const toggleEntity = entity => ({
  type: 'TOGGLE_ENTITY',
  entity
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
export const removeTwilioGlobalDialParam = subEntityName => ({
  type: 'REMOVE_TWILIO_GLOBAL_DIAL_PARAM',
  subEntityName
});
export const updateTwilioGlobalDialParam = subEntityName => ({
  type: 'UPDATE_TWILIO_GLOBAL_DIAL_PARAM',
  subEntityName
});
export const updateProficiency = (id, newValue) => ({
  type: 'UPDATE_PROFICIENCY',
  id,
  newValue
});
export const setConfirmationDialog = (modalType, metaData, nextEntity) => ({
  type: 'SET_CONFIRMATION_DIALOG',
  modalType,
  metaData,
  nextEntity
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

export const setSelectedBusinessHourVersion = selectedVersionId => ({
  type: 'SET_SELECTED_BUSINESS_HOUR_VERSION',
  selectedVersionId
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

export const updateConfigUIUrlWithQueryString = entityId => ({
  type: 'UPDATE_CONFIG_UI_URL_WITH_QUERY_STRING',
  entityId
});

export const fetchActiveVersionBusinessHoursFulfilled = activeVersions => ({
  type: 'FETCH_ACTIVE_VERSION_BUSINESS_HOUR_FULFILLED',
  activeVersions
});

export const onIntegrationListenerFormSubmit = (values, { dirty }) => ({
  type: 'INTEGRATION_LISTENER_FORM_SUBMIT',
  values,
  dirty
});

export const publishBusinessHoursV2Draft = values => ({
  type: 'PUBLISH_BUSINESS_HOURS_V2_DRAFT',
  values
});

export const saveBeforePublishBusinessHoursV2Drfat = values => ({
  type: 'SAVE_BEFORE_PUBLISH_BUSINESS_HOURS_V2_DRAFT',
  values
});

export const createDraftBusinessHoursV2 = (businessHourId, values) => ({
  type: 'CREATE_DRAFT_BUSINESS_HOURS_V2',
  businessHourId,
  values
});

export const UpdateBrandingImageFileInState = (file, name) => ({
  type: 'UPDATE_BRANDING_FILES_IN_STATE',
  file,
  name
});

export const resetTenantBranding = entityId => ({
  type: 'RESET_TENANT_BRANDING_TO_DEFAULT',
  entityId
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
    case 'UPDATE_TWILIO_GLOBAL_DIAL_PARAM': {
      const twilioEntityIndex = getSelectedEntityWithIndex(state).get('currentIndex');
      if (twilioEntityIndex !== -1) {
        return state.setIn([state.get('currentEntity'), 'selectedSubEntityId'], action.subEntityName);
      } else {
        return state;
      }
    }
    case 'SET_CONFIRMATION_DIALOG': {
      const updatedState = state
        .update(state.get('currentEntity'), entityStore =>
          entityStore.set('confirmationDialogType', action.modalType).set('confirmationDialogMetaData', action.metaData)
        )
        .delete('nextEntity');
      if (action.nextEntity) {
        return updatedState.set('nextEntity', action.nextEntity);
      } else {
        return updatedState;
      }
    }
    case 'SET_SELECTED_ENTITY_ID': {
      const currentEntity = state.get('currentEntity');

      const updatedState = state
        .setIn([currentEntity, 'selectedEntityId'], action.entityId)
        // We uncheck all rows if form is closed and
        // we were performing bulk actions
        .updateIn(
          [currentEntity, 'data'],
          entityData =>
            action.entityId === ''
              ? entityData && entityData.map(item => item.set('bulkChangeItem', false))
              : entityData
        );
      return updatedState;
    }
    case 'UPDATE_USER_PERMISSIONS': {
      const { tenantId } = action.tenantInfo;
      return state.set('currentTenantId', tenantId);
    }
    case 'SWITCH_TENANT': {
      const { tenantId, setAsActiveTenant } = action;
      if (setAsActiveTenant) {
        return state
          .set('currentTenantId', tenantId)
          .setIn(['tenants', 'selectedEntityId'], tenantId)
          .updateIn(['branding', 'data'], () => undefined)
          .setIn(['branding', 'isUpdating'], true);
      } else {
        return state.set('currentTenantId', tenantId);
      }
    }
    case 'FETCH_DATA': {
      if (action.currentEntityName === 'tenants' && !action.isPlatformEntity) {
        const entityIndex = findEntityIndex(state, action.currentEntityName, action.entityId);
        if (entityIndex !== -1) {
          const updatedState = state.setIn(
            [action.currentEntityName, 'data', entityIndex, 'dependentEntities', action.entityName, 'fetching'],
            true
          );
          return action.entityName === 'branding' ? updatedState.deleteIn(['branding', 'isUpdating']) : updatedState;
        }
      } else if (action.entityName === 'contactLayouts') {
        // We need to fetch attributes freshly, each time user navigates to contact-layouts page.
        return state.setIn([action.entityName, 'fetching'], true).setIn(['contactAttributes', 'fetching'], true);
      }
      return state.setIn([action.entityName, 'fetching'], true);
    }
    case 'FETCH_DATA_FULFILLED': {
      // As we recieve the data we tag on the items that are considered inherited
      const { currentEntityName, entityName, response: { result } } = action;

      switch (entityName) {
        case 'roles': {
          const newResult = result.map(entity => ({
            ...entity,
            inherited: entity.type === 'system' || entity.tenantId !== state.get('currentTenantId')
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
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
        case 'lists': {
          const newResult = result.map(entity => ({
            ...entity,
            inherited: entity.tenantId !== state.get('currentTenantId')
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
        }
        case 'contactAttributes': {
          const newResult = result.map(entity => ({
            ...entity,
            inherited: entity.tenantId !== state.get('currentTenantId')
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
        }
        case 'users': {
          // tenants page has dependentEntities whcih changes based on the selected tenant
          if (currentEntityName === 'tenants' && action.entityId !== 'create' && action.entityId !== '') {
            const entityIndex = findEntityIndex(state, currentEntityName, action.entityId);
            if (entityIndex !== -1) {
              return state
                .setIn(
                  [currentEntityName, 'data', entityIndex, 'dependentEntities', entityName, 'data'],
                  fromJS(result)
                )
                .deleteIn([currentEntityName, 'data', entityIndex, 'dependentEntities', entityName, 'fetching']);
            } else {
              return state;
            }
          } else {
            const newResult = result.map(entity => {
              let newEntity = { ...entity };
              newEntity.extensions.forEach(ext => (ext.id = generateUUID()));
              return newEntity;
            });
            return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([action.entityName, 'fetching']);
          }
        }
        case 'businessHours': {
          const newResult = result.map(entity => ({
            ...entity,
            businessHoursType: Object.entries(entity)
              .filter(([key]) => key.includes('TimeMinutes'))
              .every(([key, value]) => value <= 0)
              ? '24/7'
              : 'scheduledHours'
          }));
          return state.setIn([entityName, 'data'], fromJS(newResult)).deleteIn([entityName, 'fetching']);
        }
        case 'slas':
        case 'branding':
        case 'integrations':
        case 'identityProviders': {
          // tenants page has dependentEntities whcih changes based on the selected tenant
          if (currentEntityName === 'tenants') {
            const entityIndex = findEntityIndex(state, currentEntityName, action.entityId);
            if (entityIndex !== -1) {
              const updatedState = state
                .setIn(
                  [currentEntityName, 'data', entityIndex, 'dependentEntities', entityName, 'data'],
                  fromJS(result)
                )
                .deleteIn([currentEntityName, 'data', entityIndex, 'dependentEntities', entityName, 'fetching']);
              return entityName === 'branding' && state.get('currentTenantId') === action.entityId
                ? updatedState.setIn(['branding', 'data'], fromJS(result)).deleteIn(['branding', 'fetching'])
                : updatedState;
            } else {
              return state;
            }
          }
        }
        default:
          return state.setIn([entityName, 'data'], fromJS(result)).deleteIn([action.entityName, 'fetching']);
      }
    }
    case 'FETCH_DATA_REJECTED': {
      if (action.currentEntityName === 'tenants' && !action.isPlatformEntity) {
        const entityIndex = findEntityIndex(state, action.currentEntityName, action.entityId);
        if (entityIndex !== -1) {
          const updatedState = state
            .setIn(
              [action.currentEntityName, 'data', entityIndex, 'dependentEntities', action.entityName, 'data'],
              new List()
            )
            .deleteIn([
              action.currentEntityName,
              'data',
              entityIndex,
              'dependentEntities',
              action.entityName,
              'fetching'
            ]);
          return action.entityName === 'branding'
            ? updatedState.deleteIn(['branding', 'fetching']).deleteIn(['branding', 'isUpdating'])
            : updatedState;
        }
      }
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
    case 'BULK_ENTITY_UPDATE': {
      return state.setIn([action.entityName, 'bulkUpdating'], true);
    }
    case 'BULK_ENTITY_UPDATE_rejected':
    case 'BULK_ENTITY_UPDATE_cancelled': {
      return state.deleteIn([state.get('currentEntity'), 'bulkUpdating']);
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
    case 'SET_MAPPING_VALUE_INVALID': {
      return state.setIn(['dispatchMappings', 'mappingValueInvalid'], action.invalid);
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
          .filter(([key]) => key.includes('TimeMinutes'))
          .every(([key, value]) => value <= 0)
          ? '24/7'
          : 'scheduledHours';
      } else if (action.entityName === 'apiKeys') {
        result.active = result.status === 'enabled';
      }

      const updatedState = state.update(action.entityName, entityStore =>
        entityStore.update('data', data => data.push(fromJS(result)))
      );

      if (action.entityName === 'tenants' || action.entityName === 'businessHoursV2') {
        return updatedState;
      } else {
        return updatedState.setIn([action.entityName, 'creating'], false);
      }
    }
    case 'CREATE_ENTITY_REJECTED': {
      return state.setIn([action.entityName, 'creating'], false);
    }
    case 'UPDATE_ENTITY': {
      if (
        action.entityName === 'transferLists' ||
        action.entityName === 'reasonLists' ||
        action.entityName === 'dispositionLists' ||
        action.entityName === 'contactLayouts'
      ) {
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
          return state
            .updateIn(['users', 'data', userEntityIndex, 'skills'], skills => skills.push(fromJS(result)))
            .deleteIn(['users', 'bulkUpdating']);
        } else if (action.values.removeSkill) {
          const skillIndex = state.getIn(['users', 'data', userEntityIndex, 'skills']).findIndex(skill => {
            if (typeof skill === 'object') {
              return action.values.removeSkillId === (skill.get('skillId') || skill.get('id'));
            } else {
              return action.values.removeSkillId === skill;
            }
          });
          return state
            .deleteIn(['users', 'data', userEntityIndex, 'skills', skillIndex])
            .deleteIn(['users', 'bulkUpdating']);
        } else if (action.values.addGroup) {
          return state
            .updateIn(['users', 'data', userEntityIndex, 'groups'], groups => groups.push(fromJS(result)))
            .deleteIn(['users', 'bulkUpdating']);
        } else if (action.values.removeGroup) {
          const groupIndex = state.getIn(['users', 'data', userEntityIndex, 'groups']).findIndex(group => {
            if (typeof group === 'object') {
              return action.values.removeGroupId === (group.get('groupId') || group.get('id'));
            } else {
              return action.values.removeGroupId === group;
            }
          });
          return state
            .deleteIn(['users', 'data', userEntityIndex, 'groups', groupIndex])
            .deleteIn(['users', 'bulkUpdating']);
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
            .filter(([key]) => key.includes('TimeMinutes'))
            .every(([key, value]) => value <= 0)
            ? '24/7'
            : 'scheduledHours';
        } else if (action.entityName === 'apiKeys') {
          result.active = result.status === 'enabled';
        } else if (action.type === 'UPDATE_PLATFORM_USER_ENTITY_FULFILLED' && action.entityName === 'users') {
          result.platformRoleId = result.roleId;
          delete result['roleId'];
        }

        const updatedState = state
          .remove('loading')
          .mergeIn([action.entityName, 'data', entityIndex], fromJS({ ...result }))
          .deleteIn([action.entityName, 'bulkUpdating']);

        if (action.entityName === 'tenants') {
          return updatedState;
        } else if (action.entityName === 'integrations') {
          if (result.type === 'twilio') {
            return updatedState
              .setIn([action.entityName, 'selectedSubEntityId'], undefined)
              .setIn([action.entityName, 'data', entityIndex, 'updating'], false);
          } else if (
            (result.type === 'email' || result.type === 'facebook' || result.type === 'salesforce') &&
            !result.active
          ) {
            return updatedState
              .updateIn([action.entityName, 'data', entityIndex, 'listeners'], listeners =>
                listeners.map(listener => listener.set('active', false))
              )
              .setIn([action.entityName, 'data', entityIndex, 'updating'], false);
          } else {
            return updatedState.setIn([action.entityName, 'data', entityIndex, 'updating'], false);
          }
        } else {
          return updatedState.setIn([action.entityName, 'data', entityIndex, 'updating'], false);
        }
      }
      return state.deleteIn([action.entityName, 'bulkUpdating']);
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
      if (action.associatedEntityName === 'users' && action.entityName === 'groups') {
        idType = 'memberId';
      }
      if (action.associatedEntityName === 'users' && action.entityName === 'skills') {
        idType = 'userId';
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
      return setEntityUpdatingHelper(state.remove('loading'), action, false);
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
    case 'VIEW_FLOW_DESIGNER_FULLFILED': {
      return state
        .setIn([state.get('currentEntity'), 'selectedSubEntityId'], undefined)
        .deleteIn([state.get('currentEntity'), 'selectedSubEntityName'])
        .deleteIn([state.get('currentEntity'), 'selectedSubEntityData']);
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
      }
      return state;
    }
    case 'INTEGRATION_LISTENER_FORM_SUBMIT_FULFILLED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
      if (entityIndex !== -1 && action.entityName === 'integrations') {
        return state.update(action.entityName, entityStore =>
          entityStore
            .updateIn(['data', entityIndex, 'listeners'], subEntityList => {
              if (action.subEntityId === 'listeners') {
                return subEntityList.push(fromJS({ ...action.response.result }));
              }
              const subEntityIndex = subEntityList.findIndex(subEntity => subEntity.get('id') === action.subEntityId);
              if (subEntityIndex !== -1) {
                return subEntityList.setIn([subEntityIndex], fromJS({ ...action.response.result }));
              }
              return subEntityList;
            })
            .set('selectedSubEntityId', undefined)
            .set('subEntitySaving', false)
        );
      }
      return state;
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
            .updateIn(['data', entityIndex, 'items'], (subEntityList = List()) =>
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
      } else if (action.entityName === 'businessHoursV2') {
        const filteredListMembers = state
          .getIn([entity.type, 'data', entity.index, 'items'])
          .filterNot(member => member.get('id') === action.listItemId);
        return state.remove('loading').setIn([entity.type, 'data', entity.index, 'items'], filteredListMembers);
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
            .updateIn(['data', entityIndex, 'items'], (subEntityList = List()) => {
              const subEntityIndex = subEntityList.findIndex(
                subEntity => subEntity.get('key') === action.subEntityId || subEntity.get('id') === action.subEntityId
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
            .update(
              'selectedSubEntityId',
              selectedSubEntityId => (action.entityName === 'businessHoursV2' ? selectedSubEntityId : undefined)
            )
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
    case '@@redux-form/INITIALIZE':
    case '@@redux-form/CHANGE': {
      if (
        (action.entityName === 'transferLists' ||
          action.entityName === 'reasonLists' ||
          action.entityName === 'dispositionLists' ||
          action.entityName === 'contactLayouts') &&
        state.getIn([action.entityName, 'selectedSubEntityId']) !== undefined
      ) {
        return state.deleteIn([action.entityName, 'selectedSubEntityId']);
      }
      if (action.type === '@@redux-form/INITIALIZE' && action.entityName === 'tenants') {
        const currentEntity = state.get('currentEntity');
        const selectedEntityId = state.getIn([currentEntity, 'selectedEntityId']);
        const a = { entityId: selectedEntityId, entityName: currentEntity };

        if (action.toastMessage) {
          if (action.toastMessage.includes('create')) {
            return state.setIn([action.entityName, 'creating'], false);
          } else {
            return setEntityUpdatingHelper(state, a, false);
          }
        }
      }
      return state;
    }
    case '@@redux-form/CHANGE_FULFILLED':
    case '@@redux-form/CHANGE_REJECTED':
    case '@@redux-form/DESTROY': {
      const updatedState = setUserExistsInPlatform(state, action);

      if (action.type === '@@redux-form/DESTROY') {
        const isCustomEntity = entityName => action.meta.form.toString().startsWith(entityName);
        if (isCustomEntity('messageTemplates')) {
          return updatedState.deleteIn(['messageTemplates', 'isDisplayContentInHtml']);
        }
      }
      return updatedState;
    }
    case 'TOGGLE_MESSAGE_TEMPLATE_TEXT_CONTENT': {
      return state.setIn(['messageTemplates', 'isDisplayContentInHtml'], action.isDisplayContentInHtml);
    }
    case 'FETCH_ACTIVE_VERSION_BUSINESS_HOUR_FULFILLED': {
      return state.updateIn(['businessHoursV2', 'data'], businessHours =>
        businessHours.map(businessHour => {
          return businessHour.update('versions', (versions = List()) => {
            if (action.activeVersions[businessHour.get('id')]) {
              return versions.push(fromJS(action.activeVersions[businessHour.get('id')]));
            } else {
              return versions;
            }
          });
        })
      );
    }
    case 'SET_BUSINESS_HOUR_VERSIONS_AND_DRAFTS': {
      const currentEntity = state.get('currentEntity');
      const selectedEntityId = state.getIn([currentEntity, 'selectedEntityId']);
      const entityIndex = findEntityIndex(state, currentEntity, selectedEntityId);
      if (entityIndex !== -1) {
        return state
          .setIn([currentEntity, 'data', entityIndex, 'versions'], fromJS(action.versions))
          .setIn([currentEntity, 'data', entityIndex, 'items'], fromJS(action.drafts));
      } else {
        return state;
      }
    }
    case 'PUBLISH_BUSINESS_HOURS_V2_DRAFT_FULFILLED': {
      const index = state
        .getIn(['businessHoursV2', 'data'])
        .findIndex(businessHour => businessHour.get('id') === action.entityId);
      if (index !== -1) {
        return state
          .updateIn(['businessHoursV2', 'data', index, 'versions'], (versions = List()) =>
            versions.push(
              fromJS({
                ...action.response.result
              })
            )
          )
          .setIn(['businessHoursV2', 'isPublishingDraft'], false)
          .deleteIn(['businessHoursV2', 'selectedSubEntityId']);
      } else {
        return state;
      }
    }
    case 'PUBLISH_BUSINESS_HOURS_V2_DRAFT_REJECTED':
      return state.setIn(['businessHoursV2', 'isPublishingDraft'], false);
    case 'SET_SELECTED_BUSINESS_HOUR_VERSION': {
      return state.setIn(['businessHoursV2', 'selectedVersion'], action.selectedVersionId);
    }
    case 'PUBLISH_BUSINESS_HOURS_V2_DRAFT':
    case 'SAVE_BEFORE_PUBLISH_BUSINESS_HOURS_V2_DRAFT': {
      return state.setIn(['businessHoursV2', 'isPublishingDraft'], true);
    }
    case 'CREATE_DRAFT_BUSINESS_HOURS_V2': {
      return state.setIn(['businessHoursV2', 'isCreatingDraft'], true);
    }
    case 'CREATE_DRAFT_BUSINESS_HOURS_V2_FULFILLED': {
      const index = state
        .getIn(['businessHoursV2', 'data'])
        .findIndex(businessHour => businessHour.get('id') === action.businessHourId);
      if (index !== -1) {
        return state.update('businessHoursV2', businessHoursV2State =>
          businessHoursV2State
            .updateIn(['data', index, 'items'], (drafts = List()) => drafts.push(fromJS(action.response.result)))
            .set('isCreatingDraft', false)
            .set('creating', false)
            .set('selectedEntityId', action.businessHourId)
            .set('selectedSubEntityId', action.response.result.id)
        );
      } else {
        return state;
      }
    }
    case 'CREATE_DRAFT_BUSINESS_HOURS_V2_REJECTED': {
      return state.setIn(['businessHoursV2', 'isCreatingDraft'], false);
    }
    case 'UPLOAD_LOGO_BRANDING_IMAGE':
    case 'UPLOAD_FAVICON_BRANDING_IMAGE': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
      const imageType = action.type === 'UPLOAD_LOGO_BRANDING_IMAGE' ? 'logo' : 'favicon';
      if (entityIndex !== -1) {
        return state.setIn(
          [action.entityName, 'data', entityIndex, 'dependentEntities', 'branding', `${imageType}Uploading`],
          true
        );
      } else {
        return state;
      }
    }
    case 'UPLOAD_LOGO_BRANDING_IMAGE_REJECTED':
    case 'UPLOAD_FAVICON_BRANDING_IMAGE_REJECTED': {
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
      const imageType = action.type === 'UPLOAD_LOGO_BRANDING_IMAGE_REJECTED' ? 'logo' : 'favicon';
      if (entityIndex !== -1) {
        return state.deleteIn([
          'tenants',
          'data',
          entityIndex,
          'dependentEntities',
          'branding',
          `${imageType}Uploading`
        ]);
      } else {
        return state;
      }
    }
    case 'UPLOAD_LOGO_BRANDING_IMAGE_FULFILLED':
    case 'UPLOAD_FAVICON_BRANDING_IMAGE_FULFILLED': {
      const { result } = action.response;
      const entityIndex = findEntityIndex(state, action.entityName, action.entityId);
      const brandingData = state.getIn(['tenants', 'data', entityIndex, 'dependentEntities', 'branding', 'data']);
      const imageType = action.type === 'UPLOAD_LOGO_BRANDING_IMAGE_FULFILLED' ? 'logo' : 'favicon';
      if (entityIndex !== -1) {
        if (!brandingData || brandingData.size === 0) {
          const brandingObj = {};
          brandingObj[imageType] = result.url;
          return state
            .setIn(['tenants', 'data', entityIndex, 'dependentEntities', 'branding', 'data'], fromJS(brandingObj))
            .deleteIn(['tenants', 'data', entityIndex, 'dependentEntities', 'branding', `${imageType}Uploading`]);
        } else {
          return state
            .setIn(['tenants', 'data', entityIndex, 'dependentEntities', 'branding', 'data', imageType], result.url)
            .deleteIn(['tenants', 'data', entityIndex, 'dependentEntities', 'branding', `${imageType}Uploading`]);
        }
      } else {
        return state;
      }
    }
    case 'RESET_TENANT_BRANDING_TO_DEFAULT': {
      const a = { entityId: action.entityId, entityName: state.get('currentEntity') };
      return setEntityUpdatingHelper(state, a, true);
    }
    case 'RESET_TENANT_BRANDING_TO_DEFAULT_REJECTED': {
      const a = { entityId: action.entityId, entityName: state.get('currentEntity') };
      return setEntityUpdatingHelper(state, a, false);
    }
    case 'CREATE_TENANT_BRANDING_FULFILLED':
    case 'UPDATE_TENANT_BRANDING_FULFILLED':
    case 'RESET_TENANT_BRANDING_TO_DEFAULT_FULFILLED': {
      const { result } = action.response;
      const entityIndex = findEntityIndex(state, 'tenants', action.entityId);
      if (entityIndex !== -1) {
        return state.setIn(['tenants', 'data', entityIndex, 'dependentEntities', 'branding', 'data'], fromJS(result));
      } else {
        return state;
      }
    }
    case 'BRANDING_HAS_BEEN_UPDATED_SUCESSFULLY!':
    case 'BRANDING_HAS_BEEN_RESET_TO_DEFAULT_SUCESSFULLY!': {
      const { result } = action.response;
      if (result.tenantId === state.get('currentTenantId')) {
        return state.updateIn(['branding', 'data'], () => undefined).setIn(['branding', 'isUpdating'], true);
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

// Reducer helper functions

export const setUserExistsInPlatform = (state, action) => {
  let userExistInPlatform = false;
  let userPlatformRoleId = null;
  if (
    action.meta.form === 'users:create' &&
    action.meta.field === 'email' &&
    action.type === '@@redux-form/CHANGE_FULFILLED'
  ) {
    userExistInPlatform = true;
    if (action.response && action.response.result[0]) {
      userPlatformRoleId = action.response.result[0].roleId;
    }
  }
  return state
    .setIn([state.get('currentEntity'), 'userExistInPlatform'], userExistInPlatform)
    .setIn([state.get('currentEntity'), 'userPlatformRoleId'], userPlatformRoleId);
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
