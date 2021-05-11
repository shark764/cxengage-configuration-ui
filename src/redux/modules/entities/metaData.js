import {
  capitalizeFirstLetter,
  camelCaseToKebabCase,
  removeLastLetter,
  camelCaseToRegularForm,
} from 'serenova-js-utils/strings';

/**
 * All the information about an entity that it does not provide about itself
 *
 *  Notes:
 *  You will notice there is an update form and create form dependencies
 *  This is because most of the time they are the same form but there are
 *  times where some fields are permanently set and cannot be changed so below
 *  we allways add both even if they are the same, leave an empty array if not required
 *  as redux observable epic picks this up and converts it to an observable
 *  Also note that if the side panel is dependent on other entities they should be in
 *  the updateFormDependencies
 */

export class EntityMetaData {
  /**
   *
   * @param {string} entityName is the name of the entity matching the url's entity endpoint
   */
  constructor(entityName) {
    this.entityName = entityName;
    this.dependentEntity = '';
    this.subEntityName = '';
    this.bulkEditsAvailable = true;
    this.title = camelCaseToRegularForm(removeLastLetter(entityName));
    this.pageTitle = camelCaseToRegularForm(entityName);
    this.helpLink = '/Help/Content/Home.htm';
    this.betaFeature = false;
    this.confirmationDialog = {
      message: '',
      trueButtonText: '',
      falseButtonText: '',
    };
    this.columns = [];
    /**
     * Form dependencies are what a form needs to work
     * Example: Outbound Identifiers needs to have flow id's and names,
     * so we make sure to grab all flow data first
     */
    this.createFormDependencies = [];
    this.updateFormDependencies = [];
    this.bulkFormDependencies = [];
    this.entityTableFields = [{ label: 'Name', name: 'name' }, { label: 'Description', name: 'description' }];
    this.sidePanelListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Description', name: 'description' }];
    this.modalListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Description', name: 'description' }];
    this.defaultFilters = [];
    this.defaultSorted = [{ id: 'name', alpha: true }];
    this.defaultDependentEntityFilters = [];
    this.defaultAssociationFilters = [];
    this.sdkCall = {
      module: 'entities',
      data: {},
    };
  }

  /**
   * This constructs the data object for the sdk so all you need to do is add the data in the epic
   * @param {string} apiMethod get, create, update, download, upload
   * @param {string} entityType inidcate if this is a 'mainEntity' , a singleMainEntity, or a 'subEntity'
   */
  entityApiRequest(apiMethod, entityType) {
    const mainEntityCommand = `${apiMethod}${capitalizeFirstLetter(this.entityName)}`;
    const mainEntityTopic = `cxengage/entities/${apiMethod}-${camelCaseToKebabCase(this.entityName)}-response`;

    const singleEntityCommand = `${apiMethod}${capitalizeFirstLetter(removeLastLetter(this.entityName))}`;
    const singleEntityTopic = `cxengage/entities/${apiMethod}-${camelCaseToKebabCase(
      removeLastLetter(this.entityName)
    )}-response`;

    const subEntityCommand = `${apiMethod}${capitalizeFirstLetter(removeLastLetter(this.subEntityName))}`;

    const subEntityTopic = `cxengage/entities/${apiMethod}-${camelCaseToKebabCase(
      removeLastLetter(this.subEntityName)
    )}-response`;

    const crudActions = {
      create: 'create',
      get: 'read',
      invite: 'invite',
      update: 'update',
      delete: 'delete',
    };

    if (entityType === 'subEntity') {
      return {
        ...this.sdkCall,
        command: subEntityCommand,
        topic: subEntityTopic,
        crudAction: crudActions[apiMethod],
      };
    } else if (entityType === 'singleMainEntity') {
      return {
        ...this.sdkCall,
        command: singleEntityCommand,
        topic: singleEntityTopic,
        crudAction: crudActions[apiMethod],
      };
    } else {
      return {
        ...this.sdkCall,
        command: mainEntityCommand,
        topic: mainEntityTopic,
        crudAction: crudActions[apiMethod],
      };
    }
  }

