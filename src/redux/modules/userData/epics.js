/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { sdkPromise } from '../../../utils/sdk';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { isInIframe } from 'serenova-js-utils/browser';

import { findEntity } from '../entities/selectors';
import { handleError } from '../entities/handleResult';

import {
  getCurrentPermissions,
  currentTenantId,
  getCurrentTenantName,
  getCurrentAgentId,
  getAgentTenantRoleId
} from './selectors';

/**
 * Note: When you see the variable 'a' shorthand being used
 * it represents the keyword 'action'
 * Redux observable epics are actions in and actions out,
 * you will notice we keep the original action and just add
 * to it as it passes throught the observable
 *
 */

export const SetCurrentAgentRole = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(a => a.entityName === 'roles' && (a.addListItemId || a.removeListItemId))
    .map(a => ({
      ...a,
      tenantInfo: {
        tenantId: currentTenantId(store.getState()),
        tenantName: getCurrentTenantName(store.getState())
      },
      agentId: getCurrentAgentId(store.getState()),
      tenantRoleId: getAgentTenantRoleId(store.getState())
    }))
    // If roleId for current agent is not in state,
    // we need to fetch it
    .map(a =>
      a.tenantRoleId === undefined
        ? { ...a, type: 'GET_CURRENT_AGENT_TENANT_ROLE' }
        : { ...a, type: 'SET_TENANT_PERMISSIONS' }
    );

export const SetNewAgentPermissions = (action$, store) =>
  action$
    .ofType('GET_CURRENT_AGENT_TENANT_ROLE')
    .map(a => {
      a.sdkCall = {
        command: 'getUser',
        data: {
          resourceId: getCurrentAgentId(store.getState())
        },
        module: 'entities',
        topic: 'cxengage/entities/get-user-response'
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => ({
          ...a,
          tenantRoleId: response.result.roleId,
          type: 'SET_TENANT_PERMISSIONS'
        }))
        .catch(error => handleError(error, a))
    );

export const SetTenantPermissions = (action$, store) =>
  action$
    .ofType('SET_TENANT_PERMISSIONS')
    .filter(a => !isInIframe() && a.response.result.id === a.tenantRoleId)
    .map(a => {
      const permission = findEntity(store.getState(), 'permissions', a.addListItemId || a.removeListItemId);
      const permissions = getCurrentPermissions(store.getState());
      const newTenantPermissions = a.addListItemId
        ? permissions.push(permission.get('name'))
        : permissions.filter(p => p !== permission.get('name'));

      a.tenantInfo = {
        ...a.tenantInfo,
        tenantPermissions: newTenantPermissions
      };

      // Updating localStorage with new permissions for current role
      localStorage.setItem(
        'LIVEOPS-PREFERENCE-KEY',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('LIVEOPS-PREFERENCE-KEY')),
          tenant: a.tenantInfo
        })
      );

      return { ...a };
    })
    // Then we update localStorage for Config-UI1
    .switchMap(a =>
      fromPromise(
        sdkPromise({
          module: 'updateKeyLocalStorage',
          command: `updateKeyLocalStorage`,
          data: { key: 'LIVEOPS-PREFERENCE-KEY', value: localStorage.getItem('LIVEOPS-PREFERENCE-KEY') },
          topic: 'updateKeyLocalStorage'
        })
      ).map(response => ({
        ...a,
        type: 'UPDATE_USER_PERMISSIONS'
      }))
    );

export const getTenantPermissions = action$ =>
  action$
    .ofType('UPDATE_USER_PERMISSIONS')
    .filter(a => !isInIframe() && a.tenants)
    .map(a => ({
      ...a,
      type: 'UPDATE_TENANTS_LIST'
    }));
