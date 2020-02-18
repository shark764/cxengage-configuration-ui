/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';

const selectAgentStateMonitoringMap = state => state.get('AgentStateMonitoring');

export const selectAgentStateMonitoringTableData = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('data')
);
export const selectAgentStateMonitoringTableDataJS = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('data').toJS()
);
export const selectAgentStateMonitoringSorted = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('sorted')
);
export const selectAgentStateMonitoringExpanded = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('expanded')
);
export const selectAgentStateMonitoringSelected = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('selected')
);
export const selectCurrentAgentSelected = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('agentSelected')
);
export const selectCurrentMenuOpen = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('menuOpen')
);
export const getSelectedSidePanelId = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('selectedSidePanelId')
);
export const selectAgentStateMonitoringStatus = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('status')
);
export const isUpdatingAgentData = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('updating')
);

export const getSelectedAgentsBulkChangeItems = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('BulkSelection').filter(item => item.get('checked'))
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
  agentMonitoring =>
    agentMonitoring.get('ReasonLists').size > 0
      ? agentMonitoring
          .get('ReasonLists')
          .filter(list => list.get('name') !== 'System Presence Reasons')
          .toJS()
      : []
);

export const selectAgentPresenceReasonLists = createSelector(
  [getAgentReasonLists],
  agentReasons =>
    agentReasons ? agentReasons.filter(list => list.get('name') !== 'System Presence Reasons').toJS() : []
);

export const getAgentCurrentState = (state, agentId) => {
  const agentData = selectAgentStateMonitoringMap(state)
    .get('data')
    .find(agent => agent.get('agentId') === agentId);
  return agentData && agentData.get('state');
};

export const getBulkSelectedBusyAgents = createSelector(
  [selectAgentStateMonitoringTableData],
  monitoringData =>
    monitoringData
      ? monitoringData.filter(item => item.get('bulkChangeItem') && item.get('state') === 'busy')
      : fromJS([])
);
export const countBulkSelectedBusyAgents = createSelector(
  [getBulkSelectedBusyAgents],
  busyBulkSelected => busyBulkSelected.size
);

export const isAgentStale = (state, agentId) => {
  const agentData = state
    .get(['AgentStateMonitoring', 'data'], new List([]))
    .find(agent => agent.get('agentId') === agentId);
  return agentData && agentData.get('isStale');
};