  /**
   * Update here is refering to updating a single entity from with a list page
   * When apiMethod is not update..  it would be for adding or removing list items
   * @param {string} apiMethod add, remove, update
   */
  entityListItemApiRequest(apiMethod) {
    if (apiMethod === 'update') {
      return {
        ...this.sdkCall,
        command: `${apiMethod}${capitalizeFirstLetter(removeLastLetter(this.dependentEntity))}`,
        topic: `cxengage/entities/${apiMethod}-${camelCaseToKebabCase(
          removeLastLetter(this.dependentEntity)
        )}-response`,
      };
    } else {
      return {
        ...this.sdkCall,
        command: `${apiMethod}${capitalizeFirstLetter(removeLastLetter(this.dependentEntity))}ListMember`,
        topic: `cxengage/entities/${apiMethod}-${camelCaseToKebabCase(
          removeLastLetter(this.dependentEntity)
        )}-list-member-response`,
      };
    }
  }
}

/**
 * Create the entity objects and add or modify the properties
 * Example: you may want the page title to be different than the entity name
 * entities.entity.pageTitle = 'new page title'
 */

export const listOfEntities = [
  'branding',
  'capacityRules',
  'chatWidgets',
  'dashboards',
  'dataAccessReports',
  'digitalChannelsApps',
  'emailTemplates',
  'groups',
  'historicalReportFolders',
  'identityProviders',
  'interactionMonitoring',
  'agentStateMonitoring',
  'lists',
  'listTypes',
  'messageTemplates',
  'outboundIdentifiers',
  'outboundIdentifierLists',
  'permissions',
  'platformRoles',
  'protectedBranding',
  'reasonLists',
  'roles',
  'skills',
  'standardDashboards',
  'users',
  'reasons',
  'queues',
  'flows',
  'transferLists',
  'dispatchMappings',
  'integrations',
  'logi',
  'dispositions',
  'slas',
  'tenants',
  'flowDebugger',
  'apiKeys',
  'businessHours',
  'dispositionLists',
  'businessHoursV2',
  'customAttributes',
  'integrations',
  'regions',
  'timezones',
  'contactAttributes',
  'contactLayouts',
  'forecastDashboards',
  'capacityRules',
  'whatsappIntegrations',
  'whatsappApps',
  'facebookIntegrations',

  //Hygen-insert-at-end-of-list
];

const entities = {};
listOfEntities.forEach((x) => (entities[x] = new EntityMetaData(x)));

entities.logi.pageTitle = 'New Historical';

// Users
entities.users.betaFeature = true;
entities.users.pageTitle = 'User Management';
entities.users.helpLink = '/Help/Content/Managing%20Users/Adding_users.htm';
entities.users.createFormDependencies.push('roles', 'platformRoles', 'identityProviders');
entities.users.updateFormDependencies.push('roles', 'platformRoles', 'identityProviders', 'capacityRules');
entities.users.bulkFormDependencies.push('identityProviders', 'groups', 'skills', 'platformRoles');
entities.users.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  {
    label: 'Tenant Status',
    name: 'status',
    type: 'select',
    filterOptions: ['accepted', 'pending', 'invited', 'disabled'],
  },
  {
    label: 'Platform Status',
    name: 'invitationStatus',
    type: 'select',
    filterOptions: ['pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only'],
  },
];
entities.users.associations = {
  skills: ['users', 'skills'],
  groups: ['groups', 'users'],
  reasonLists: ['users', 'reasonLists'],
  messageTemplates: ['users', 'messageTemplates'],
  transferLists: ['users', 'transferLists'],
  outboundIdentifierLists: ['users', 'outboundIdentifierLists'],
};
entities.users.columns = [
  { name: 'Name', active: true },
  { name: 'Email', active: true },
  { name: 'External Id', active: true },
  { name: 'Skills', active: true },
  { name: 'Groups', active: true },
  { name: 'Role', active: true },
  { name: 'Presence', active: true },
  { name: 'Platform Status', active: true },
  { name: 'Tenant Status', active: true },
];
entities.users.defaultFilters = [
  { id: 'status', value: 'accepted' },
  { id: 'invitationStatus', value: 'all non-disabled' },
];
entities.users.defaultAssociationFilters = {
  skills: [{ id: 'active', value: 'enabled' }],
  groups: [{ id: 'active', value: 'enabled' }],
  reasonLists: [{ id: 'active', value: 'enabled' }],
  messageTemplates: [{ id: 'active', value: 'enabled' }],
  transferLists: [{ id: 'active', value: 'enabled' }],
  outboundIdentifierLists: [{ id: 'active', value: 'enabled' }],
};

