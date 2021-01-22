export const hasCustomCreateEntity = (entityName) =>
  ![
    'users',
    'dataAccessReports',
    'flows',
    'dispatchMappings',
    'businessHours',
    'businessHoursV2',
    'integrations',
  ].includes(entityName);

export const hasCustomUpdateEntity = (entityName) =>
  ![
    'emailTemplates',
    'users',
    'dataAccessReports',
    'reasonLists',
    'flows',
    'dispatchMappings',
    'businessHours',
    'apiKeys',
    'dispositionLists',
    'businessHoursV2',
    'contactLayouts',
    'contactAttributes',
    'capacityRules',
  ].includes(entityName);

export const hasCustomCreateEntityFullFilled = (entityName) => !['businessHoursV2', 'tenants'].includes(entityName);

export const hasCustomUpdateEntityFullFilled = (entityName) =>
  ![
    'dispositionLists',
    'reasonLists',
    'transferLists',
    'customAttributes',
    'businessHoursV2',
    'tenants',
    'contactLayouts',
    'contactAttributes',
  ].includes(entityName);

export const hasCustomCreateSubEntity = (entityName) => !['businessHours', 'capacityRules'].includes(entityName);

export const hasCustomRemoveSubEntity = (entityName) =>
  !['roles', 'dataAccessReports', 'flows', 'businessHours', 'businessHoursV2'].includes(entityName);

export const hasCustomFetchEntityData = (entityName) =>
  !['tenants', 'dispositionLists', 'customAttributes', 'userProfile'].includes(entityName);

export const hasCustomFetchEntityItemData = (entityName) =>
  !['dispositionLists', 'flows', 'contactLayouts'].includes(entityName);

export const entitiesUsingUpdateLogicForToggleEntity = (entityName) =>
  ['customAttributes', 'identityProviders', 'whatsappIntegrations', 'capacityRules'].includes(entityName);

export const hasCustomSubEntityUpdate = (entityName, subEntityName) => {
  const entityMap = {
    businessHoursV2: 'drafts',
  };
  return entityMap[entityName] === subEntityName;
};

export const hasCustomSetSelectedEntityId = (entityName) => !['tenants', 'contactLayouts'].includes(entityName);

export const hasCustomSubEntityFormSubmit = (entityName) =>
  !['transferLists', 'reasonLists', 'dispositionLists', 'contactLayouts'].includes(entityName);

export const localeLanguages = [
  { label: 'Chinese - Simplified', value: 'zh-CN', id: 'zhCn' },
  { label: 'Chinese - Traditional', value: 'zh-TW', id: 'zhTw' },
  { label: 'Czech', value: 'cs-CZ', id: 'csCz' },
  { label: 'Dutch', value: 'nl-NL', id: 'nlNl' },
  { label: 'English - Great Britain', value: 'en-GB', id: 'enGb' },
  { label: 'English - United States', value: 'en-US', id: 'enUs' },
  { label: 'Finnish', value: 'fi-FI', id: 'fiFI' },
  { label: 'French - Canada', value: 'fr-CA', id: 'frCa' },
  { label: 'French - France', value: 'fr-FR', id: 'frFr' },
  { label: 'German', value: 'de-DE', id: 'deDe' },
  { label: 'Italian', value: 'it-IT', id: 'itIt' },
  { label: 'Japanese', value: 'ja-JP', id: 'jaJp' },
  { label: 'Korean', value: 'ko-KR', id: 'koKr' },
  { label: 'Norwegian', value: 'nb-NO', id: 'nbNo' },
  { label: 'Polish', value: 'pl-PL', id: 'plPl' },
  { label: 'Portuguese - Brazil', value: 'pt-BR', id: 'ptBr' },
  { label: 'Spanish - Spain', value: 'es-ES', id: 'esEs' },
  { label: 'Swedish', value: 'sv-SE', id: 'svSe' },
];
