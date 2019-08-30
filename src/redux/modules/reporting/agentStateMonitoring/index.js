/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
export const initialState = fromJS({
  status: 'not-loaded',
  data: [],
  sorted: [],
  expanded: {},
  selected: '',
  agentSelected: '',
  menuOpen: '',
  updating: false,
  ReasonLists: [],
  AgentReasons: {},
  PendingAway: {},
  selectedSidePanelId: '',
  BulkSelection: {},
  monitorAllCallsPermission: ['MONITOR_ALL_CALLS'],
  bargeAllCallsPermission: ['BARGE_ALL_CALLS'],
  viewAllMonitoredCallsPermission: ['VIEW_ALL_MONITORED_CALLS']
});

// Actions
export const updateRealtimeStatisticsBatchData = realtimeStatistics => ({
  type: 'SET_AGENT_MONITORING_TABLE_DATA',
  realtimeStatistics
});
export const setExpanded = expanded => ({ type: 'SET_AGENT_MONITORING_TABLE_ROW_EXPANDED', expanded });
export const setSelected = (selected, expanded, menu = '') => ({
  type: 'SET_AGENT_MONITORING_TABLE_ROW_SELECTED',
  selected,
  expanded,
  menu
});
export const setSorted = sorted => ({ type: 'SET_AGENT_MONITORING_TABLE_ROW_SORTED', sorted });
export const removeSelected = () => ({ type: 'REMOVE_AGENT_MONITORING_TABLE_ROW_SELECTED' });
export const setMenuOpen = (menu = '') => ({ type: 'SET_AGENT_MONITORING_TABLE_MENU_OPEN', menu });
export const startAgentStateMonitoring = () => ({ type: 'START_AGENT_MONITORING_REPORTING_BATCH_REQUEST_$' });
export const startReportingSubscriptions = () => ({ type: 'START_AGENT_MONITORING_REPORTING_SUBSCRIPTION_$' });
export const reportingSubscriptionStarted = () => ({ type: 'AGENT_MONITORING_REPORTING_SUBSCRIPTION_STARTED_$' });
export const setAgentDirection = (agentId, sessionId, direction) => ({
  type: 'SET_AGENT_DIRECTION',
  agentId,
  sessionId,
  direction
});
export const setAgentPresenceState = (
  agentId,
  sessionId,
  state,
  reason = null,
  reasonId = null,
  reasonListId = null
) => ({
  type: 'SET_AGENT_PRESENCE_STATE',
  agentId,
  sessionId,
  state,
  reason,
  reasonId,
  reasonListId
});
export const getAgentReasonLists = agentId => ({ type: 'GET_AGENT_REASON_LISTS', agentId });
export const setAgentSelected = (selected, menu = '') => ({ type: 'SET_AGENT_SELECTED', selected, menu });
export const removeAgentSelected = () => ({ type: 'REMOVE_AGENT_SELECTED' });

export const setAgentPendingAway = (
  agentId,
  sessionId,
  state,
  reason = null,
  reasonId = null,
  reasonListId = null
) => ({
  type: 'SET_AGENT_PENDING_AWAY',
  agentId,
  sessionId,
  state,
  reason,
  reasonId,
  reasonListId
});
export const removeAgentPendingAway = agentId => ({ type: 'REMOVE_AGENT_PENDING_AWAY', agentId });

export const forceLogoutAgent = (agentId, sessionId, state = 'offline') => ({
  type: 'FORCE_LOGOUT_AGENT',
  agentId,
  sessionId,
  state
});

export const toggleBulkAgentChange = (agentId, sessionId, bool) => ({
  type: 'TOGGLE_BULK_AGENT_CHANGE',
  agentId,
  sessionId,
  bool
});
export const setBulkAgentDirection = direction => ({ type: 'SET_BULK_AGENT_DIRECTION', direction });
export const setBulkAgentPresenceState = (state, reason = null, reasonId = null, reasonListId = null) => ({
  type: 'SET_BULK_AGENT_PRESENCE_STATE',
  state,
  reason,
  reasonId,
  reasonListId
});
export const setBulkAgentPendingAway = (agents, state, reason = null, reasonId = null, reasonListId = null) => ({
  type: 'SET_BULK_AGENT_PENDING_AWAY',
  agents,
  state,
  reason,
  reasonId,
  reasonListId
});
export const setSelectedSidePanelId = panelId => ({ type: 'SET_SELECTED_SIDEPANEL_ID', panelId });
export const unsetSelectedSidePanelId = () => setSelectedSidePanelId('');

