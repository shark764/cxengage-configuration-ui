/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const getUserData = state => state.get('UserData');

export const getCurrentTenantName = state =>
  state.get('UserData').get('currentTenantName');

export const getCurrentTenantId = state =>
  state.get('UserData').get('currentTenantId');

export const getCurrentPermissions = createSelector([getUserData], userData =>
  userData.get('permissions')
);
