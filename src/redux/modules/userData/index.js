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
  currentTenantId: '',
  tenants: [],
  platformViewOnlyMode: false,
});

// Actions
export const updateUserPermissions = (tenantId, tenantName, tenantPermissions, userId) => ({
  type: 'UPDATE_USER_PERMISSIONS',
  tenantInfo: {
    tenantId,
    tenantName,
    tenantPermissions,
  },
  userId,
});
export const updateTenantsList = (tenants) => ({
  type: 'UPDATE_TENANTS_LIST',
  tenants,
});
export const togglePlatformViewOnlyMode = () => ({
  type: 'TOGGLE_PLATFORM_VIEW_ONLY_MODE',
});
export const updatePlatformPermissions = (permissions) => ({
  type: 'UPDATE_PLATFORM_PERMISSIONS',
  permissions,
});
export const setUserAuthed = (isAuthed) => ({ type: 'SET_USER_AUTH', isAuthed });

export const switchTenant = (tenantId, setAsActiveTenant) => ({ type: 'SWITCH_TENANT', tenantId, setAsActiveTenant });

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_PERMISSIONS': {
      const { tenantPermissions, tenantId, tenantName } = action.tenantInfo;

      if (!localStorage.getItem('LIVEOPS-PREFERENCE-KEY')) {
        //Update localStorage if tenant info is not set
        localStorage.setItem(
          'LIVEOPS-PREFERENCE-KEY',
          JSON.stringify({
            tenant: action.tenantInfo,
          })
        );
      }

      return state
        .set('platformPermissions', fromJS(action.platformPermissions))
        .set('permissions', fromJS(tenantPermissions))
        .set('currentTenantId', tenantId)
        .set('currentTenantName', tenantName)
        .set('agentId', action.agentId || action.userId)
        .set('tenantRoleId', action.tenantRoleId || state.get('tenantRoleId'));
    }
    case 'UPDATE_PLATFORM_PERMISSIONS': {
      return state.set('platformPermissions', fromJS(action.permissions));
    }
    case 'UPDATE_TENANTS_LIST': {
      return state.set('tenants', fromJS(action.tenants));
    }
    case 'SET_USER_AUTH': {
      return state.set('userIsAuthed', action.isAuthed);
    }
    case 'TOGGLE_PLATFORM_VIEW_ONLY_MODE': {
      return state.set('platformViewOnlyMode', !state.get('platformViewOnlyMode'));
    }
    case 'SWITCH_TENANT': {
      const tenantIndex = state.get('tenants').findIndex((tenant) => tenant.get('tenantId') === action.tenantId);
      if (tenantIndex !== -1) {
        const { tenantPermissions, tenantId, tenantName } = state.getIn(['tenants', tenantIndex]).toJS();
        return state
          .set('permissions', fromJS(tenantPermissions))
          .set('currentTenantId', tenantId)
          .set('currentTenantName', tenantName)
          .set('tenantRoleId', undefined);
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
