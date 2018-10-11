/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { fromJS } from 'immutable';
import { isInIframe } from 'serenova-js-utils/browser';

// Initial Sub State
export const initialState = fromJS({
  agentId: '',
  userIsAuthed: !isInIframe(),
  permissions: '',
  currentTenantName: '',
  currentTenantId: ''
});

// Actions
export const updateUserPermissions = (tenantId, tenantName, tenantPermissions, userId) => ({
  type: 'UPDATE_USER_PERMISSIONS',
  tenantInfo: {
    tenantId,
    tenantName,
    tenantPermissions
  },
  userId
});
export const toggleUserAuthed = () => ({ type: 'TOGGLE_USER_AUTH' });

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_PERMISSIONS': {
      const { tenantPermissions, tenantId, tenantName } = action.tenantInfo;
      return state
        .set('permissions', fromJS(tenantPermissions))
        .set('currentTenantId', tenantId)
        .set('currentTenantName', tenantName)
        .set('agentId', action.userId);
    }
    case 'TOGGLE_USER_AUTH': {
      return state.set('userIsAuthed', !state.get('userIsAuthed'));
    }
    default:
      return state;
  }
}
