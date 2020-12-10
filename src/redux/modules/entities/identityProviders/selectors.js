/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';

const getIdentityProviders = (state) => state.getIn(['Entities', 'identityProviders', 'data']);

export const selectTenantIdentityProviders = createSelector(getIdentityProviders, (identityProviders) => {
  return identityProviders !== undefined
    ? [
        { value: 'null', label: 'Use Tenant Default' },
        ...identityProviders
          .filter((identityProvider) => identityProvider.get('active'))
          .map((identityProvider) => ({
            value: identityProvider.get('id'),
            label: identityProvider.get('name'),
          }))
          .toJS(),
      ]
    : [];
});

export const selectIdentityProvidersFormInitialValues = (state) => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: false, emailMapping: 'Email' });
  }
  let initialValues = selectFormInitialValues(state);
  initialValues = initialValues.set('description', initialValues.get('description') || '');

  if (initialValues.has('metadataUrl')) {
    return initialValues.set('identityProviderType', 'url').toJS();
  } else if (initialValues.has('metadataFile')) {
    return initialValues.set('identityProviderType', 'xml').toJS();
  }
  return initialValues.toJS();
};
