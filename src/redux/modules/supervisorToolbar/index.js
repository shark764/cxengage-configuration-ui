/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
export const initialState = fromJS({
  twilio: { enabled: false },
  silentMonitoring: { status: 'offline', interactionId: 'na' },
  muted: true
});

// Actions
export const supervisorSubscriptionsAdded = subscription => ({
  type: 'SUPERVISOR_TOOLBAR_SUBSCRIPTIONS_ADDED_$',
  subscription
});
export const requestingMonitorCall = interactionId => ({
  type: 'REQUESTING_MONITOR_CALL',
  interactionId
});
export const monitorInteractionRequested = interactionId => ({
  type: 'MONITOR_INTERACTION_REQUESTED',
  interactionId
});
export const toggleMuteRequested = () => ({ type: 'TOGGLE_MUTE_REQUESTED_$' });
export const hangUpRequested = () => ({ type: 'HANG_UP_REQUESTED_$' });
export const requestingToggleMute = () => ({ type: 'REQUESTING_TOGGLE_MUTE' });
export const requestingHangUp = () => ({ type: 'REQUESTING_HANG_UP' });
export const startSupervisorToolbarSubscriptions = () => ({
  type: 'START_SUPERVISOR_TOOLBAR_$'
});

// Reducer
export default function supervisorToolbarReducer(state = initialState, action) {
  switch (action.type) {
    case 'cxengage/twilio/device-ready':
      return state.setIn(
        ['twilio', 'enabled'],
        !state.getIn(['twilio', 'enabled'])
      );
    case 'cxengage/interactions/voice/silent-monitor-start':
      return state.setIn(['silentMonitoring', 'status'], 'connected');
    case 'cxengage/session/sqs-shut-down':
    case 'cxengage/interactions/voice/silent-monitor-end':
      return state.setIn(['silentMonitoring', 'status'], 'offline');
    case 'MONITOR_INTERACTION_REQUESTED':
      return state.update('silentMonitoring', silentMonitoring =>
        silentMonitoring
          .set('status', 'connecting')
          .set('interactionId', action.interactionId)
      );
    case 'cxengage/interactions/voice/unmute-acknowledged':
      return state.set('muted', false);
    case 'cxengage/interactions/voice/mute-acknowledged':
      return state.set('muted', true);
    default:
      return state;
  }
}