// Reducer
export default function AgentStateMonitoring(state = initialState, action) {
  switch (action.type) {
    case 'SET_UPDATING_TABLE_DATA_STATUS_$':
      return state.set('status', 'loading');
    case 'SET_AGENT_MONITORING_TABLE_DATA':
      return state
        .set('data', fromJS(getAgentMonitoringData(state, action.realtimeStatistics)))
        .set('status', 'loaded');
    case 'SET_AGENT_MONITORING_TABLE_ROW_SORTED':
      return state
        .set('sorted', action.sorted)
        .set('selected', '')
        .set('expanded', {})
        .set('menuOpen', '');
    case 'SET_AGENT_MONITORING_TABLE_ROW_EXPANDED':
      return state.set('expanded', action.expanded);
    case 'SET_AGENT_MONITORING_TABLE_ROW_SELECTED':
      return state
        .set('selected', action.selected)
        .set('expanded', action.expanded)
        .set('agentSelected', action.selected)
        .set('menuOpen', action.menu);
    case 'REMOVE_AGENT_MONITORING_TABLE_ROW_SELECTED':
      return state.set('expanded', {}).set('selected', '');
    case 'SET_AGENT_MONITORING_TABLE_MENU_OPEN':
      return state.set('menuOpen', action.menu);
    case 'SET_REASON_LISTS_DATA':
    case 'SET_AGENT_REASON_LISTS_DATA': {
      const categorizeReasons = action.arrayOfReasonListData.reduce((lists, reasonList) => {
        if (reasonList.active) {
          reasonList.reasons = categorizeItems(reasonList.reasons, 'reasons');
          lists.push(reasonList);
        }
        return lists;
      }, []);
      if (action.agentId) {
        return state.setIn(
          ['AgentReasons', action.agentId],
          fromJS(
            [
              ...categorizeReasons,
              // We add default tenant reason lists to agent list,
              // in order to match what is shown in Skylight to agent.
              ...state
                .get('ReasonLists')
                .filter(rl => rl.get('isDefault') && categorizeReasons.find(ct => ct.id === rl.get('id')) === undefined)
                .toJS()
            ].sort((a, b) => (a.name > b.name ? 1 : -1))
          )
        );
      }
      return state.set('ReasonLists', fromJS(categorizeReasons));
    }
    case 'SET_AGENT_SELECTED':
      return state.set('agentSelected', action.selected).set('menuOpen', action.menu);
    case 'REMOVE_AGENT_SELECTED':
      return state.set('agentSelected', '').set('menuOpen', '');
    case 'SET_AGENT_DIRECTION':
      return state.set('updating', true);
    case 'SET_AGENT_DIRECTION_FULFILLED':
    case 'SET_BULK_AGENT_DIRECTION_FULFILLED': {
      const agentIndex = state.get('data').findIndex(row => row.get('agentId') === action.agentId);
      return state.updateIn(['data', agentIndex], item => item.merge(fromJS(action.response))).set('updating', false);
    }
    case 'SET_AGENT_PRESENCE_STATE':
    case 'FORCE_LOGOUT_AGENT':
      return state.set('updating', true);
    case 'SET_AGENT_PRESENCE_STATE_FULFILLED':
    case 'SET_BULK_AGENT_PRESENCE_STATE_FULFILLED': {
      const { response, agentId } = action;
      let agentSelected = state.get('agentSelected');
      let menuOpen = state.get('menuOpen');

      // Resource-capacity statistics manage state as presence
      // so we switch them and set the correct state value
      if (response.state === 'notready') {
        response.presence = 'not-ready';
        response.state = 'away';
        // If agent was set as "away", it has an "away-reason"
        if (response.reasonId) {
          response.reasonName = response.reason;
          delete response['reason'];
          let reasonLists = state.getIn(['AgentReasons', agentId]);
          if (action.type === 'SET_BULK_AGENT_PRESENCE_STATE_FULFILLED') {
            reasonLists = state.get('ReasonLists');
          }
          // TODO
          // When performing a bulk change for agents state
          // we could choose a reason not all the agents have
          // assigned, this won't throw an error but
          // it shouldn't be allowed.
          // This would be release as a known issue.
          response.reasonListName = reasonLists
            .find(reasonList => reasonList.get('id') === response.reasonListId)
            .get('name');
        }
      } else if (response.state === 'ready' || response.state === 'offline') {
        response.presence = 'ready';
        response.state = 'idle';
        response.reasonId = response.reasonName = response.reasonListId = response.reasonListName = null;
        delete response['reason'];
      }
      if (response.state === 'offline' || action.state === 'offline') {
        response.presence = response.state = 'offline';
        agentSelected = menuOpen = '';
      }
      // We set new time in new presence state to 1s,
      // this value will be updated with next batch data
      response.currentStateDuration = 1000;
      // We take agent out from "PendingAway" map
      // since we already changed state
      response.pendingAway = false;

      const agentIndex = state.get('data').findIndex(row => row.get('agentId') === agentId);

      return state
        .updateIn(['data', agentIndex], item => item.merge(fromJS(response)))
        .deleteIn(['PendingAway', agentId])
        .set('updating', false)
        .set('agentSelected', agentSelected)
        .set('menuOpen', menuOpen);
    }
    case 'FORCE_LOGOUT_AGENT_FULFILLED': {
      const { response, agentId } = action;
      // State of agent now is offline, and will be
      // removed from table on next data update
      response.presence = response.state = 'offline';
      // We set new time in new presence state to 1s,
      // this value will be updated with next batch data
      response.currentStateDuration = 1000;
      // We take agent out from "PendingAway" map
      // since we already changed state
      response.pendingAway = false;
      const agentIndex = state.get('data').findIndex(row => row.get('agentId') === agentId);
      return state
        .updateIn(['data', agentIndex], item => item.merge(fromJS(response)))
        .deleteIn(['PendingAway', action.agentId])
        .set('updating', false)
        .set('agentSelected', '')
        .set('menuOpen', '');
    }
    case 'SET_AGENT_PENDING_AWAY': {
      const { agentId, sessionId, reason, reasonId, reasonListId } = action;
      const agentIndex = state.get('data').findIndex(row => row.get('agentId') === agentId);
      if (agentIndex !== -1) {
        return state
          .setIn(['data', agentIndex, 'pendingAway'], true)
          .setIn(
            ['PendingAway', agentId],
            fromJS({ agentId, sessionId, state: action.state, reason, reasonId, reasonListId })
          );
      }
      // If agent is not in table data, then remove
      // from pending state
      return state.deleteIn(['PendingAway', action.agentId]);
    }
    case 'REMOVE_AGENT_PENDING_AWAY': {
      const { agentId } = action;
      const agentIndex = state.get('data').findIndex(row => row.get('agentId') === agentId);
      if (agentIndex !== -1) {
        return state.setIn(['data', agentIndex, 'pendingAway'], false).deleteIn(['PendingAway', action.agentId]);
      }
      // If agent is not in table data, then remove
      // from pending state
      return state.deleteIn(['PendingAway', action.agentId]);
    }
    case 'TOGGLE_BULK_AGENT_CHANGE': {
      const { agentId, sessionId } = action;
      const agentIndex = state.get('data').findIndex(row => row.get('agentId') === agentId);
      if (agentIndex !== -1 && action.bool !== undefined) {
        if (action.bool) {
          return state
            .setIn(['data', agentIndex, 'bulkChangeItem'], action.bool)
            .setIn(['BulkSelection', agentId], fromJS({ agentId, sessionId, checked: action.bool }))
            .set('selectedSidePanelId', 'bulk');
        }
        // We clean BulkSelection when "Unselect" is
        // pressed, this way we ensure to close the sidepanel
        return state
          .setIn(['data', agentIndex, 'bulkChangeItem'], action.bool)
          .set('BulkSelection', fromJS({}))
          .set('selectedSidePanelId', '');
      } else if (agentIndex !== -1) {
        const checked = state.getIn(['BulkSelection', agentId, 'checked'], false);
        return state
          .setIn(['data', agentIndex, 'bulkChangeItem'], !checked)
          .setIn(['BulkSelection', agentId], fromJS({ agentId, sessionId, checked: !checked }))
          .set('selectedSidePanelId', 'bulk');
      } else {
        return state;
      }
    }
    case 'SET_BULK_AGENT_PENDING_AWAY':
      return state.set('PendingAway', fromJS(action.agents));
    case 'SET_SELECTED_ENTITY_ID':
    case 'SET_SELECTED_SIDEPANEL_ID':
      return state.set('selectedSidePanelId', action.panelId).set('BulkSelection', fromJS({}));
    default:
      return state;
  }
}