// Skills
entities.skills.betaFeature = true;
entities.skills.pageTitle = 'Skill Management';
entities.skills.helpLink = '/Help/Content/Managing%20Users/Creating_Skills.htm';
entities.skills.updateFormDependencies.push('users');
entities.skills.dependentEntity = 'users';
entities.skills.associations = {
  users: ['users', 'skills'],
  outboundIdentifierLists: ['skills', 'outboundIdentifierLists'],
};
entities.skills.modalListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.skills.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
  },
];
entities.skills.sidePanelListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.skills.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Has Proficiency', active: true },
  { name: 'Status', active: true },
];
entities.skills.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.skills.defaultAssociationFilters = {
  users: [{ id: 'status', value: 'accepted' }, { id: 'invitationStatus', value: 'enabled' }],
  outboundIdentifierLists: [{ id: 'active', value: 'enabled' }],
};

// Groups
entities.groups.betaFeature = true;
entities.groups.pageTitle = 'Group Management';
entities.groups.helpLink = '/Help/Content/Managing%20Users/Creating_Groups.htm';
entities.groups.updateFormDependencies.push('users');
entities.groups.dependentEntity = 'users';
entities.groups.associations = {
  users: ['groups', 'users'],
  outboundIdentifierLists: ['groups', 'outboundIdentifierLists'],
  reasonLists: ['groups', 'reasonLists'],
};
entities.groups.modalListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.groups.outboundIdentifiersFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
];
entities.groups.sidePanelListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.groups.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
  },
];
entities.groups.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
];
entities.groups.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.groups.defaultAssociationFilters = {
  users: [{ id: 'status', value: 'accepted' }, { id: 'invitationStatus', value: 'enabled' }],
  outboundIdentifierLists: [{ id: 'active', value: 'enabled' }],
  reasonLists: [{ id: 'active', value: 'enabled' }],
};

// Generic Lists
entities.lists.bulkEditsAvailable = true;
entities.lists.createFormDependencies.push('listTypes');
entities.lists.subEntityName = 'listItems';
entities.lists.pageTitle = 'Lists';
entities.lists.title = 'List';
entities.lists.helpLink = '/Help/Content/Configuration/Lists/Lists.htm';
entities.lists.columns = [
  { name: 'Name', active: true },
  { name: 'List Type', active: true },
  { name: 'Status', active: true },
];

// Outbound Identifiers
entities.outboundIdentifiers.betaFeature = true;
entities.outboundIdentifiers.helpLink =
  '/Help/Content/Configuration/Outbound-Identifiers/Create-Outbound-Identifiers.htm';
entities.outboundIdentifiers.createFormDependencies.push('flows');
entities.outboundIdentifiers.updateFormDependencies.push('flows');
entities.outboundIdentifiers.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Value', active: true },
  { name: 'channelType', active: true },
  { name: 'flowId', active: false },
  { name: 'Status', active: true },
];
entities.outboundIdentifiers.defaultFilters = [{ id: 'active', value: 'enabled' }];

// Outbound Identifiers Lists
entities.outboundIdentifierLists.betaFeature = true;
entities.outboundIdentifierLists.helpLink = '/Help/Content/Configuration/Outbound-Identifiers/Create-List.htm';
entities.outboundIdentifierLists.updateFormDependencies.push('outboundIdentifiers');
entities.outboundIdentifierLists.dependentEntity = 'outboundIdentifiers';
entities.outboundIdentifierLists.modalListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Value', name: 'value' },
  { label: 'Channel Type', name: 'channelType' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
  },
];
entities.outboundIdentifierLists.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
  },
];
entities.outboundIdentifierLists.sidePanelListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Value', name: 'value' },
  { label: 'Channel Type', name: 'channelType' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
  },
];
entities.outboundIdentifierLists.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
];
entities.outboundIdentifierLists.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.outboundIdentifierLists.defaultDependentEntityFilters = [{ id: 'active', value: 'enabled' }];

// Roles
entities.roles.bulkEditsAvailable = false;
entities.roles.betaFeature = true;
entities.roles.pageTitle = 'Role Management';
entities.roles.helpLink = '/Help/Content/Managing%20Users/Adding_roles.htm';
entities.roles.updateFormDependencies.push('permissions', 'platformRoles');
entities.roles.dependentEntity = 'permissions';
entities.roles.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Permissions', active: true },
  { name: 'Status', active: true },
];

//Silent Monitoring
entities.interactionMonitoring.bulkEditsAvailable = false;
entities.interactionMonitoring.betaFeature = true;
entities.interactionMonitoring.pageTitle = 'Interaction Monitoring';
entities.interactionMonitoring.helpLink =
  '/Help/Content/Monitoring/Silent%20Monitoring/Silent-monitoring.htm?Highlight=silent%20monitoring';
