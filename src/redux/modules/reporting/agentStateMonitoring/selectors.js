/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';
import { activeMenuItems, areAllActive } from '../../columnFilterMenus/selectors';

const selectAgentStateMonitoringMap = (state) => state.get('AgentStateMonitoring');

export const selectAgentStateMonitoringTableData = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('data')
);

const AGENT_STATE_MONITORING_FILTER_NAMES = [
  'Skills',
  'Groups',
  'ChannelType',
  'ReasonLists',
  'Direction',
  'PresenceState',
];

export const getActiveAgentStateMonitoringFilters = (state, props) =>
  fromJS(
    AGENT_STATE_MONITORING_FILTER_NAMES.reduce(
      (entityFilters, entityName) => [
        ...entityFilters,
        {
          name: entityName,
          menuItems: activeMenuItems(state, { ...props, menuType: entityName }),
          allActive: areAllActive(state, { ...props, menuType: entityName }),
        },
      ],
      []
    )
  );

const menuNameToDataIdName = (menuName) =>
  menuName.charAt(0).toLowerCase() + menuName.substring(1, menuName.length - 1) + 'Ids';

const isDataMatchingFilter = (data, filter, propNameForMatch = '') => {
  const menuItems = filter.get('menuItems');
  const menuItemAll = menuItems.find((menuItem) => menuItem.get('name') === 'All');
  if (menuItemAll || filter.get('allActive')) {
    // All active, data matches by default.
    return true;
  } else if (menuItems.size <= 0) {
    // Edge case: nothing selected for a filter, or a tenant with no skills/groups/reasonLists enabled.
    return false;
  }
  if (menuItems.getIn([0, 'id'])) {
    // Match on ID.
    return data
      .get(menuNameToDataIdName(filter.get('name')))
      .some((menuItemId) => menuItems.find((menuItem) => menuItem.get('id') === menuItemId));
  } else if (filter.get('name') === 'ChannelType') {
    return menuItems.some((channelType) => {
      // Convert channelType from Normal Form -> camelCase.
      const channelTypeName = channelType
        .get('name')
        .toLowerCase()
        .replace(/\s./g, (match) => match.trim().toUpperCase());
      return data.getIn(['channelTypes', channelTypeName, 'active']) > 0;
    });
  } else {
    // Match on name.
    return menuItems.some(
      (menuItem) => menuItem.get('name').toLowerCase() === data.get(propNameForMatch).toLowerCase()
    );
  }
};

export const selectAgentStateMonitoringTableDataJS = createSelector(
  [selectAgentStateMonitoringMap, getActiveAgentStateMonitoringFilters],
  (agentMonitoring, filters) =>
    // Filtering data according to the user's filter selections.
    agentMonitoring
      .get('data')
      .filter((data) =>
        filters.reduce((currentResult, filter) => {
          switch (filter.get('name')) {
            // Skill, group, reason, and channelType are checkboxes -> if ANY filter matches we keep the data.
            case 'Skills':
            case 'Groups':
              return currentResult && isDataMatchingFilter(data, filter);
            case 'ReasonLists':
              // If user is in Ready state, they won't have a valid reasonId applied.
              return (
                currentResult &&
                (data.get('presence') === 'ready' ||
                  filter.get('menuItems').find((menuItem) => menuItem.get('id') === data.get('reasonId')))
              );
            case 'ChannelType':
              return currentResult && isDataMatchingFilter(data, filter);
            // Direction and presenceState are radio buttons -> keep data if there is exact match or 'All' selected.
            case 'Direction':
              return currentResult && isDataMatchingFilter(data, filter, 'direction');
            case 'PresenceState':
              return currentResult && isDataMatchingFilter(data, filter, 'currentState');
            default:
              return currentResult;
          }
        }, true)
      )
      .toJS()
);

export const selectAgentStateMonitoringSorted = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('sorted')
);
export const selectAgentStateMonitoringExpanded = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('expanded')
);
export const selectAgentStateMonitoringSelected = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('selected')
);
export const selectCurrentAgentSelected = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('agentSelected')
);
export const selectCurrentMenuOpen = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('menuOpen')
);
export const getSelectedSidePanelId = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('selectedSidePanelId')
);
export const selectAgentStateMonitoringStatus = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('status')
);
export const isUpdatingAgentData = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('updating')
);

export const getSelectedAgentsBulkChangeItems = createSelector(selectAgentStateMonitoringMap, (agentMonitoring) =>
  agentMonitoring.get('BulkSelection').filter((item) => item.get('checked'))
);

export const hasAgentReasonLists = createSelector(
  [selectAgentStateMonitoringMap, selectCurrentAgentSelected],
  (agentMonitoring, selected) => agentMonitoring.get('AgentReasons').has(selected)
);

export const getAgentReasonLists = createSelector(
  [selectAgentStateMonitoringMap, selectCurrentAgentSelected],
  (agentMonitoring, selected) => agentMonitoring.getIn(['AgentReasons', selected])
);

export const selectPresenceReasonLists = createSelector(
  [selectAgentStateMonitoringMap],
  (agentMonitoring) => (agentMonitoring.get('ReasonLists').size > 0 ? agentMonitoring.get('ReasonLists').toJS() : [])
);

export const selectAgentPresenceReasonLists = createSelector(
  [getAgentReasonLists],
  (agentReasons) => (agentReasons ? agentReasons.toJS() : [])
);

export const getAgentCurrentState = (state, agentId) => {
  const agentData = selectAgentStateMonitoringMap(state)
    .get('data')
    .find((agent) => agent.get('agentId') === agentId);
  return agentData && agentData.get('state');
};

export const getBulkSelectedBusyAgents = createSelector(
  [selectAgentStateMonitoringTableData],
  (monitoringData) =>
    monitoringData
      ? monitoringData.filter((item) => item.get('bulkChangeItem') && item.get('state') === 'busy')
      : fromJS([])
);
export const countBulkSelectedBusyAgents = createSelector(
  [getBulkSelectedBusyAgents],
  (busyBulkSelected) => busyBulkSelected.size
);

export const isAgentStale = (state, agentId) => {
  const agentData = state
    .get(['AgentStateMonitoring', 'data'], new List([]))
    .find((agent) => agent.get('agentId') === agentId);
  return agentData && agentData.get('isStale');
};
