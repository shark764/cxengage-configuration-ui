/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
export const constructInitialState = () => {
  let initialState = {
    twilio: { enabled: false },
    silentMonitoring: {
      status: 'offline',
      interactionId: 'na',
      sessionId: ''
    },
    canSilentMonitor: false,
    loadingUserStatus: false,
    muted: true
  };
  // We want to keep the previous sessionId stored in localStorage. This handles cases where the
  // SupervisorToolbar gets destroyed + rebuilt when leaving and returning to the
  // interactionMonitoring page.
  let storedState = localStorage.getItem('SupervisorToolbar');
  if (storedState !== 'undefined' && storedState != null) {
    storedState = JSON.parse(storedState);
    let storedSessionId = storedState.silentMonitoring && storedState.silentMonitoring.sessionId;
    if (storedSessionId) {
      initialState.silentMonitoring.sessionId = storedSessionId;
    }
  }
  return fromJS(initialState);
};

// Actions
export const getCanSilentMonitor = () => ({
  type: 'GET_CAN_SILENT_MONITOR'
});
export const supervisorSubscriptionsAdded = subscription => ({
  type: 'SUPERVISOR_TOOLBAR_SUBSCRIPTIONS_ADDED_$',
  subscription
});
/**
 * 1.
  monitorInteractionInitialization happens first to start the process
  it saves the data in state as a placeholder of what we would like/expect to happen
  there is an epic that listens for this action that then calls the requestingMonitorCall action
  that actually makes the request to monitor the call to the sdk
 */

export const monitorInteractionInitialization = (interactionId, chosenExtension) => ({
  type: 'MONITOR_INTERACTION_INITIALIZATION',
  interactionId,
  chosenExtension
});
export const monitorInteractionInitializationCompleted = () => ({
  type: 'MONITOR_INTERACTION_INITIALIZATION_COMPLETED_$'
});
/**
 * 2.
 requestingMonitorCall is the action that actually kicks off the request to the sdk to monitor the call
 the transitionCall property is when you move from one call directly to the next isntead of hanging up
 and taking the next call manually
 */
export const requestingMonitorCall = (interactionId, transitionCall, chosenExtension) => ({
  type: 'REQUESTING_MONITOR_CALL',
  interactionId,
  transitionCall,
  chosenExtension
});
/**
 * 3.
  monitorInteractionRequested happens when the process is done and you should now be
  monitoring the call as long as there were no errors
 */
export const monitorInteractionRequested = interactionId => ({
  type: 'MONITOR_INTERACTION_REQUESTED',
  interactionId
});
export const toggleMuteRequested = () => ({ type: 'TOGGLE_MUTE_REQUESTED_$' });
export const hangUpRequested = () => ({ type: 'HANG_UP_REQUESTED_$' });
export const transitionCallEnding = () => ({ type: 'TRANSITION_CALL_ENDING' });
export const requestingToggleMute = () => ({ type: 'REQUESTING_TOGGLE_MUTE' });
export const requestingHangUp = () => ({ type: 'REQUESTING_HANG_UP' });
export const startSupervisorToolbarSubscriptions = () => ({
  type: 'START_SUPERVISOR_TOOLBAR_$'
});
export const updateAllOfSupervisorToolbar = state => ({
  type: 'UPDATE_SUPERVISOR_TOOLBAR_STATE',
  state
});

// Reducer
export default function supervisorToolbarReducer(state = constructInitialState(), action) {
  switch (action.type) {
    case 'cxengage/twilio/device-ready':
      return state.setIn(['twilio', 'enabled'], true);
    case 'cxengage/session/started': {
      const newSessionId = action.response && action.response.sessionId;
      return state.setIn(['silentMonitoring', 'sessionId'], newSessionId);
    }
    case 'cxengage/interactions/voice/silent-monitor-start':
      return state.setIn(['silentMonitoring', 'status'], 'connected').set('muted', true);
    case 'cxengage/session/sqs-shut-down':
      return state.update('silentMonitoring', silentMonitoring => silentMonitoring.set('status', 'sqsShutDown'));
    case 'cxengage/interactions/voice/silent-monitor-end':
      if (state.getIn(['silentMonitoring', 'transitionCall'])) {
        return state;
      } else {
        return state.update('silentMonitoring', silentMonitoring =>
          silentMonitoring.set('status', 'offline').set('interactionId', 'na')
        );
      }
    case 'TRANSITION_CALL_ENDING':
      return state
        .update('silentMonitoring', silentMonitoring => silentMonitoring.set('transitionCall', false))
        .set('muted', true);
    case 'REQUESTING_MONITOR_CALL':
      return state.update('silentMonitoring', silentMonitoring =>
        silentMonitoring
          .set('status', 'connecting')
          .set('interactionId', action.interactionId)
          .set('transitionCall', action.transitionCall)
      );
    case 'MONITOR_INTERACTION_REQUESTED':
      return state.update('silentMonitoring', silentMonitoring =>
        silentMonitoring.set('status', 'connecting').set('interactionId', action.interactionId)
      );
    case 'cxengage/interactions/voice/unmute-acknowledged':
      return state.set('muted', false);
    case 'cxengage/interactions/voice/mute-acknowledged':
      return state.set('muted', true);
    case 'UPDATE_SUPERVISOR_TOOLBAR_STATE':
      return action.state;
    case 'GET_CAN_SILENT_MONITOR':
      return state.set('loadingUserStatus', true);
    case 'SET_CAN_SILENT_MONITOR':
      return state.set('canSilentMonitor', action.canSilentMonitor).set('loadingUserStatus', false);
    default:
      return state;
  }
}
