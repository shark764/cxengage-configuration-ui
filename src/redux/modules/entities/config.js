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
    'businessHours'
  ].includes(entityName);

export const hasCustomRemoveSubEntity = entityName => !['roles', 'dataAccessReports', 'flows'].includes(entityName);
