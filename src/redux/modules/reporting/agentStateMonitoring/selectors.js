/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';
import { activeMenuItems } from '../../columnFilterMenus/selectors';

const selectAgentStateMonitoringMap = state => state.get('AgentStateMonitoring');

export const selectAgentStateMonitoringTableData = createSelector(selectAgentStateMonitoringMap, agentMonitoring =>
  agentMonitoring.get('data')
);

const AGENT_STATE_MONITORING_FILTER_NAMES = [
  'Skills',
  'Groups',
  'ChannelType',
  'ReasonLists',
  'Direction',
  'PresenceState'
];

export const getActiveAgentStateMonitoringFilters = (state, props) =>
  fromJS(
    AGENT_STATE_MONITORING_FILTER_NAMES.reduce(
      (entityFilters, entityName) => ({
        ...entityFilters,
        [entityName]: activeMenuItems(state, { ...props, menuType: entityName })
      }),
      {}
    )
  );

export const selectAgentStateMonitoringTableDataJS = createSelector(
  [selectAgentStateMonitoringMap, getActiveAgentStateMonitoringFilters],
  (agentMonitoring, filterLists) =>
    // Filtering data according to the user's filter selections.
    agentMonitoring
      .get('data')
      .filter(data => {
        // Edge case: tenant with no skills/groups/reasonLists enabled.
        if (
          filterLists.get('Skills').size === 0 ||
          filterLists.get('Groups').size === 0 ||
          filterLists.get('ReasonLists').size === 0
        ) {
          return false;
        }
        // For filters that have IDs, simplify into just the IDs.
        const activeSkillIds = filterLists.get('Skills').map(skill => skill.get('id'));
        const activeGroupIds = filterLists.get('Groups').map(group => group.get('id'));
        const activeReasonIds = filterLists.get('ReasonLists').map(reason => reason.get('id'));
        const isAllActive = menuType =>
          filterLists.get(menuType).some(dir => dir.get('name') === 'All' && dir.get('active'));
        // Skill, group, reason, and channelType are checkboxes, so if ANY filter matches the data, we keep the data.
        const skillMatch = data
          .get('skillIds')
          .some(skillId => activeSkillIds.find(activeSkillId => activeSkillId === skillId) !== undefined);
        const groupMatch = data
          .get('groupIds')
          .some(groupId => activeGroupIds.find(activeGroupId => activeGroupId === groupId) !== undefined);
        const reasonMatch =
          data.get('presence') === 'ready' || activeReasonIds.find(reasonId => reasonId === data.get('reasonId'));
        const channelTypeMatch = filterLists.get('ChannelType').some(channelType => {
          // Convert channelType from Normal Form -> camelCase.
          const channelTypeName = channelType
            .get('name')
            .toLowerCase()
            .replace(/\s./g, match => match.trim().toUpperCase());
          return data.getIn(['channelTypes', channelTypeName, 'active']) === 0;
        });
        // Direction and presenceState are radio buttons, so only keep data if there is exact match or 'All' is selected.
        const directionMatch =
          isAllActive('Direction') ||
          filterLists
            .get('Direction')
            .some(direction => direction.get('name').toLowerCase() === data.get('direction').toLowerCase());
        const presenceMatch =
          isAllActive('PresenceState') ||
          filterLists
            .get('PresenceState')
            .some(presenceState => presenceState.get('name').toLowerCase() === data.get('currentState').toLowerCase());
        return skillMatch && groupMatch && reasonMatch && channelTypeMatch && directionMatch && presenceMatch;
      })
      .toJS()
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
  agentMonitoring => (agentMonitoring.get('ReasonLists').size > 0 ? agentMonitoring.get('ReasonLists').toJS() : [])
);

export const selectAgentPresenceReasonLists = createSelector(
  [getAgentReasonLists],
  agentReasons => (agentReasons ? agentReasons.toJS() : [])
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
