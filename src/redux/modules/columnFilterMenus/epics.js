/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';

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
    .do(action =>
      updateInteractionMonitoringColumnsLocalStorage(store.getState())
    )
    .ignoreElements();

export const UpdateStatSubscriptionFilters = (action$, store) =>
  action$
    .ofType(...ColumnRelatedActions)
    .filter(({ menuType }) => menuType === 'Skills' || menuType === 'Groups')
    .do(action => updateStatSubscriptionFilters(store.getState()))
    .ignoreElements();

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

function updateInteractionMonitoringColumnsLocalStorage(state) {
  window.localStorage.setItem(
    'InteractionMonitoringColumns',
    JSON.stringify(selectInteractionMonitoringColumns(state))
  );
}

function updateStatSubscriptionFilters(state) {
  const groupIds = Array.from(
    selectGroups(state, { tableType: 'InteractionMonitoring' }),
    x => x.active && x.groupId
  ).filter(x => x);

  const skillIds = Array.from(
    selectSkills(state, { tableType: 'InteractionMonitoring' }),
    x => x.active && x.skillId
  ).filter(x => x);

  sdkPromise({
    module: 'reporting',
    command: 'addStatSubscription',
    data: {
      groupId: groupIds,
      skillId: skillIds,
      statistic: 'interactions-in-conversation-list'
    }
  });
}
