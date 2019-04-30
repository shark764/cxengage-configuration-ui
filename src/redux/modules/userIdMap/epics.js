/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { sdkPromise } from '../../../utils/sdk';
import { handleError } from '../entities/handleResult';

import { getSelectedEntityId, getSelectedEntity } from '../entities/selectors';

import { getUserDisplayName } from './selectors';

import { entitiesMetaData } from '../entities/metaData';

import { getDisplay } from '../entities/users/selectors';

/**
 * Note: When you see the variable 'a' shorthand being used
 * it represents the keyword 'action'
 * Redux observable epics are actions in and actions out,
 * you will notice we keep the original action and just add
 * to it as it passes throught the observable
 *
 */

export const FetchSideCreatedAndUpdatedBy = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .filter(a => a.entityId !== 'bulk' && a.entityId !== 'create' && a.entityId !== '')
    .map(a => {
      let newAction = {
        ...a,
        entityId: getSelectedEntityId(store.getState()),
        createdById: getSelectedEntity(store.getState()).get('createdBy'),
        updatedById: getSelectedEntity(store.getState()).get('updatedBy')
      };
      newAction.createdByName =
        getSelectedEntity(store.getState()).get('createdByName') ||
        getUserDisplayName(store.getState(), newAction.createdById);
      newAction.updatedByName =
        getSelectedEntity(store.getState()).get('updatedByName') ||
        getUserDisplayName(store.getState(), newAction.updatedById);
      return newAction;
    })
    .filter(a => a.createdByName === undefined || a.updatedByName === undefined)
    .map(a => {
      a.sdkCall = entitiesMetaData['users'].entityApiRequest('get', 'singleMainEntity');
      a.allSdkCalls = [
        ...(!a.createdByName ? [a.createdById] : []),
        ...(!a.updatedByName && a.createdById !== a.updatedById ? [a.updatedById] : [])
      ].map(id => ({
        ...a.sdkCall,
        data: {
          resourceId: id
        }
      }));

      return { ...a };
    })
    .map(a => ({
      ...a,
      type: 'SET_CREATED_AND_UPDATED_BY_$'
    }));

export const FetchUpdatedByAfterUpdate = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .map(a => {
      let newAction = {
        ...a,
        entityId: getSelectedEntityId(store.getState()),
        createdById: getSelectedEntity(store.getState()).get('createdBy'),
        updatedById: getSelectedEntity(store.getState()).get('updatedBy')
      };
      newAction.updatedByName =
        getSelectedEntity(store.getState()).get('updatedByName') ||
        getUserDisplayName(store.getState(), newAction.updatedById);
      // We don't get username from session, since UserData state section replaces
      // User name by Tenant Name when changing tenant selected.
      return newAction;
    })
    .filter(a => a.values.id !== undefined && a.entityId !== 'bulk' && a.entityId !== 'create' && a.entityId !== '')
    .filter(a => !a.updatedByName)
    .map(a => {
      a.sdkCall = entitiesMetaData['users'].entityApiRequest('get', 'singleMainEntity');
      a.sdkCall.data = {
        resourceId: a.updatedById
      };
      a.allSdkCalls = [a.sdkCall];

      return { ...a };
    })
    .map(a => ({
      ...a,
      type: 'SET_CREATED_AND_UPDATED_BY_$'
    }));

export const SetSideCreatedAndUpdatedBy = action$ =>
  action$
    .ofType('SET_CREATED_AND_UPDATED_BY_$')
    .filter(a => a.allSdkCalls.length > 0)
    .mergeMap(a =>
      forkJoin(a.allSdkCalls.map(apiCall => from(sdkPromise(apiCall).catch(error => ({ error: error }))))).mergeMap(
        result =>
          from(result)
            .filter(r => r.result !== undefined)
            .map(r => ({
              type: 'ADD_USER_DATA_TO_MAP',
              userId: r.result.id,
              userName: getDisplay(r.result)
            }))
            .catch(error => handleError(error, a))
      )
    );
