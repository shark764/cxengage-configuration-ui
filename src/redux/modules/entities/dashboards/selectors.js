/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';
import { getCurrentTenantId } from '../../userData/selectors';

const getDashboards = state => state.getIn(['Entities', 'dashboards', 'data']);

export const selectDashboards = createSelector(
  [getDashboards, getCurrentTenantId],
  (dashboards, currentTenantId) => {
    return dashboards !== undefined
      ? dashboards
          .toJS()
          .filter(
            dashboard =>
              dashboard.tenantId === currentTenantId &&
              dashboard.active !== null &&
              dashboard.activeDashboard !== null &&
              dashboard.activeVersion !== null
          )
          .map(dashboard => dashboard.name)
      : [];
  }
);
