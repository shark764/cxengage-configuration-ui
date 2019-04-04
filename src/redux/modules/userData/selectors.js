/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { hasAllBranding } from '../entities/branding/selectors';

const getUserData = state => state.get('UserData');

export const getCurrentTenantName = state => state.get('UserData').get('currentTenantName');

export const currentTenantId = state => state.getIn(['UserData', 'currentTenantId']);

export const userIsAuthed = state => state.get('UserData').get('userIsAuthed');

export const platformViewOnlyMode = state => state.get('UserData').get('platformViewOnlyMode');

export const availableTenants = state => state.get('UserData').get('tenants').toJS();

export const getCurrentAgentId = state => state.get('UserData').get('agentId');

export const getCurrentTenantId = state => state.get('UserData').get('currentTenantId');

export const getCurrentPermissions = createSelector([getUserData], userData => userData.get('permissions'));

export const authenticatedAndBrandingReady = state => hasAllBranding(state) && userIsAuthed(state);
