import {
  capitalizeFirstLetter,
  camelCaseToKebabCase,
  removeLastLetter,
  camelCaseToRegularForm
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
      falseButtonText: ''
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
      data: {}
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
      update: 'update',
      delete: 'delete'
    };

    if (entityType === 'subEntity') {
      return {
        ...this.sdkCall,
        command: subEntityCommand,
        topic: subEntityTopic,
        crudAction: crudActions[apiMethod]
      };
    } else if (entityType === 'singleMainEntity') {
      return {
        ...this.sdkCall,
        command: singleEntityCommand,
        topic: singleEntityTopic,
        crudAction: crudActions[apiMethod]
      };
    } else {
      return {
        ...this.sdkCall,
        command: mainEntityCommand,
        topic: mainEntityTopic,
        crudAction: crudActions[apiMethod]
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
        topic: `cxengage/entities/${apiMethod}-${camelCaseToKebabCase(removeLastLetter(this.dependentEntity))}-response`
      };
    } else {
      return {
        ...this.sdkCall,
        command: `${apiMethod}${capitalizeFirstLetter(removeLastLetter(this.dependentEntity))}ListMember`,
        topic: `cxengage/entities/${apiMethod}-${camelCaseToKebabCase(
          removeLastLetter(this.dependentEntity)
        )}-list-member-response`
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
  'emailTemplates',
  'groups',
  'historicalReportFolders',
  'identityProviders',
  'interactionMonitoring',
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
  'transferLists',
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
  'tenants'
  //Hygen-insert-at-end-of-list
];

const entities = {};
listOfEntities.forEach(x => (entities[x] = new EntityMetaData(x)));

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
    filterOptions: ['accepted', 'pending', 'invited', 'disabled']
  },
  {
    label: 'Platform Status',
    name: 'invitationStatus',
    type: 'select',
    filterOptions: ['pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only']
  }
];
entities.users.associations = {
  skills: ['users', 'skills'],
  groups: ['groups', 'users'],
  reasonLists: ['users', 'reasonLists'],
  messageTemplates: ['users', 'messageTemplates'],
  transferLists: ['users', 'transferLists'],
  outboundIdentifierLists: ['users', 'outboundIdentifierLists']
};
entities.users.columns = [
  { name: 'Name', active: true },
  { name: 'Email', active: true },
  { name: 'External Id', active: true },
  // TODO: Skills and Groups require a special column to work
  // {name: 'Skills', active: true},
  // {name: 'Groups', active: true},
  { name: 'Role', active: true },
  { name: 'Presence', active: true },
  { name: 'Platform Status', active: true },
  { name: 'Tenant Status', active: true }
];
entities.users.defaultFilters = [
  { id: 'status', value: 'accepted' },
  { id: 'invitationStatus', value: 'all non-disabled' }
];
entities.users.defaultAssociationFilters = {
  skills: [{ id: 'active', value: 'enabled' }],
  groups: [{ id: 'active', value: 'enabled' }],
  reasonLists: [{ id: 'active', value: 'enabled' }],
  messageTemplates: [{ id: 'active', value: 'enabled' }],
  transferLists: [{ id: 'active', value: 'enabled' }],
  outboundIdentifierLists: [{ id: 'active', value: 'enabled' }]
};

// Skills
entities.skills.betaFeature = true;
entities.skills.pageTitle = 'Skill Management';
entities.skills.helpLink = '/Help/Content/Managing%20Users/Creating_Skills.htm';
entities.skills.updateFormDependencies.push('users');
entities.skills.dependentEntity = 'users';
entities.skills.associations = {
  users: ['users', 'skills'],
  outboundIdentifierLists: ['skills', 'outboundIdentifierLists']
};
entities.skills.modalListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.skills.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled']
  }
];
entities.skills.sidePanelListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.skills.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Has Proficiency', active: true },
  { name: 'Status', active: true }
];
entities.skills.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.skills.defaultAssociationFilters = {
  users: [{ id: 'status', value: 'accepted' }, { id: 'invitationStatus', value: 'enabled' }],
  outboundIdentifierLists: [{ id: 'active', value: 'enabled' }]
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
  reasonLists: ['groups', 'reasonLists']
};
entities.groups.modalListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.groups.outboundIdentifiersFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' }
];
entities.groups.sidePanelListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Email', name: 'email' }];
entities.groups.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled']
  }
];
entities.groups.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true }
];
entities.groups.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.groups.defaultAssociationFilters = {
  users: [{ id: 'status', value: 'accepted' }, { id: 'invitationStatus', value: 'enabled' }],
  outboundIdentifierLists: [{ id: 'active', value: 'enabled' }],
  reasonLists: [{ id: 'active', value: 'enabled' }]
};

// Generic Lists
entities.lists.bulkEditsAvailable = false;
entities.lists.createFormDependencies.push('listTypes');
entities.lists.subEntityName = 'listItems';
entities.lists.helpLink = '/Help/Content/Configuration/Lists/Lists.htm';
entities.lists.columns = [
  { name: 'Name', active: true },
  { name: 'List Type', active: true },
  { name: 'Status', active: true }
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
  { name: 'Status', active: true }
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
    filterOptions: ['enabled', 'disabled']
  }
];
entities.outboundIdentifierLists.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled']
  }
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
    filterOptions: ['enabled', 'disabled']
  }
];
entities.outboundIdentifierLists.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true }
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
  { name: 'Permissions', active: true }
];

//Silent Monitoring
entities.interactionMonitoring.bulkEditsAvailable = false;
entities.interactionMonitoring.betaFeature = true;
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
  { name: 'Skills', active: false }
];

