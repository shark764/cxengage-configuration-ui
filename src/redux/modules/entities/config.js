export const hasCustomCreateEntity = entityName =>
  !['users', 'dataAccessReports', 'flows', 'dispatchMappings', 'businessHours'].includes(entityName);

export const hasCustomUpdateEntity = entityName =>
  ![
    'emailTemplates',
    'users',
    'dataAccessReports',
    'reasonLists',
    'flows',
    'dispatchMappings',
    'businessHours',
    'apiKeys'
  ].includes(entityName);

export const hasCustomCreateSubEntity = entityName => !['businessHours'].includes(entityName);
export const hasCustomRemoveSubEntity = entityName =>
  !['roles', 'dataAccessReports', 'flows', 'businessHours'].includes(entityName);
