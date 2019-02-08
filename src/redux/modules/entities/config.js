export const hasCustomCreateEntity = entityName => !['users', 'dataAccessReports'].includes(entityName);

export const hasCustomUpdateEntity = entityName =>
  !['emailTemplates', 'users', 'dataAccessReports','reasonLists'].includes(entityName);