const getAgentMonitoringData = (state, realtimeStatistics) => {
  return realtimeStatistics.resources.reduce((newAgents, agent) => {
    const agentStates = realtimeStatistics.agentStates.filter(state => state.agentId === agent.agentId);
    const currentAgentState = agentStates[0];

    agent = {
      // Data for internal use
      id: agent.agentId,
      bulkChangeItem: state.getIn(['BulkSelection', agent.agentId, 'checked'], false),
      pendingAway: state.getIn(['PendingAway', agent.agentId]) !== undefined,
      // Agent data
      ...agent,
      channelTypes: agent.capacity
        ? agent.capacity.reduce(
            (acc, item) => {
              for (
                let index = 0, channelsCapacity = Object.keys(item.channels);
                index < channelsCapacity.length;
                index++
              ) {
                acc[channelsCapacity[index]].active = Math.max(
                  item.channels[channelsCapacity[index]],
                  acc[channelsCapacity[index]].active
                );
                acc[channelsCapacity[index]].display = true;
              }
              return acc;
            },
            {
              voice: { active: 0, display: false },
              messaging: { active: 0, display: false },
              email: { active: 0, display: false },
              sms: { active: 0, display: false },
              workItem: { active: 0, display: false }
            }
          )
        : [],
      currentStateDuration: currentAgentState && currentAgentState.currentStateDuration,
      offeredWorkOffers: currentAgentState && currentAgentState.offeredWorkOffers,
      acceptedWorkOffers: currentAgentState && currentAgentState.acceptedWorkOffers,
      rejectedWorkOffers: currentAgentState && currentAgentState.rejectedWorkOffers,
      acceptedWorkOffersRate: currentAgentState && currentAgentState.acceptedWorkOffersRate,
      awayTime: currentAgentState && currentAgentState.awayTime,
      awayRate: currentAgentState && currentAgentState.awayRate,
      groups: currentAgentState ? currentAgentState.groups : [],
      skills: currentAgentState ? currentAgentState.skills : []
    };

    newAgents.push(agent);
    return newAgents;
  }, []);
};

