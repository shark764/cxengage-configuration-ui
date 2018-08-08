/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Reducer
import UserData from '../index';

// initialState
import { initialState } from '../index';

import { updateUserPermissions } from '../index';

describe('UserData reducer snapshots', () => {
  it('returns the correct initial state', () => {
    expect(UserData(initialState, {})).toMatchSnapshot();
  });

  it('dispatches UPDATE_USER_PERMISSIONS', () => {
    const mockInitialState = fromJS({
      permissions: '',
      currentTenantName: '',
      currentTenantId: '',
      agentId: '0000-0000-0000-0000'
    });
    expect(
      UserData(
        mockInitialState,
        updateUserPermissions('tenantId', 'tenantName', 'tenantPermissions')
      )
    ).toMatchSnapshot();
  });
});
