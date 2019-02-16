export const hasCustomCreateEntity = entityName => !['users', 'dataAccessReports', 'flows'].includes(entityName);

export const hasCustomUpdateEntity = entityName =>
  !['emailTemplates', 'users', 'dataAccessReports', 'reasonLists', 'flows'].includes(entityName);

export const hasCustomRemoveSubEntity = entityName => !['roles', 'dataAccessReports', 'flows'].includes(entityName);
