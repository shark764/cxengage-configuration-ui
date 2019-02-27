/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const getIdentityProviders = state => state.getIn(['Entities', 'identityProviders', 'data']);

export const selectTenantIdentityProviders = createSelector(getIdentityProviders, identityProviders => {
  return identityProviders !== undefined
    ? [
        { value: 'null', label: 'Use Tenant Default' },
        ...identityProviders
          .filter(identityProvider => identityProvider.get('active'))
          .map(identityProvider => ({
            value: identityProvider.get('id'),
            label: identityProvider.get('name')
          }))
          .toJS()
      ]
    : [];
});
