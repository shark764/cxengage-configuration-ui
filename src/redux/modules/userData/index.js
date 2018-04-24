/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { fromJS } from 'immutable';

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
