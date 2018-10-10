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

import {
  selectTableColumns,
  selectGroups,
  selectSkills
} from './selectors';

import { updateGroupsColumnFilter, updateSkillsColumnFilter } from './index';

import { sdkPromise } from '../../../utils/sdk';

const ColumnRelatedActions = [
  'TOGGLE_MENUITEMS',
  'TOGGLE_INVERSE_MENUITEMS',
  'TOGGLE_ALL_MENUITEMS_ON',
  'TOGGLE_ALL_MENUITEMS_OFF'
];

export const SaveColumnsToLocalStorage = (action$, store) =>
  action$
    .ofType(...ColumnRelatedActions)
    .debounceTime(2000)
    .filter(({ menuType }) => menuType === 'Columns')
    .map(action => ({
      ...action,
      columnsData: JSON.stringify(
        selectTableColumns(store.getState(), action.tableType)
      )
    }))
    .do(action =>
      localStorage.setItem(`${action.tableType}Columns`, action.columnsData)
    )
    .map(action => ({
      type: 'COLUMNS_LOCALSTORAGE_UPDATED_$',
      columnsData: action.columnsData
    }));

export const UpdateStatSubscriptionFilters = (action$, store) =>
  action$
    .ofType(...ColumnRelatedActions)
    .filter(({ menuType }) => menuType === 'Skills' || menuType === 'Groups')
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
      groupIds: Array.from(action.groupsArray, x => x.active && x.id).filter(
        x => x
      ),
      skillIds: Array.from(action.skillsArray, x => x.active && x.id).filter(
        x => x
      )
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
      .catch(err => of({ type: 'STATS_NOT_UPDATED_$' }))
    );

export const UpdateSkillsAndGroupsFilter = (action$, store) =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(
      ({ entityName }) => entityName === 'groups' || entityName === 'skills'
    )
    .map(a => {
      if (a.entityName === 'skills') {
        return updateSkillsColumnFilter(a.response.result, a.tableType);
      } else {
        return updateGroupsColumnFilter(a.response.result, a.tableType);
      }
    });
