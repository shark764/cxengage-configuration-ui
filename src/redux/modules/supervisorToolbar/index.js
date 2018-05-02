/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
const initialState = fromJS({
  twilio: { enabled: false },
  silentMonitoring: { status: 'offline', interactionId: 'na' },
  muted: true
});

// Actions
export const requestingToggleMute = () => ({ type: 'REQUESTING_TOGGLE_MUTE' });
export const requestingMonitorCall = interactionId => ({
  type: 'REQUESTING_MONITOR_CALL',
  interactionId
});
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
    case 'cxengage/session/sqs-shut-down':
    case 'cxengage/interactions/voice/silent-monitor-end':
      let status =
        action.type === 'cxengage/interactions/voice/silent-monitor-start'
          ? 'connected'
          : 'offline';
      return state.setIn(['silentMonitoring', 'status'], status);
    case 'monitorCall': {
      const { interactionId, status } = action.response;
      return state.update('silentMonitoring', silentMonitoring =>
        silentMonitoring
          .set('status', status)
          .set('interactionId', interactionId)
      );
    }
    case 'cxengage/interactions/voice/unmute-acknowledged':
      return state.set('muted', false);
    case 'cxengage/interactions/voice/mute-acknowledged':
      return state.set('muted', true);
    default:
      return state;
  }
}