entities.interactionMonitoring.defaultSorted = [];
entities.interactionMonitoring.columns = [
  { name: 'InteractionId', active: true },
  { name: 'Agent', active: true },
  { name: 'CustomerId', active: true },
  { name: 'ContactPoint', active: true },
  { name: 'Flow', active: true },
  { name: 'Channel', active: true },
  { name: 'Direction', active: true },
  { name: 'Presence State', active: false },
  { name: 'Start Date', active: false },
  { name: 'StartTime', active: true },
  { name: 'ElapsedTime', active: true },
  { name: 'Monitoring', active: true },
  { name: 'Groups', active: false },
  { name: 'Skills', active: false },
];

//Agent State Monitoring
entities.agentStateMonitoring.bulkEditsAvailable = true;
entities.agentStateMonitoring.betaFeature = true;
entities.agentStateMonitoring.pageTitle = 'Agent State Monitoring';
entities.agentStateMonitoring.helpLink = '/Help/Content/Reporting/Realtime/Agent-State-Monitoring.htm';
entities.agentStateMonitoring.defaultSorted = [];
entities.agentStateMonitoring.columns = [
  { name: 'Channel', active: true },
  { name: 'Agent', active: true },
  { name: 'Groups', active: false },
  { name: 'Skills', active: false },
  { name: 'Work Mode', active: true },
  { name: 'Presence State', active: true },
  { name: 'Reason Code', active: false },
  { name: 'Time in Presence State', active: true },
  { name: 'Offered', active: false },
  { name: 'Accepted', active: false },
  { name: 'Rejected', active: false },
  { name: 'Accepted Rate', active: false },
  { name: 'Away Time', active: false },
  { name: 'Away Rate', active: false },
];

// Email Templates
entities.emailTemplates.bulkEditsAvailable = false;
entities.emailTemplates.pageTitle = 'User Management Emails';
entities.emailTemplates.helpLink = '/Help/Content/Configuration/Email_Templates/Updating_Email_Templates.htm';
entities.emailTemplates.columns = [{ name: 'Name', active: true }, { name: 'Description', active: true }];
entities.emailTemplates.hideActiveToggle = true;

// Chat Widgets
entities.chatWidgets.bulkEditsAvailable = false;
entities.chatWidgets.columns = [{ name: 'Name', active: true }, { name: 'Description', active: true }];
entities.chatWidgets.sdkCall.path = ['web-integrations'];
entities.chatWidgets.createFormDependencies.push('digitalChannelsApps');
entities.chatWidgets.updateFormDependencies.push('digitalChannelsApps');
entities.chatWidgets.hideActiveToggle = true;

// Digital Channels Apps
// These don't have a config ui page, but are a dependency of chat widgets and facebook integrations
entities.digitalChannelsApps.sdkCall.path = ['digital-channels-app'];

// Presence Reasons Lists
entities.reasonLists.bulkEditsAvailable = true;
entities.reasonLists.pageTitle = 'Presence Reason List Management';
entities.reasonLists.title = 'Presence Reason List';
entities.reasonLists.helpLink = '/Help/Content/Managing%20Users/Presence%20Reasons/Creating_Presence_Reason_Lists.htm';
entities.reasonLists.dependentEntity = 'reasons';
entities.reasonLists.defaultFilters = [];
entities.reasonLists.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'External Id', active: true },
  { name: 'Shared', active: true },
  { name: 'Is Default', active: true },
  { name: 'Status', active: true },
];
entities.reasonLists.customSortMethod = function(a, b) {
  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
};
entities.reasonLists.memberListTableFields = [
  {
    label: 'Name',
    name: 'name',
    customSortMethod: entities.reasonLists.customSortMethod,
  },
  {
    label: 'Description',
    name: 'description',
    customSortMethod: entities.reasonLists.customSortMethod,
  },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
    customSortMethod: entities.reasonLists.customSortMethod,
  },
];

// Message Templates
entities.messageTemplates.bulkEditsAvailable = true;
entities.messageTemplates.pageTitle = 'Message Templates';
entities.messageTemplates.helpLink = '/Help/Content/Configuration/Messaging_Templates/Creating_Messaging_Templates.htm';
entities.messageTemplates.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Type', active: true },
  { name: 'Channels', active: true },
  { name: 'Status', active: true },
];
entities.messageTemplates.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
  },
];
entities.messageTemplates.dependentEntity = 'messageTemplate';

