/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectTenantRoles, selectPlatformRoles } from '../selectors';

const initialState = fromJS({
  Entities: {
    platformRoles: {
      data: [
        {
          id: 'mockId',
          name: 'Role Mock 1'
        },
        {
          id: 'mockId2',
          name: 'Role Mock 2'
        }
      ]
    },
    roles: {
      data: [
        {
          id: 'mockId',
          name: 'Role Mock 1'
        },
        {
          id: 'mockId2',
          name: 'Role Mock 2'
        }
      ]
    }
  }
});

describe('selectTenantRoles', () => {
  it('should get roles, then return it mapped and filtered', () => {
    expect(selectTenantRoles(initialState)).toMatchSnapshot();
  });
  it('returns empty array when no data is found', () => {
    const initialStateNoData = fromJS({
      Entities: {
        roles: {
          data: []
        }
      }
    });
    expect(selectTenantRoles(initialStateNoData)).toEqual([]);
  });
});

describe('selectPlatformRoles', () => {
  it('should get standard roles, then return it mapped and filtered', () => {
    expect(selectPlatformRoles(initialState)).toMatchSnapshot();
  });
  it('returns empty array when no data is found', () => {
    const initialStateNoData = fromJS({
      Entities: {
        platformRoles: {
          data: []
        }
      }
    });
    expect(selectPlatformRoles(initialStateNoData)).toEqual([]);
  });
});
