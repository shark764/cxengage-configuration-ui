/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

export const selectTenantIdentityProviders = state => {
  const providerData = state.getIn(['Entities', 'identityProviders', 'data']);
  return [
    { value: 'null', label: 'Use Tenant Default: Enabled' },
    ...(providerData
      ? providerData
          .toJS()
          .filter(provider => provider.active)
          .map(provider => ({
            value: provider.id,
            label: provider.name
          }))
      : [])
  ];
};