// Transfer Lists
entities.transferLists.bulkEditsAvailable = true;
entities.transferLists.pageTitle = 'Transfer Lists Management';
entities.transferLists.helpLink = '/Help/Content/Configuration/Transfer_Lists/Creating_Transfer_Lists.htm';
entities.transferLists.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
];
entities.transferLists.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled'],
  },
];
entities.transferLists.dependentEntity = 'queues';

// Data Access Report
entities.dataAccessReports.bulkEditsAvailable = false;
entities.dataAccessReports.title = 'Access Controlled Report';
entities.dataAccessReports.pageTitle = 'Access Controlled Reports';
entities.dataAccessReports.helpLink = '/Help/Content/Reporting/Access_Controlled_Reports/Create.htm';
entities.dataAccessReports.createFormDependencies = [
  ...entities.dataAccessReports.createFormDependencies,
  'users',
  'historicalReportFolders',
  // TODO: uncomment 'standardDashboards' when API is reachable.
  // Required for https://liveops.atlassian.net/browse/CXV1-16111
  // 'standardDashboards',
  'dashboards',
];
entities.dataAccessReports.updateFormDependencies = [
  ...entities.dataAccessReports.updateFormDependencies,
  'users',
  'historicalReportFolders',
  'dashboards',
  // TODO: uncomment 'standardDashboards' when API is reachable.
  // Required for https://liveops.atlassian.net/browse/CXV1-16111
  // 'standardDashboards',
  'roles',
  'permissions',
];
entities.dataAccessReports.dependentEntity = 'users';
entities.dataAccessReports.modalListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  {
    label: 'Tenant Status',
    name: 'status',
    type: 'select',
    filterOptions: ['accepted', 'pending', 'invited', 'disabled'],
  },
  {
    label: 'Platform Status',
    name: 'invitationStatus',
    type: 'select',
    filterOptions: ['pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only'],
  },
];
entities.dataAccessReports.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.dataAccessReports.defaultDependentEntityFilters = [
  { id: 'invitationStatus', value: 'enabled' },
  { id: 'status', value: 'accepted' },
];
entities.dataAccessReports.sidePanelListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  {
    label: 'Tenant Status',
    name: 'status',
    type: 'select',
    filterOptions: ['accepted', 'pending', 'invited', 'disabled'],
  },
  {
    label: 'Platform Status',
    name: 'invitationStatus',
    type: 'select',
    filterOptions: ['pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only'],
  },
];
entities.dataAccessReports.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Report Type', active: true },
  { name: 'Status', active: true },
];
// TODO: Remove this array since this data is going to be
// retrieved from API.
// Required for https://liveops.atlassian.net/browse/CXV1-16111
entities.dataAccessReports.standardDashboards = [
  { label: 'Agent Details Table', value: '8e7c8f83-4ed4-4ab9-942e-dbc66bdb016b' },
  { label: 'Agent State Table', value: 'b7486897-337d-4e1b-a3c9-1353ce6a4738' },
  { label: 'Interactions Completed Table', value: 'e19680cb-bee2-422b-961d-09a5479ec466' },
  { label: 'Interactions Dashboard', value: '26a076ea-7dd7-4a61-bbdf-f2734a7a3b28' },
  { label: 'Interactions In Conversation Table', value: '5bceb39e-a4f9-41f1-b56f-8ecf0daf2844' },
  { label: 'Interactions In IVR Table', value: 'bed51612-8168-4488-99df-2100d66f8095' },
  { label: 'Interactions In Queue Table', value: 'b00de9cc-645e-48c1-9248-2270224fc054' },
  { label: 'Overview Dashboard', value: '1a861841-628b-4e4b-892c-5fbb178dfd3a' },
  { label: 'Queues Dashboard', value: '5f08bfde-3a79-4aa3-8586-42a1a03ffa90' },
  { label: 'Queue Details Table', value: '1c6a29a9-6020-4543-82f8-490728e53876' },
  { label: 'Resources Dashboard', value: '0ad70ddc-d3d4-458e-8019-20fc46122a52' },
];

// Reasons
entities.reasons.bulkEditsAvailable = true;
entities.reasons.pageTitle = 'Presence Reasons';
entities.reasons.title = 'Presence Reason';
entities.reasons.helpLink = '/Help/Content/Managing%20Users/Presence%20Reasons/Creating_Reasons.htm';
entities.reasons.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'External Id', active: true },
  { name: 'Shared', active: true },
  { name: 'Status', active: true },
];