// Email Templates
entities.emailTemplates.bulkEditsAvailable = false;
entities.emailTemplates.pageTitle = 'User Management Emails';
entities.emailTemplates.helpLink = '/Help/Content/Configuration/Email_Templates/Updating_Email_Templates.htm';
entities.emailTemplates.columns = [{ name: 'Name', active: true }, { name: 'Description', active: true }];

// Chat Widgets
entities.chatWidgets.bulkEditsAvailable = false;
entities.chatWidgets.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true }
];

// Presence Reasons Lists
entities.reasonLists.bulkEditsAvailable = false;
entities.reasonLists.pageTitle = 'Presence Reason List Management';
entities.reasonLists.title = 'Presence Reason List';
entities.reasonLists.helpLink = '/Help/Content/Managing%20Users/Presence%20Reasons/Creating_Presence_Reason_Lists.htm';
entities.reasonLists.dependentEntity = 'reasons';
entities.reasonLists.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.reasonLists.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'External Id', active: true },
  { name: 'Shared', active: true },
  { name: 'Is Default', active: true },
  { name: 'Status', active: true }
];
entities.reasonLists.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled']
  }
];

// Message Templates
entities.messageTemplates.bulkEditsAvailable = false;
entities.messageTemplates.pageTitle = 'Message Templates';
entities.messageTemplates.helpLink = '/Help/Content/Configuration/Messaging_Templates/Creating_Messaging_Templates.htm';
entities.messageTemplates.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Type', active: true },
  { name: 'Channels', active: true },
  { name: 'Status', active: true }
];
entities.messageTemplates.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled']
  }
];

// Transfer Lists
entities.transferLists.bulkEditsAvailable = false;
entities.transferLists.pageTitle = 'Transfer Lists Management';
entities.transferLists.helpLink = '/Help/Content/Configuration/Transfer_Lists/Creating_Transfer_Lists.htm';
entities.transferLists.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true }
];
entities.transferLists.memberListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  {
    label: 'Status',
    name: 'active',
    type: 'select',
    filterOptions: ['enabled', 'disabled']
  }
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
  'dashboards'
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
  'permissions'
];
entities.dataAccessReports.dependentEntity = 'users';
entities.dataAccessReports.modalListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  {
    label: 'Tenant Status',
    name: 'status',
    type: 'select',
    filterOptions: ['accepted', 'pending', 'invited', 'disabled']
  },
  {
    label: 'Platform Status',
    name: 'invitationStatus',
    type: 'select',
    filterOptions: ['pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only']
  }
];
entities.dataAccessReports.defaultFilters = [{ id: 'active', value: 'enabled' }];
entities.dataAccessReports.defaultDependentEntityFilters = [
  { id: 'invitationStatus', value: 'enabled' },
  { id: 'status', value: 'accepted' }
];
entities.dataAccessReports.sidePanelListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  {
    label: 'Tenant Status',
    name: 'status',
    type: 'select',
    filterOptions: ['accepted', 'pending', 'invited', 'disabled']
  },
  {
    label: 'Platform Status',
    name: 'invitationStatus',
    type: 'select',
    filterOptions: ['pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only']
  }
];
entities.dataAccessReports.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Report Type', active: true },
  { name: 'Status', active: true }
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
  { label: 'Resources Dashboard', value: '0ad70ddc-d3d4-458e-8019-20fc46122a52' }
];

// Reasons
entities.reasons.bulkEditsAvailable = false;
entities.reasons.pageTitle = 'Presence Reasons';
entities.reasons.title = 'Presence Reason';
entities.reasons.helpLink = '/Help/Content/Managing%20Users/Presence%20Reasons/Creating_Reasons.htm';
entities.reasons.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'External Id', active: true },
  { name: 'Shared', active: true },
  { name: 'Status', active: true }
];

// Queues
entities.queues.bulkEditsAvailable = false;
entities.queues.pageTitle = 'Queue Management';
entities.queues.helpLink = '/Help/Content/Managing%20Flows/Create_queue.htm';
entities.queues.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Active Queue', active: true },
  { name: 'Status', active: true }
];

// Flows
entities.flows.bulkEditsAvailable = false;
entities.flows.betaFeature = true;
entities.flows.pageTitle = 'Flow Management';
entities.flows.helpLink = '/Help/Content/Managing%20Flows/Flow_overview.htm';
entities.flows.dependentEntity = 'drafts';
entities.flows.updateFormDependencies.push('users');
entities.flows.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Active Flow', active: true },
  { name: 'Status', active: true }
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
      customWidth: 35
    },
    { label: 'Name', name: 'name' },
    { label: 'Created On', name: 'created', format: 'datetime' }
  ],
  drafts: [{ label: 'Name', name: 'name' }, { label: 'Created On', name: 'created', format: 'datetime' }]
};

// Dispatch Mappings
entities.dispatchMappings.bulkEditsAvailable = false;
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
  { name: 'Flow', active: true }
];
entities.dispatchMappings.defaultFilters = [{ id: 'active', value: 'enabled' }];

// Dispositions
entities.dispositions.pageTitle = 'Dispositions Management';
entities.dispositions.helpLink = '/Help/Content/Managing%20Dispositions/Creating_Dispositions.htm';
entities.dispositions.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'External Id', active: true },
  { name: 'Shared', active: true },
  { name: 'Status', active: true }
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
  { name: 'Status', active: true }
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
      customWidth: 35
    },
    { label: 'Name', name: 'versionName' },
    { label: 'Description', name: 'description' },
    { label: 'Created On', name: 'created', format: 'datetime' }
  ]
};
entities.slas.defaultFilters = [{ id: 'active', value: 'enabled' }];

//Hygen-insert-new-entity-configuration

export const entitiesMetaData = entities;
