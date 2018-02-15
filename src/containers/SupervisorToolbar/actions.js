import * as ACTIONS from './constants';

export function toggleTwilioEnabled() {
  return {
    type: ACTIONS.TOGGLE_TWILIO_ENABLED
  };
}

export function toggleTwilioIsDefaultExtension() {
  return {
    type: ACTIONS.TOGGLE_TWILIO_IS_DEFAULT_EXTENSION
  };
}
export function setSilentMonitoringStatus(status) {
  return {
    type: ACTIONS.SET_SILENT_MONITORING_STATUS,
    status
  };
}
export function setSilentMonitoringInteractionId(interactionId) {
  return {
    type: ACTIONS.SET_SILENT_MONITORING_INTERACTION_ID,
    interactionId
  };
}
export function toggleMute() {
  return {
    type: ACTIONS.TOGGLE_MUTE
  };
}
