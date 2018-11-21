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
        { label: 'Agent Details', value: '8e7c8f83-4ed4-4ab9-942e-dbc66bdb016b' },
        { label: 'Agent State', value: 'b7486897-337d-4e1b-a3c9-1353ce6a4738' },
        { label: 'Interactions Dashboard', value: '26a076ea-7dd7-4a61-bbdf-f2734a7a3b28' },
        { label: 'Interactions Completed', value: 'e19680cb-bee2-422b-961d-09a5479ec466' },
        { label: 'Interactions in Conversation', value: '5bceb39e-a4f9-41f1-b56f-8ecf0daf2844' },
        { label: 'Interactions in Queue', value: 'b00de9cc-645e-48c1-9248-2270224fc054' },
        { label: 'Interactions in IVR', value: 'bed51612-8168-4488-99df-2100d66f8095' },
        { label: 'Overview Dashboard', value: '1a861841-628b-4e4b-892c-5fbb178dfd3a' },
        { label: 'Queues Dashboard', value: '5f08bfde-3a79-4aa3-8586-42a1a03ffa90' },
        { label: 'Queue Details', value: '1c6a29a9-6020-4543-82f8-490728e53876' },
        { label: 'Resources Dashboard', value: '0ad70ddc-d3d4-458e-8019-20fc46122a52' }
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
    expect(selectStandardDashboards(initialState)).toEqual([
      'Agent Details',
      'Agent State',
      'Interactions Dashboard',
      'Interactions Completed',
      'Interactions in Conversation',
      'Interactions in Queue',
      'Interactions in IVR',
      'Overview Dashboard',
      'Queues Dashboard',
      'Queue Details',
      'Resources Dashboard'
    ]);
  });
});

describe('getStandardDashboardByName', () => {
  it('returns standard dashboard id by name given', () => {
    expect(getStandardDashboardByName(initialState, 'Queue Details')).toEqual('1c6a29a9-6020-4543-82f8-490728e53876');
  });
});