// Queues
entities.queues.bulkEditsAvailable = false;
entities.queues.pageTitle = 'Queue Management';
entities.queues.helpLink = '/Help/Content/Managing%20Flows/Create_queue.htm';
entities.queues.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Active Queue', active: true },
  { name: 'Status', active: true },
];

// Flows
entities.flows.bulkEditsAvailable = true;
entities.flows.betaFeature = true;
entities.flows.pageTitle = 'Flow Management';
entities.flows.helpLink = '/Help/Content/Managing%20Flows/Flow_overview.htm';
entities.flows.dependentEntity = 'drafts';
entities.flows.updateFormDependencies.push('users');
entities.flows.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Active Flow', active: true },
  { name: 'Status', active: true },
];
entities.flows.membersTableFields = {
  versions: [
    {
      label: 'Version',
      name: 'numericOrderVersion',
      customSortMethod: function(a, b) {
        a = parseInt(a, 10);
        b = parseInt(b, 10);
        if (a === b) {
          return 0;
        }
        return a > b ? 1 : -1;
      },
      customWidth: 35,
    },
    { label: 'Name', name: 'name' },
    { label: 'Created On', name: 'created', format: 'datetime' },
  ],
  drafts: [{ label: 'Name', name: 'name' }, { label: 'Created On', name: 'created', format: 'datetime' }],
};

// Dispatch Mappings
entities.dispatchMappings.bulkEditsAvailable = true;
entities.dispatchMappings.pageTitle = 'Dispatch Mappings Management';
entities.dispatchMappings.helpLink = '/Help/Content/Managing%20Flows/Dispatch_mapping.htm';
entities.dispatchMappings.updateFormDependencies.push('flows', 'integrations');
entities.dispatchMappings.createFormDependencies.push('flows', 'integrations');
entities.dispatchMappings.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Value', active: true },
  { name: 'Interaction Field', active: true },
  { name: 'Channel Type', active: true },
  { name: 'Status', active: true },
  { name: 'Flow', active: true },
];
entities.dispatchMappings.defaultFilters = [{ id: 'active', value: 'enabled' }];

// Dispositions
entities.dispositions.pageTitle = 'Disposition Management';
entities.dispositions.helpLink = '/Help/Content/Managing%20Flows/Dispositions/Creating_Dispositions.htm';
entities.dispositions.bulkEditsAvailable = true;
entities.dispositions.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'External Id', active: true },
  { name: 'Shared', active: true },
  { name: 'Status', active: true },
];

// Slas (Replacement for Custom-Metrics)
entities.slas.bulkEditsAvailable = false;
entities.slas.pageTitle = 'Statistics Management';
entities.slas.title = 'SLA';
entities.slas.helpLink = '/Help/Content/Configuration/Statistics_Management/About_Statistics_Management.htm';
entities.slas.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Active Sla', active: true },
  { name: 'Status', active: true },
];
entities.slas.dependentEntity = 'versions';
entities.slas.membersTableFields = {
  versions: [
    {
      label: 'Version',
      name: 'numericOrderVersion',
      customSortMethod: function(a, b) {
        a = parseInt(a, 10);
        b = parseInt(b, 10);
        if (a === b) {
          return 0;
        }
        return a > b ? 1 : -1;
      },
      customWidth: 35,
    },
    { label: 'Name', name: 'versionName' },
    { label: 'Description', name: 'description' },
    { label: 'Created On', name: 'created', format: 'datetime' },
  ],
};
entities.slas.defaultFilters = [{ id: 'active', value: 'enabled' }];

//  flowDebugger
entities.flowDebugger.pageTitle = 'Flow Debug Logs';

// Api Key
entities.apiKeys.pageTitle = 'Api Key Management';
entities.apiKeys.helpLink = '/Help/Content/Managing%20ApiKeys/Creating_ApiKeys.htm';
entities.apiKeys.bulkEditsAvailable = true;
entities.apiKeys.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
  { name: 'Role', active: true },
];
entities.apiKeys.defaultFilters = [{ id: 'active', value: 'enabled' }];

// Business Hours
entities.businessHours.pageTitle = 'Business Hours Management';
entities.businessHours.helpLink = '/Help/Content/Configuration/Business%20Hours/Business_Hours.htm';
entities.businessHours.subEntityName = 'exceptions';
entities.businessHours.daysInitials = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
entities.businessHours.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
  { name: 'Timezone', active: true },
];
entities.businessHours.membersTableFields = {
  exceptions: [
    { label: 'Date', name: 'date' },
    { label: 'Description', name: 'description' },
    { label: 'Start', name: 'startTime' },
    { label: 'End', name: 'endTime' },
  ],
};
entities.businessHours.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.businessHours.createFormDependencies.push('timezones');
entities.businessHours.updateFormDependencies.push('timezones');

