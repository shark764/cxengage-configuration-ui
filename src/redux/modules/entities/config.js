export const hasCustomCreateEntity = entityName =>
  !['users', 'dataAccessReports', 'flows', 'dispatchMappings'].includes(entityName);

export const hasCustomUpdateEntity = entityName =>
  !['emailTemplates', 'users', 'dataAccessReports', 'reasonLists', 'flows', 'dispatchMappings'].includes(entityName);

export const hasCustomRemoveSubEntity = entityName => !['roles', 'dataAccessReports', 'flows'].includes(entityName);
