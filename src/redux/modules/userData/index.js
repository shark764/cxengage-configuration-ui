/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { fromJS } from 'immutable';

// Initial Sub State
export const initialState = fromJS({
  agentId: '',
  permissions: '',
  currentTenantName: '',
  currentTenantId: ''
});

// Actions
export const updateUserPermissions = (
  tenantId,
  tenantName,
  tenantPermissions,
  agentId
) => ({
  type: 'UPDATE_USER_PERMISSIONS',
  tenantInfo: {
    tenantId: tenantId,
    tenantName: tenantName,
    tenantPermissions: tenantPermissions
  },
  agentId: agentId
});

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_PERMISSIONS': {
      const { tenantPermissions, tenantId, tenantName } = action.tenantInfo;
      return state
        .set('permissions', fromJS(tenantPermissions))
        .set('currentTenantId', tenantId)
        .set('currentTenantName', tenantName)
        .set('agentId', action.agentId);
    }
    default:
      return state;
  }
}