// Tenants
entities.tenants.pageTitle = 'Tenants Management';
entities.tenants.helpLink = '/Help/Content/Configuration/Creating_Tenants.htm';
entities.tenants.bulkEditsAvailable = true;
entities.tenants.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Identifier', active: true },
  { name: 'Parent Tenant', active: true },
  { name: 'Status', active: true },
];
entities.tenants.createFormDependencies.push('users', 'timezones', 'regions');
entities.tenants.updateFormDependencies.push(
  'users',
  'integrations',
  'slas',
  'identityProviders',
  'branding',
  'regions',
  'timezones'
);

//Identity Providers
entities.identityProviders.pageTitle = 'Identity Providers';
entities.identityProviders.helpLink = '/Help/Content/Configuration/SSO/IdentityProviders.htm';
entities.identityProviders.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
];
entities.identityProviders.bulkEditsAvailable = true;
entities.identityProviders.sdkCall.path = ['identity-providers'];
entities.identityProviders.idpConfigInfoTypes = [
  { label: 'URL', value: 'url' },
  { label: 'XML File', value: 'xml' },
  { label: 'XML Direct Input', value: 'xmlDirectInput' },
  { label: 'Shared Access Code', value: 'sharedIdentityProviderLinkId' },
];

// Disposition Lists
entities.dispositionLists.pageTitle = 'Disposition List Management';
entities.dispositionLists.helpLink = '/Help/Content/Managing%20Flows/Dispositions/Creating_Disposition_Lists.htm';
entities.dispositionLists.dependentEntity = 'dispositions';
entities.dispositionLists.bulkEditsAvailable = true;
entities.dispositionLists.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'External Id', active: true },
  { name: 'Shared', active: true },
  { name: 'Status', active: true },
];

// Business Hours V2
entities.businessHoursV2.pageTitle = 'Business Hours Management';
// We overwrite the title of the entity in here by setting the title attribute "by hand"
entities.businessHoursV2.title = 'Business Hour';
entities.businessHoursV2.helpLink = '/Help/Content/Configuration/Business%20Hours/Business_Hours.htm';
// drafts and versions have the same schema but what we create from UI are drafts and what we publish are versions
entities.businessHoursV2.subEntityName = 'drafts';
entities.businessHoursV2.columns = [
  { name: 'Name', active: true },
  { name: 'Active Business Hour', active: true },
  { name: 'Description', active: true },
  { name: 'Timezone2', active: true, customName: 'Timezone' },
  { name: 'Status', active: true },
  { name: 'Shared2', active: true, customName: 'Shared' },
];
entities.businessHoursV2.membersTableFields = {
  drafts: [
    { label: 'Version', name: 'version' },
    { label: 'Name', name: 'name' },
    { label: 'Timezone', name: 'timezone' },
    { label: 'Created By', name: 'createdByName' },
    { label: 'Created On', name: 'created', format: 'datetime' },
  ],
};
entities.businessHoursV2.sdkCall.path = ['business-hours'];
entities.businessHoursV2.sdkCall.apiVersion = 'v2';
entities.businessHoursV2.createFormDependencies.push('timezones');
entities.businessHoursV2.updateFormDependencies.push('timezones');

// Integrations
entities.integrations.pageTitle = 'Integration Management';
entities.integrations.helpLink = '/Help/Content/Configuration/Integrations/Creating_Integrations.htm';
entities.integrations.dependentEntity = 'listeners';
entities.integrations.columns = [
  { name: 'Type', active: true },
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
];
entities.integrations.defaultFilters = [];
entities.integrations.membersTableFields = {
  listeners: [
    { label: 'Name', name: 'name' },
    { label: 'Status', name: 'active', type: 'select', filterOptions: ['enabled', 'disabled'] },
    { label: 'Created On', name: 'created', format: 'datetime' },
  ],
  globalDialParams: [{ label: 'Key', name: 'key' }, { label: 'Value', name: 'value' }],
};

// Custom Attributes
entities.customAttributes.pageTitle = 'Custom Attributes Management';
entities.customAttributes.helpLink =
  '/Help/Content/Managing%20Flows/Custom%20Interaction%20Attributes/About-Custom-Attributes.htm';
