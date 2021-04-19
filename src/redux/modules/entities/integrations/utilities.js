export const initialProperties = {
  rest: { endpointPrefix: '', password: '', token: '', username: '' },
  salesforce: { consumerKey: '', consumerSecret: '', password: '', securityToken: '', username: '' },
  zendesk: { endpointPrefix: '', interactionFieldId: '', password: '', username: '', workItems: false },
};

export const getIntegrationProperties = (type = 'rest') => {
  return initialProperties[type] || {};
};

export const prepareIntegrationProperties = (type = 'rest', authType = 'noAuth', properties) => {
  const defaultProperties = getIntegrationProperties(type);
  const updatedProperties = { ...defaultProperties, ...properties };
  if (type === 'zendesk') {
    delete updatedProperties.token;
  } else if (type === 'rest') {
    delete updatedProperties.workItems;
    if (authType === 'basic') {
      updatedProperties.token = '';
    } else if (authType === 'token') {
      updatedProperties.username = updatedProperties.password = '';
    } else {
      updatedProperties.username = updatedProperties.password = updatedProperties.token = '';
    }
  } else if (type === 'salesforce') {
    delete updatedProperties.endpointPrefix;
    delete updatedProperties.token;
    delete updatedProperties.workItems;
  }
  return updatedProperties;
};
