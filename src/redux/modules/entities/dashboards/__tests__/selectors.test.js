/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectDashboards } from '../selectors';

jest.mock('../../../userData/selectors', () => ({
  getCurrentTenantId: () => 'mockTenantId',
}));

const initialState = fromJS({
  UserData: {
    currentTenant: 'mockTenantId',
  },
  Entities: {
    dashboards: {
      data: [
        {
          name: 'Dashboard Mock 1',
          tenantId: 'mockTenantId',
          active: true,
          activeDashboard: {},
          activeVersion: '1234',
        },
        {
          name: 'Dashboard Mock 2',
          tenantId: 'mockTenantId',
          active: true,
          activeDashboard: {},
          activeVersion: '1234',
        },
        {
          name: 'Dashboard Mock 3',
          tenantId: 'mockTenantId',
          active: true,
          activeDashboard: {},
          activeVersion: '1234',
        },
        {
          name: 'Dashboard Mock 4',
          tenantId: 'mockTenantId',
          active: null,
          activeDashboard: null,
          activeVersion: null,
        },
      ],
    },
  },
});

describe('selectDashboards', () => {
  it('should get dashboards, then return it mapped and filtered', () => {
    expect(selectDashboards(initialState)).toEqual([
      'Dashboard Mock 1',
      'Dashboard Mock 2',
      'Dashboard Mock 3',
    ]);
  });
  it('returns empty array when no data is available', () => {
    const initialStateNoData = fromJS({
      Entities: {
        dashboards: {
          data: undefined,
        },
      },
    });
    expect(selectDashboards(initialStateNoData)).toEqual([]);
  });
});
