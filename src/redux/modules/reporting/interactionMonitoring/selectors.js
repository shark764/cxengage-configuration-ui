/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { hasPermission } from '../../entities/selectors';
import { getCurrentPermissions } from '../../userData/selectors';

const selectInteractionMonitoringMap = state => state.get('InteractionMonitoring');

export const selectInteractionMonitoringTableData = createSelector(selectInteractionMonitoringMap, subState =>
  subState.get('data').toJS()
);
export const selectInteractionMonitoringSorted = createSelector(selectInteractionMonitoringMap, subState =>
  subState.get('sorted')
);
export const selectInteractionMonitoringExpanded = createSelector(selectInteractionMonitoringMap, subState =>
  subState.get('expanded')
);
export const selectInteractionMonitoringSelected = createSelector(selectInteractionMonitoringMap, subState =>
  subState.get('selected')
);

export const selectExtensions = createSelector(selectInteractionMonitoringMap, subState =>
  subState.get('extensions').toJS()
);

export const userHasMonitorAllCallsPermission = state =>
  hasPermission(getCurrentPermissions(state), selectInteractionMonitoringMap(state).get('monitorAllCallsPermission'));

export const userHasBargeAllCallsPermission = state =>
  hasPermission(getCurrentPermissions(state), selectInteractionMonitoringMap(state).get('bargeAllCallsPermission'));

export const userHasViewAllMonitoredCallsPermission = state =>
  hasPermission(
    getCurrentPermissions(state),
    selectInteractionMonitoringMap(state).get('viewAllMonitoredCallsPermission')
  );

export const isFetchingUserExtensions = createSelector(selectInteractionMonitoringMap, subState =>
  subState.get('isFetchingUserExtensions')
);
