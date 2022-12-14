/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
export const initialState = fromJS({
  data: [],
  sorted: [],
  expanded: {},
  selected: '',
  extensions: [],
  monitorAllCallsPermission: ['MONITOR_ALL_CALLS'],
  bargeAllCallsPermission: ['BARGE_ALL_CALLS'],
  viewAllMonitoredCallsPermission: ['VIEW_ALL_MONITORED_CALLS']
});

// Actions
export const updateTableData = arrayOfTableData => ({
  type: 'SET_TABLE_DATA',
  arrayOfTableData
});
export const setExpanded = expanded => ({ type: 'SET_EXPANDED', expanded });
export const setSelected = (selected, expanded) => ({
  type: 'SET_SELECTED',
  selected,
  expanded
});
export const setSorted = sorted => ({ type: 'SET_SORTED', sorted });
export const removeSelected = () => ({ type: 'REMOVE_SELECTED' });
export const getExtensions = () => ({ type: 'GET_USER_EXTENSIONS' });
export const startInteractionMonitoring = () => ({
  type: 'START_REPORTING_BATCH_REQUEST_$'
});
export const startReportingSubscriptions = () => ({
  type: 'START_REPORTING_SUBSCRIPTION_$'
});
export const reportingSubscriptionStarted = () => ({
  type: 'REPORTING_SUBSCRIPTION_STARTED_$'
});

// Reducer
export default function InteractionMonitoring(state = initialState, action) {
  switch (action.type) {
    case 'SET_EXTENSION_LIST':
      return state.set('extensions', fromJS(action.extensions)).delete('isFetchingUserExtensions');
    case 'SET_TABLE_DATA':
      return state.set('data', fromJS(action.arrayOfTableData));
    case 'SET_SORTED':
      return state
        .set('sorted', action.sorted)
        .set('selected', '')
        .set('expanded', {});
    case 'SET_EXPANDED':
      return state.set('expanded', action.expanded);
    case 'SET_SELECTED':
      return state.set('selected', action.selected).set('expanded', action.expanded);
    case 'REMOVE_SELECTED':
      return state.set('expanded', {}).set('selected', '');
    case 'GET_USER_EXTENSIONS':
      return state.set('isFetchingUserExtensions', true);
    default:
      return state;
  }
}
