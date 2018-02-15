import { createSelector } from 'reselect';

const selectSupervisorToolbarMap = state => state.get('SupervisorToolbar');

export const selectSupervisorToolbarMuted = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar.get('muted')
);
export const selectSupervisorToolbarTwilioEnabled = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar.getIn(['twilio', 'enabled'])
);
export const selectSupervisorToolbarTwilioIsDefaultExtension = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar.getIn(['twilio', 'isDefaultExtension'])
);
export const selectSupervisorToolbarSilentMonitoringStatus = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar.getIn(['silentMonitoring', 'status'])
);
export const selectSupervisorToolbarSilentMonitoringInteractionId = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar =>
    supervisorToolbar.getIn(['silentMonitoring', 'interactionId'])
);
