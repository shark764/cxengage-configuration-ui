/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { hasAllBranding } from '../entities/branding/selectors';

const getUserData = state => state.get('UserData');

export const getCurrentTenantName = state => state.get('UserData').get('currentTenantName');

export const userIsAuthed = state => state.get('UserData').get('userIsAuthed');

export const getCurrentAgentId = state => state.get('UserData').get('agentId');

export const getCurrentTenantId = state => state.get('UserData').get('currentTenantId');

export const getCurrentPermissions = createSelector([getUserData], userData => userData.get('permissions'));

export const authenticatedAndBrandingReady = state => hasAllBranding(state) && userIsAuthed(state);
