export const hasCustomUpdateEntity = entityName =>
  !['emailTemplates', 'users'].includes(entityName);
