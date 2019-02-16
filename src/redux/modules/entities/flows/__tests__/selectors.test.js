/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectFlowIds } from '../selectors';

jest.mock('../../../userData/selectors', () => ({
  getCurrentTenantId: () => 'mockTenantId'
}));

const initialState = fromJS({
  UserData: {
    currentTenant: 'mockTenantId'
  },
  Entities: {
    flows: {
      data: [
        {
          active: true,
          id: 'flowMockId_1',
          name: 'Flow Mock 1'
        },
        {
          active: true,
          channelType: 'voice',
          id: 'flowMockId_2',
          name: 'Flow Mock 2'
        },
        {
          active: false,
          id: 'flowMockId_3',
          name: 'Flow Mock 3'
        }
      ]
    }
  }
});

describe('selectFlowIds', () => {
  it('should get flows and filter out non current tenant and non active flows, then return it mapped to label and value', () => {
    // the initial state above has an extra item with a platform tenant id that should get filtered out
    // the initial state above has an extra item with a non active flow that should get filtered out
    expect(selectFlowIds(initialState)).toEqual([
      { label: 'Flow Mock 1', value: 'flowMockId_1' },
      { label: 'Flow Mock 2', value: 'flowMockId_2' }
    ]);
  });
  it('returns undefined when no data is available', () => {
    const initialStateNoData = fromJS({
      Entities: {
        flows: {
          data: undefined
        }
      }
    });
    expect(selectFlowIds(initialStateNoData)).toEqual(undefined);
  });
});
