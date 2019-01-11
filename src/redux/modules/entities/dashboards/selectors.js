/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';
import { getCurrentTenantId } from '../../userData/selectors';
import { entitiesMetaData } from '../metaData';

const getDashboards = state => state.getIn(['Entities', 'dashboards', 'data']);

// Not existing yet, is going to work when API for
// standardDashboards is done
// Required for https://liveops.atlassian.net/browse/CXV1-16111
// const getStandardDashboards = state => state.getIn(['Entities', 'standardDashboards', 'data']);

export const selectDashboards = createSelector([getDashboards, getCurrentTenantId], (dashboards, currentTenantId) =>
  dashboards
    .toJS()
    .filter(
      dashboard =>
        dashboard.tenantId === currentTenantId &&
        dashboard.active !== null &&
        dashboard.activeDashboard !== null &&
        dashboard.activeVersion !== null
    )
    .map(dashboard => dashboard.name)
);

export const getCustomDashboardByName = (state, reportName) =>
  getDashboards(state)
    .toJS()
    .filter(dashboard => dashboard.name === reportName)
    .map(item => item.id)[0];

// Not existing yet, is goint to work when API for
// standardDashboards is done
// Required for https://liveops.atlassian.net/browse/CXV1-16111
// export const selectStandardDashboards = createSelector([getStandardDashboards], dashboards =>
//   dashboards.toJS().map(dashboard => dashboard.name)
// );

// getStandardDashboards is goint to work when API for
// standardDashboards is done
// Required for https://liveops.atlassian.net/browse/CXV1-16111
export const getStandardDashboardByName = (state, reportName) =>
  entitiesMetaData.dataAccessReports.standardDashboards
    // getStandardDashboards(state)
    //   .toJS()
    // .filter(dashboard => dashboard.name === reportName)
    // .map(item => item.id)[0];
    .filter(dashboard => dashboard.label === reportName)
    .map(item => item.value)[0];
