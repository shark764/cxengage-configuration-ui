/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/ignoreElements';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import { selectGroups, selectSkills, selectTable } from './selectors';

import { updateGroupsColumnFilter, updateSkillsColumnFilter, updateReasonListsColumnFilter } from './index';

import { sdkPromise } from '../../../utils/sdk';
import { getCurrentEntity } from '../entities/selectors';

const ColumnRelatedActions = [
  'TOGGLE_MENUITEMS',
  'TOGGLE_INVERSE_MENUITEMS',
  'TOGGLE_ALL_MENUITEMS_ON',
  'TOGGLE_ALL_MENUITEMS_OFF'
];

const ColumnMenuRelatedActions = [...ColumnRelatedActions, 'ONE_ON_REST_OFF'];

// If inside config-1, save to config-1 and then 2. If standalone, only save to config-2.
export const SaveColumnsToLocalStorage = (action$, store) =>
  action$
    .ofType(...ColumnMenuRelatedActions)
    .debounceTime(2000)
    .map(action => ({
      ...action,
      columnMenus: JSON.stringify(selectTable(store.getState(), action.tableType).toJS())
    }))
    .do(action => localStorage.setItem(`${action.tableType}ColumnMenus`, action.columnMenus))
    .map(action => ({
      ...action,
      type: 'COLUMN_MENUS_LOCALSTORAGE_UPDATED_$'
    }));

export const UpdateStatSubscriptionFilters = (action$, store) =>
  action$
    .ofType(...ColumnRelatedActions)
    .filter(
      ({ menuType }) =>
        getCurrentEntity(store.getState()) === 'InteractionMonitoring' &&
        (menuType === 'Skills' || menuType === 'Groups')
    )
    .map(action => ({
      ...action,
      groupsArray: selectGroups(store.getState(), {
        tableType: 'interactionMonitoring'
      }),
      skillsArray: selectSkills(store.getState(), {
        tableType: 'interactionMonitoring'
      })
    }))
    .map(action => ({
      ...action,
      groupIds: Array.from(action.groupsArray, x => x.active && x.id).filter(x => x),
      skillIds: Array.from(action.skillsArray, x => x.active && x.id).filter(x => x)
    }))
    .map(action => {
      action.payload = {
        statistic: 'interactions-in-conversation-list',
        statId: 'interactions-in-conversation-list'
      };
      if (action.groupIds.length !== action.groupsArray.length) {
        action.payload.groupId = action.groupIds;
      }
      if (action.skillIds.length !== action.skillsArray.length) {
        action.payload.skillId = action.skillIds;
      }
      return { ...action };
    })
    .mergeMap(action =>
      fromPromise(
        sdkPromise({
          module: 'reporting',
          command: 'addStatSubscription',
          data: action.payload
        })
      )
        // TODO: sdkPromise requires a topic to get anything returned..
        // so the below will never fire the way we have it now..
        // either remove the mapTo and catch .. or make it so we will get the responses
        .mapTo({ type: 'STATS_UPDATED_$' })
        .catch(() => of({ type: 'STATS_NOT_UPDATED_$' }))
    );

export const UpdateSkillsAndGroupsFilter = (action$, store) =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .map(a => ({
      ...a,
      currentEntity: getCurrentEntity(store.getState())
    }))
    .filter(
      ({ entityName, currentEntity }) =>
        (currentEntity === 'InteractionMonitoring' || currentEntity === 'agentStateMonitoring') &&
        (entityName === 'groups' || entityName === 'skills' || entityName === 'reasonLists')
    )
    .map(a => {
      if (a.entityName === 'skills') {
        return updateSkillsColumnFilter(a.response.result, a.tableType);
      } else if (a.entityName === 'groups') {
        return updateGroupsColumnFilter(a.response.result, a.tableType);
      } else {
        return updateReasonListsColumnFilter(a.response.result, a.tableType);
      }
    });
