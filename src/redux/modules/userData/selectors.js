/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { hasAllBranding } from '../entities/branding/selectors';
import { getEntityData } from '../entities/selectors';

const getUserData = state => state.get('UserData');

export const getCurrentTenantName = state => state.get('UserData').get('currentTenantName');

export const currentTenantId = state => state.getIn(['UserData', 'currentTenantId']);

export const userIsAuthed = state => state.get('UserData').get('userIsAuthed');

export const platformViewOnlyMode = state => state.get('UserData').get('platformViewOnlyMode');

export const availableTenants = state => state.get('UserData').get('tenants');

export const getAvailableTenants = createSelector([availableTenants], availableTenants => availableTenants.toJS());

export const getCurrentAgentId = state => state.get('UserData').get('agentId');

export const getCurrentTenantId = state => state.get('UserData').get('currentTenantId');

export const getAgentTenantRoleId = state => state.get('UserData').get('tenantRoleId');

export const getCurrentPermissions = createSelector([getUserData], function(userData) {
  var tenantPermissions = userData.get('permissions') || [];
  var platformPermissions = userData.get('platformPermissions') || [];

  return tenantPermissions.concat(platformPermissions);
});

export const authenticatedAndBrandingReady = state => hasAllBranding(state) && userIsAuthed(state);

export const isTenantSetForReadAllMode = state =>
  availableTenants(state).find(tenant => tenant.get('tenantId') === getCurrentTenantId(state)) === undefined;

export const getCurrentTenantTimezone = createSelector(
  [getCurrentTenantId, state => getEntityData(state, 'tenants')],
  (currentTenantId, tenants) =>
    tenants &&
    tenants.size > 0 &&
    tenants.find(tenant => tenant.get('id') === currentTenantId) &&
    tenants.find(tenant => tenant.get('id') === currentTenantId).get('timezone')
);
