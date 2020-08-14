/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const selectSupervisorToolbarMap = state => state.get('SupervisorToolbar');

export const selectSupervisorToolbarMuted = createSelector(selectSupervisorToolbarMap, supervisorToolbar =>
  supervisorToolbar.get('muted')
);
export const selectSupervisorToolbarTwilioEnabled = createSelector(selectSupervisorToolbarMap, supervisorToolbar =>
  supervisorToolbar.getIn(['twilio', 'enabled'])
);
export const selectTransitionCall = createSelector(selectSupervisorToolbarMap, supervisorToolbar =>
  supervisorToolbar.getIn(['silentMonitoring', 'transitionCall'])
);
export const selectSupervisorToolbarSilentMonitoringStatus = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar.getIn(['silentMonitoring', 'status'])
);
export const selectSupervisorToolbarSilentMonitoringInteractionId = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar.getIn(['silentMonitoring', 'interactionId'])
);
export const selectSessionId = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar.getIn(['silentMonitoring', 'sessionId'])
);
export const selectCanSilentMonitor = createSelector(
  selectSupervisorToolbarMap,
  subState => subState.get('canSilentMonitor')
);
export const selectLoadingUserStatus = createSelector(
  selectSupervisorToolbarMap,
  subState => subState.get('loadingUserStatus')
);
