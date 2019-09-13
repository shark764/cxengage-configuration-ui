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
  selectedSidePanelId: '',
  BulkSelection: {},
  PresenceStateUpdated: {}
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
export const setSelectedSidePanelId = panelId => ({ type: 'SET_SELECTED_SIDEPANEL_ID', panelId });
export const unsetSelectedSidePanelId = () => setSelectedSidePanelId('');

// Reducer
export default function AgentStateMonitoring(state = initialState, action) {
  switch (action.type) {
    case 'SET_UPDATING_TABLE_DATA_STATUS_$':
      return state.set('status', 'loading');
    case 'SET_AGENT_MONITORING_TABLE_DATA': {
      const { tableData, bulkSelection, presenceStateUpdated, selected } = getAgentMonitoringData(
        state,
        action.realtimeStatistics
      );
      return state
        .set('data', fromJS(tableData))
        .set('BulkSelection', fromJS(bulkSelection))
        .set('PresenceStateUpdated', fromJS(presenceStateUpdated))
        .set('agentSelected', selected)
        .set('menuOpen', selected ? state.get('menuOpen') : '')
        .set('status', 'loaded');
    }
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
      return state.set(
        'ReasonLists',
        fromJS(
          action.arrayOfReasonListData.reduce(
            (lists, reasonList) =>
              reasonList.active
                ? [...lists, { ...reasonList, reasons: categorizeItems(reasonList.reasons, 'reasons') }]
                : lists,
            []
          )
        )
      );
    case 'SET_AGENT_REASON_LISTS_DATA':
      // We add default tenant reason lists to agent list,
      // in order to match what is shown in Skylight to agent.
      return state.setIn(
        ['AgentReasons', action.agentId],
        state
          .get('ReasonLists')
          .filter(
            rl => rl.get('isDefault') || action.arrayOfReasonListData.find(arr => arr.id === rl.get('id')) !== undefined
          )
      );
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
    case 'SET_AGENT_DIRECTION_REJECTED':
    case 'SET_BULK_AGENT_DIRECTION_REJECTED':
    case 'SET_AGENT_PRESENCE_STATE_REJECTED':
    case 'SET_BULK_AGENT_PRESENCE_STATE_REJECTED':
      return state
        .set('updating', false)
        .set('agentSelected', '')
        .set('menuOpen', '');
    case 'SET_AGENT_PRESENCE_STATE_FULFILLED':
    case 'SET_BULK_AGENT_PRESENCE_STATE_FULFILLED': {
      const { response, agentId, agentCurrentState } = action;
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
          // We assume when changing state for a single
          // agent, reason lists exist
          let reasonLists = state.getIn(['AgentReasons', agentId]);
          if (action.type === 'SET_BULK_AGENT_PRESENCE_STATE_FULFILLED') {
            // In case we perform a bulk change of state,
            // we get all reason lists
            reasonLists = state.get('ReasonLists');
          }
          // TODO:
          // When performing a bulk change for agents state
          // we could choose a reason not all the agents have
          // assigned, this won't throw an error but
          // it shouldn't be allowed.
          // This would be release as a known issue.
          response.reasonListName = reasonLists
            .find(reasonList => reasonList.get('id') === response.reasonListId)
            .get('name');
        }
      } else {
        response.reasonId = response.reasonName = response.reasonListId = response.reasonListName = null;
        delete response['reason'];
        if (response.state === 'offline' || action.state === 'offline') {
          response.presence = response.state = 'offline';
          response.bulkChangeItem = false;
          agentSelected = menuOpen = '';
        } else {
          response.presence = 'ready';
          response.state = agentCurrentState === 'busy' ? 'busy' : 'idle';
        }
      }

      // We set new time in new presence state to 1s,
      // this value will be updated with next batch data
      response.currentStateDuration = 1000;

      const agentIndex = state.get('data').findIndex(row => row.get('agentId') === agentId);

      return (
        state
          .updateIn(['data', agentIndex], item => item.merge(fromJS(response)))
          // Remove row from bulk selection when setting
          // agent as "offline"
          .deleteIn(['BulkSelection', response.state === 'offline' ? agentId : ''])
          // On every presene state change, we store
          // new presence and state (with reason) until presence/state
          // comming within batch data equals new ones.
          // We do this since STAGING/PROD enviroments have the same polling
          // rate, but has a delay for reporting statistics update.
          .setIn(
            ['PresenceStateUpdated', agentId],
            fromJS({
              presence: response.presence,
              state: response.state,
              reasonId: response.reasonId,
              reasonName: response.reasonName,
              reasonListId: response.reasonListId,
              reasonListName: response.reasonListName,
              // On every change, we initialize iterations cound to 0,
              // we will increment this count on every data refresh
              // until it reach two, then we removed from redux state.
              iterations: 0
            })
          )
          // Stop spinner icon
          .set('updating', false)
          .set('agentSelected', agentSelected)
          .set('menuOpen', menuOpen)
      );
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
        return state.deleteIn(['BulkSelection', agentId]);
      }
    }
    case 'SET_SELECTED_ENTITY_ID':
    case 'SET_SELECTED_SIDEPANEL_ID':
      return state.set('selectedSidePanelId', action.panelId).set('BulkSelection', fromJS({}));
    default:
      return state;
  }
}

