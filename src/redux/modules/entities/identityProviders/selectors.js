/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

export const selectTenantIdentityProviders = state => [
  ...state
    .getIn(['Entities', 'identityProviders', 'data'])
    .toJS()
    .map(provider => ({
      value: provider.id,
      label: provider.name
    })),
  { value: 'null', label: 'Use Tenant Default: Enabled' }
];
