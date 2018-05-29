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
  selectInteractionMonitoringColumns,
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
    .debounceTime(4000)
    .filter(({ menuType }) => menuType === 'Columns')
    .map(action => ({
      ...action,
      columnsData: JSON.stringify(
        selectInteractionMonitoringColumns(store.getState())
      )
    }))
    .do(action =>
      localStorage.setItem('InteractionMonitoringColumns', action.columnsData)
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
      groupIds: Array.from(
        selectGroups(store.getState(), { tableType: 'InteractionMonitoring' }),
        x => x.active && x.id
      ).filter(x => x),
      skillIds: Array.from(
        selectSkills(store.getState(), { tableType: 'InteractionMonitoring' }),
        x => x.active && x.id
      ).filter(x => x)
    }))
    .mergeMap(action =>
      fromPromise(
        sdkPromise({
          module: 'reporting',
          command: 'addStatSubscription',
          data: {
            groupId: action.groupIds,
            skillId: action.skillIds,
            statistic: 'interactions-in-conversation-list',
            statId: 'interactions-in-conversation-list'
          }
        })
      )
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
