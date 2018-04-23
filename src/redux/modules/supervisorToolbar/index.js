/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
const initialState = fromJS({
  twilio: { enabled: false, isDefaultExtension: false },
  silentMonitoring: { status: 'offline', interactionId: 'na' },
  muted: true
});

// Actions
export const toggleTwilioEnabled = () => ({ type: 'TOGGLE_TWILIO_ENABLED' });
export const toggleMute = () => ({ type: 'TOGGLE_MUTE' });
export const toggleTwilioIsDefaultExtension = () => ({
  type: 'TOGGLE_TWILIO_IS_DEFAULT_EXTENSION'
});
export const setSilentMonitoringStatus = status => ({
  type: 'SET_SILENT_MONITORING_STATUS',
  status
});
export const setSilentMonitoringInteractionId = interactionId => ({
  type: 'SET_SILENT_MONITORING_INTERACTION_ID',
  interactionId
});
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
    case 'TOGGLE_TWILIO_ENABLED':
      return state.setIn(
        ['twilio', 'enabled'],
        !state.getIn(['twilio', 'enabled'])
      );
    case 'TOGGLE_TWILIO_IS_DEFAULT_EXTENSION':
      return state.setIn(
        ['twilio', 'isDefaultExtension'],
        !state.getIn(['twilio', 'isDefaultExtension'])
      );
    case 'SET_SILENT_MONITORING_STATUS':
      return state.setIn(['silentMonitoring', 'status'], action.status);
    case 'SET_SILENT_MONITORING_INTERACTION_ID':
      return state.setIn(
        ['silentMonitoring', 'interactionId'],
        action.interactionId
      );
    case 'TOGGLE_MUTE':
      return state.set('muted', !state.get('muted'));
    default:
      return state;
  }
}
