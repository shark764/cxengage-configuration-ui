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
    this.entityTableFields = [{ label: 'Name', name: 'name' }, { label: 'Description', name: 'description' }];
    this.sidePanelListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Description', name: 'description' }];
    this.modalListTableFields = [{ label: 'Name', name: 'name' }, { label: 'Description', name: 'description' }];
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

    if (entityType === 'subEntity') {
      return {
        ...this.sdkCall,
        command: subEntityCommand,
        topic: subEntityTopic
      };
    } else if (entityType === 'singleMainEntity') {
      return {
        ...this.sdkCall,
        command: singleEntityCommand,
        topic: singleEntityTopic
      };
    } else {
      return {
        ...this.sdkCall,
        command: mainEntityCommand,
        topic: mainEntityTopic
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
  bulkEditsAvailable() {
    return this.entityName !== 'emailTemplates' && this.entityName !== 'roles' && location.hash.includes('alpha');
  }
}

/**
 * Create the entity objects and add or modify the properties
 * Example: you may want the page title to be different than the entity name
 * entities.entity.pageTitle = 'new page title'
 */

export const listOfEntities = [
  'branding',
  'chatWidgets',
  'protectedBranding',
  'flows',
  'listTypes',
  'lists',
  'emailTemplates',
  'outboundIdentifiers',
  'outboundIdentifierLists',
  'customMetrics',
  'groups',
  'skills',
  'roles',
  'permissions',
  'interactionMonitoring',
  'users'
  //Hygen-insert-at-end-of-list
];

const entities = {};
listOfEntities.forEach(x => (entities[x] = new EntityMetaData(x)));

// Users
entities.users.columns = [
  { name: 'First Name', active: true },
  { name: 'Last Name', active: true },
  { name: 'Email', active: true },
  { name: 'External Id', active: true },
  // TODO: Skills and Groups require a special column to work
  // {name: 'Skills', active: true},
  // {name: 'Groups', active: true},
  { name: 'Role', active: true },
  { name: 'Presence', active: true },
  { name: 'Invitation Status', active: true },
  { name: 'Platform Status', active: true }
];

// Generic Lists
entities.lists.createFormDependencies.push('listTypes');
entities.lists.subEntityName = 'listItems';
entities.lists.helpLink = '/Help/Content/Configuration/Lists/Lists.htm';
entities.lists.columns = [
  { name: 'Name', active: true },
  { name: 'List Type', active: true },
  { name: 'Status', active: true }
];

// Outbound Identifiers
entities.outboundIdentifiers.createFormDependencies.push('flows');
entities.outboundIdentifiers.updateFormDependencies.push('flows');
entities.outboundIdentifiers.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Value', active: true },
  { name: 'channelType', active: true },
  { name: 'flowId', active: false }
];

// Outbound Identifiers Lists
entities.outboundIdentifierLists.updateFormDependencies.push('outboundIdentifiers');
entities.outboundIdentifierLists.dependentEntity = 'outboundIdentifiers';
entities.outboundIdentifierLists.modalListTableFields = [
  { label: 'Name', name: 'name' },
  { label: 'Value', name: 'value' },
  { label: 'Channel Type', name: 'channelType' },
  { label: 'Description', name: 'description' }
];
entities.outboundIdentifierLists.columns = [{ name: 'Name', active: true }, { name: 'Description', active: true }];

// Roles
entities.roles.updateFormDependencies.push('permissions');
entities.roles.dependentEntity = 'roles';
entities.roles.betaFeature = true;
entities.roles.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Permissions', active: true }
];

//Silent Monitoring
entities.interactionMonitoring.betaFeature = true;
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

// Custom Metrics
entities.customMetrics.pageTitle = 'Statistics Management';
entities.customMetrics.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Metric Type', active: true },
  { name: 'Status', active: true }
];

// Email Templates
entities.emailTemplates.helpLink = '/Help/Content/Configuration/Email_Templates/Updating_Email_Templates.htm';
entities.emailTemplates.columns = [{ name: 'Name', active: true }, { name: 'Description', active: true }];

// Chat Widgets
entities.chatWidgets.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Status', active: true }
];

export const entitiesMetaData = entities;
