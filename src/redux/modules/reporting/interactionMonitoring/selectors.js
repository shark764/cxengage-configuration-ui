/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const selectInteractionMonitoringMap = state =>
  state.get('InteractionMonitoring');

export const selectInteractionMonitoringTableData = createSelector(
  selectInteractionMonitoringMap,
  subState => subState.get('data').toJS()
);
export const selectInteractionMonitoringSorted = createSelector(
  selectInteractionMonitoringMap,
  subState => subState.get('sorted')
);
export const selectInteractionMonitoringExpanded = createSelector(
  selectInteractionMonitoringMap,
  subState => subState.get('expanded')
);
export const selectInteractionMonitoringSelected = createSelector(
  selectInteractionMonitoringMap,
  subState => subState.get('selected')
);
