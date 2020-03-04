export const hasCustomCreateEntity = entityName =>
  !['users', 'dataAccessReports', 'flows', 'dispatchMappings', 'businessHours', 'businessHoursV2'].includes(entityName);

export const hasCustomUpdateEntity = entityName =>
  ![
    'emailTemplates',
    'users',
    'dataAccessReports',
    'reasonLists',
    'flows',
    'dispatchMappings',
    'businessHours',
    'apiKeys',
    'dispositionLists'
  ].includes(entityName);

export const hasCustomUpdateEntityFullFilled = entityName =>
  !['dispositionLists', 'reasonLists', 'transferLists', 'customAttributes'].includes(entityName);

export const hasCustomCreateSubEntity = entityName => !['businessHours'].includes(entityName);

export const hasCustomRemoveSubEntity = entityName =>
  !['roles', 'dataAccessReports', 'flows', 'businessHours'].includes(entityName);

export const hasCustomFetchEntityData = entityName =>
  !['tenants', 'dispositionLists', 'customAttributes'].includes(entityName);

export const hasCustomFetchEntityItemData = entityName => !['dispositionLists', 'flows'].includes(entityName);

export const entitiesUsingUpdateLogicForToggleEntity = entityName => ['customAttributes'].includes(entityName);
