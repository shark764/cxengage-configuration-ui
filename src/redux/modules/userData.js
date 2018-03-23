/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

// Initial Sub State
const initialState = fromJS({
  permissions: '',
  currentTenantName: '',
  currentTenantId: ''
});

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_PERMISSIONS': {
      const { tenantPermissions, tenantId, tenantName } = action.tenantInfo;
      return state
        .set('permissions', fromJS(tenantPermissions))
        .set('currentTenantId', tenantId)
        .set('currentTenantName', tenantName);
    }
    default:
      return state;
  }
}

// Selectors

const getUserData = state => state.get('userData');
export const getCurrentTenantName = state =>
  state.get('userData').get('currentTenantName');
export const getCurrentTenantId = state =>
  state.get('userData').get('currentTenantId');

export const getCurrentPermissions = createSelector([getUserData], userData =>
  userData.get('permissions')
);
