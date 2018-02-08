import { createSelector } from 'reselect';

const selectSupervisorToolbarMap = state => state.get('SupervisorToolbar');
// const selectInteractionMonitoringMap = state =>
//   state.get("InteractionMonitoring");

export const selectSupervisorToolbar = createSelector(
  selectSupervisorToolbarMap,
  supervisorToolbar => supervisorToolbar
);