const getAgentMonitoringData = (state, realtimeStatistics) => {
  // We need to update bulk selection on
  // every loop, to keep proper agents selected.
  // This way we ensure we won't perform actions
  // on agents that went offline.
  const bulkSelection = {},
    presenceStateUpdated = {};
  let selected = '';
  const tableData = realtimeStatistics.resources.reduce((newAgents, agent) => {
    const agentStates = realtimeStatistics.agentStates.filter(state => state.agentId === agent.agentId);
    const currentAgentState = agentStates[0] || {};
    const {
      currentStateDuration,
      offeredWorkOffers,
      acceptedWorkOffers,
      rejectedWorkOffers,
      acceptedWorkOffersRate,
      awayTime,
      awayRate,
      groups = [],
      // Agents can have no skills assigned
      skills = []
    } = currentAgentState;

    let agentSelected = state.get('agentSelected') === agent.agentId;
    // Keeping old agent-selected the same if agent
    // still exists within data.
    if (agentSelected) {
      selected = agent.agentId;
    }

    let agentPresenceStateUpdated = state.getIn(['PresenceStateUpdated', agent.agentId], undefined);
    // If state has been stored less than two iterations
    // then we apply this state.
    // ////////////////////////////////////////
    // NOTE: This solution is used due to reporting
    // process delay, DEV/QE don't have any delay, but
    // statistics in DEV/STAGING are not being updated
    // inmediatly.
    // ////////////////////////////////////////
    if (agentPresenceStateUpdated && agentPresenceStateUpdated.get('iterations') < 2) {
      // We keep state-updates List by counting iterations
      // after change was applied, every state change has to remain
      // for at least two data refresh.
      // If count has reached two, then we don't included
      // it in List for next data refresh.
      presenceStateUpdated[agent.agentId] = {
        presence: agentPresenceStateUpdated.get('presence'),
        state: agentPresenceStateUpdated.get('state'),
        reasonId: agentPresenceStateUpdated.get('reasonId'),
        reasonName: agentPresenceStateUpdated.get('reasonName'),
        reasonListId: agentPresenceStateUpdated.get('reasonListId'),
        reasonListName: agentPresenceStateUpdated.get('reasonListName'),
        // We increment iterations for this change, if count is two
        // on next data refresh it won't be applied.
        iterations: agentPresenceStateUpdated.get('iterations') + 1
      };
    }

    let bulkChecked = state.getIn(['BulkSelection', agent.agentId, 'checked'], false);
    // If it was checked, then we add it to new
    // map. Then we replace old selection.
    if (bulkChecked) {
      bulkSelection[agent.agentId] = { agentId: agent.agentId, sessionId: agent.sessionId, checked: true };
    }
    agent = {
      // Data for internal use
      id: agent.agentId,
      // We update new bulk-selection, to ensure we are
      // not performing actions on agents who already went offline
      bulkChangeItem: bulkChecked,
      // We need to ensure old agentSelected hasn't been removed
      // from data due to agent going offline
      agentSelected,
      // Agent data
      ...agent,
      // We set stored presence and state (with reason) for
      // at least two iterations, this way we ensure reporting
      // statistics are updated properly after a state change.
      ...(presenceStateUpdated[agent.agentId] && { ...presenceStateUpdated[agent.agentId] }),
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
      currentStateDuration,
      offeredWorkOffers,
      acceptedWorkOffers,
      rejectedWorkOffers,
      acceptedWorkOffersRate,
      awayTime,
      awayRate,
      groups,
      skills
    };

    newAgents.push(agent);
    return newAgents;
  }, []);
  return { tableData, bulkSelection, presenceStateUpdated, selected };
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