const categorizeItems = (rawItems, name) => {
  const categorizedItems = [];
  rawItems.forEach(item => {
    if (item.hierarchy[0]) {
      const existingCategoryIndex = categorizedItems.findIndex(category => category.name === item.hierarchy[0]);
      if (existingCategoryIndex > -1) {
        categorizedItems[existingCategoryIndex][name].push(item);
      } else {
        categorizedItems.push({ name: item.hierarchy[0], [name]: [item], type: 'category' });
      }
    } else {
      categorizedItems.push(item);
    }
  });

  categorizedItems.sort((a, b) => {
    if (a.type === 'category' && b.type === 'category') {
      a[name].sort((c, d) => c.sortOrder - d.sortOrder);
      b[name].sort((c, d) => c.sortOrder - d.sortOrder);
      return a[name][0].sortOrder - b[name][0].sortOrder;
    } else if (a.type === 'category') {
      a[name].sort((c, d) => c.sortOrder - d.sortOrder);
      return a[name][0].sortOrder - b.sortOrder;
    } else if (b.type === 'category') {
      b[name].sort((c, d) => c.sortOrder - d.sortOrder);
      return a.sortOrder - b[name][0].sortOrder;
    } else {
      return a.sortOrder - b.sortOrder;
    }
  });
  return categorizedItems;
};
