/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { fromJS } from 'immutable';

// Initial Sub State
export const initialState = fromJS({
  permissions: '',
  currentTenantName: '',
  currentTenantId: ''
});

// Actions
export const updateUserPermissions = (
  tenantId,
  tenantName,
  tenantPermissions
) => ({
  type: 'UPDATE_USER_PERMISSIONS',
  tenantInfo: {
    tenantId: tenantId,
    tenantName: tenantName,
    tenantPermissions: tenantPermissions
  }
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
