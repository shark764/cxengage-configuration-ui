/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import {
  selectDashboards,
  getCustomDashboardByName,
  selectStandardDashboards,
  getStandardDashboardByName
} from '../selectors';

jest.mock('../../../userData/selectors', () => ({
  getCurrentTenantId: () => 'mockTenantId'
}));

const initialState = fromJS({
  UserData: {
    currentTenant: 'mockTenantId'
  },
  Entities: {
    standardDashboards: {
      data: [
        {
          value: '1a861841-628b-4e4b-892c-5fbb178dfd3a',
          label: 'Overview Dashboard'
        },
        {
          value: '5f08bfde-3a79-4aa3-8586-42a1a03ffa90',
          label: 'Queues Dashboard'
        },
        {
          value: '1c6a29a9-6020-4543-82f8-490728e53876',
          label: 'Queue Details'
        }
      ]
    },
    dashboards: {
      data: [
        {
          id: 'mockId',
          name: 'Dashboard Mock 1',
          tenantId: 'mockTenantId',
          active: true,
          activeDashboard: {},
          activeVersion: '1234'
        },
        {
          id: 'mockId2',
          name: 'Dashboard Mock 2',
          tenantId: 'mockTenantId',
          active: true,
          activeDashboard: {},
          activeVersion: '1234'
        },
        {
          id: 'mockId3',
          name: 'Dashboard Mock 3',
          tenantId: 'mockTenantId',
          active: true,
          activeDashboard: {},
          activeVersion: '1234'
        },
        {
          id: 'mockId4',
          name: 'Dashboard Mock 4',
          tenantId: 'mockTenantId',
          active: null,
          activeDashboard: null,
          activeVersion: null
        }
      ]
    }
  }
});

describe('selectDashboards', () => {
  it('should get dashboards, then return it mapped and filtered', () => {
    expect(selectDashboards(initialState)).toEqual(['Dashboard Mock 1', 'Dashboard Mock 2', 'Dashboard Mock 3']);
  });
  it('returns empty array when no data is found', () => {
    const initialStateNoData = fromJS({
      Entities: {
        dashboards: {
          data: []
        }
      }
    });
    expect(selectDashboards(initialStateNoData)).toEqual([]);
  });
});

describe('getCustomDashboardByName', () => {
  it('returns dashboard id by name given', () => {
    expect(getCustomDashboardByName(initialState, 'Dashboard Mock 1')).toEqual('mockId');
  });
});

describe('selectStandardDashboards', () => {
  it('should get standard dashboards, then return it mapped and filtered', () => {
    expect(selectStandardDashboards(initialState)).toEqual(['Overview Dashboard', 'Queues Dashboard', 'Queue Details']);
  });
  it('returns empty array when no data is found', () => {
    const initialStateNoData = fromJS({
      Entities: {
        standardDashboards: {
          data: []
        }
      }
    });
    expect(selectStandardDashboards(initialStateNoData)).toEqual([]);
  });
});

describe('getStandardDashboardByName', () => {
  it('returns standard dashboard id by name given', () => {
    expect(getStandardDashboardByName(initialState, 'Queue Details')).toEqual('1c6a29a9-6020-4543-82f8-490728e53876');
  });
});
