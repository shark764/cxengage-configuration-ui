/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';

const getIntegrations = state => state.getIn(['Entities', 'integrations', 'data']);

export const selectIntegrations = createSelector(getIntegrations, integrations => {
  return integrations !== undefined
    ? integrations
        .toJS()
        .map(integration => ({
          value: integration.type,
          label: integration.type 
        }))
    : undefined;
});