entities.customAttributes.bulkEditsAvailable = true;
entities.customAttributes.columns = [
  { name: 'Attribute Identifier', active: true },
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Realtime Reporting', active: true },
  { name: 'Historical Reporting', active: true },
  { name: 'Status', active: true },
];
entities.customAttributes.defaultFilters = [{ id: 'active', value: 'enabled' }];

// Contact Attributes
entities.contactAttributes.pageTitle = 'Contact Attributes';
entities.contactAttributes.helpLink = '/Help/Content/Configuration/Contact_Attributes.htm';
entities.contactAttributes.sdkCall.path = ['contacts/attributes'];
entities.contactAttributes.bulkEditsAvailable = true;
entities.contactAttributes.columns = [
  { name: 'Attribute', active: true },
  { name: 'Label', active: true },
  { name: 'Type', active: true },
  { name: 'Default', active: true },
  { name: 'Mandatory', active: true },
  { name: 'Status', active: true },
];
entities.contactAttributes.customColumnStyle =
  '.rt-tr-group {height:inherit !important; max-height:inherit !important;} .rt-td {align-self: center}';

// Contact Layouts
entities.contactLayouts.bulkEditsAvailable = false;
entities.contactLayouts.sdkCall.path = ['contacts/layouts'];
entities.contactLayouts.pageTitle = 'Contact Layouts Management';
entities.contactLayouts.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.contactLayouts.helpLink = '/Help/Content/Configuration/ContactLayouts.htm';
entities.contactLayouts.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true },
];

// Forecast Dashboards
entities.forecastDashboards.pageTitle = 'Forecasting';
entities.forecastDashboards.helpLink = '';

// Capacity Rules
entities.capacityRules.bulkEditsAvailable = false;
entities.capacityRules.pageTitle = 'Capacity Rules Management';
entities.capacityRules.helpLink = '/Help/Content/Managing%20Users/Capacity_Rules/Creating_Capacity_Rules.htm';
entities.capacityRules.subEntityName = 'versions';
entities.capacityRules.columns = [
  { name: 'Name', active: true },
  { name: 'activeVersionCapacityRule', active: true, customName: 'Active Version' },
  { name: 'Status', active: true },
];
entities.capacityRules.membersTableFields = [
  {
    label: 'Version',
    name: 'numericOrderVersion',
    messageId: 'capacityRules.details.version',
    customSortMethod: function(a, b) {
      a = parseInt(a, 10);
      b = parseInt(b, 10);
      if (a === b) {
        return 0;
      }
      return a > b ? 1 : -1;
    },
    customWidth: 35,
  },
  {
    label: 'Name',
    messageId: 'identityProviders.details.name',
    name: 'name',
  },
  {
    label: 'Created On',
    messageId: 'tables.header.createdOnColumn',
    name: 'created',
    format: 'datetime',
  },
];

// Whatsapp Integrations
entities.whatsappIntegrations.pageTitle = 'Whatsapp Integrations Management';
entities.whatsappIntegrations.helpLink =
  '/Help/Content/Managing%20WhatsappIntegrations/Creating_WhatsappIntegrations.htm';
entities.whatsappIntegrations.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Disconnect Minutes', active: true },
  { name: 'Status', active: true },
];
entities.whatsappIntegrations.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.whatsappIntegrations.sdkCall.path = ['whatsapp-integrations'];
entities.whatsappIntegrations.createFormDependencies.push('whatsappApps');
entities.whatsappIntegrations.updateFormDependencies.push('whatsappApps', 'digitalChannelsApps');

// Whatsapp Apps
entities.whatsappApps.sdkCall.path = ['whatsapp-apps'];

// Facebook Integrations
entities.facebookIntegrations.bulkEditsAvailable = false;
entities.facebookIntegrations.pageTitle = 'Facebook Integrations Management';
entities.facebookIntegrations.helpLink =
  '/Help/Content/Managing%20FacebookIntegrations/Creating_FacebookIntegrations.htm';
entities.facebookIntegrations.columns = [{ name: 'Name', active: true }, { name: 'Description', active: true }];
entities.facebookIntegrations.sdkCall.path = ['facebook-integrations'];
entities.facebookIntegrations.hideActiveToggle = true;
entities.facebookIntegrations.createFormDependencies.push('digitalChannelsApps');
entities.facebookIntegrations.updateFormDependencies.push('digitalChannelsApps');

//Hygen-insert-new-entity-configuration

// Birst
entities.birst = { pageTitle: 'Enable Birst' };

export const entitiesMetaData = entities;
