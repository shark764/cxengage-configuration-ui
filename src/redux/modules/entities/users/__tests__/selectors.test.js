/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectNonDisabledUsers, getDisplay, getInvitationScenario, getUserTenantStatus } from '../selectors';

const initialState = fromJS({
  Entities: {
    users: {
      data: [
        {
          email: 'mockEmail 1',
          firstName: 'mockFirstName 1',
          lastName: 'mockLastName 1',
          platformStatus: 'enabled',
          status: 'enabled'
        },
        {
          email: 'mockEmail 2',
          firstName: 'mockFirstName 2',
          lastName: 'mockLastName 2',
          platformStatus: 'enabled',
          status: 'disabled'
        },
        {
          email: 'mockEmail 3',
          firstName: 'mockFirstName 3',
          lastName: 'mockLastName 3',
          platformStatus: 'disabled',
          status: 'enabled'
        }
      ]
    }
  }
});

const mockCurrentForm = fromJS({
  values: {
    firstName: 'mockFirstName',
    lastName: 'mockLastName',
    status: 'disabled'
  }
});
jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm
}));

describe('getUserTenantStatus', () => {
  it("returns the current form's tenant status value", () => {
    expect(getUserTenantStatus()).toEqual('disabled');
  });
});

describe('getDisplay', () => {
  it('gets the whole name of the user', () => {
    expect(
      getDisplay({
        email: 'mockEmail 1',
        firstName: 'mockFirstName 1',
        lastName: 'mockLastName 1',
        platformStatus: 'enabled',
        status: 'enabled'
      })
    ).toEqual('mockFirstName 1 mockLastName 1');
  });
  it('gets the whole name of the user when firstName and lastName are not defined', () => {
    expect(
      getDisplay({
        email: 'mockEmail 1',
        firstName: null,
        lastName: null,
        platformStatus: 'enabled',
        status: 'enabled'
      })
    ).toEqual('mockEmail 1');
  });
});

describe('selectNonDisabledUsers', () => {
  it('should get users, then return it mapped with new data and filtered', () => {
    expect(selectNonDisabledUsers(initialState)).toEqual([
      {
        name: 'mockFirstName 1 mockLastName 1',
        email: 'mockEmail 1',
        firstName: 'mockFirstName 1',
        lastName: 'mockLastName 1',
        platformStatus: 'enabled',
        status: 'enabled'
      }
    ]);
  });
  it('returns undefined when no data is available', () => {
    const initialStateNoData = fromJS({
      Entities: {
        users: {
          data: undefined
        }
      }
    });
    expect(selectNonDisabledUsers(initialStateNoData)).toEqual(undefined);
  });
});

describe('getInvitationScenario', () => {
  it('should get invitation scenario based on data', () => {
    const mockForm = fromJS({
      form: {
        values: {
          email: 'mockEmail 1',
          firstName: 'mockFirstName 1',
          lastName: 'mockLastName 1'
        }
      }
    });
    expect(getInvitationScenario(mockForm)).toEqual('invite:new:user');
  });
  it('should get invitation scenario for existing user based on data', () => {
    const mockForm = fromJS({
      form: {
        values: {
          id: 'mockId',
          email: 'mockEmail 1',
          firstName: 'mockFirstName 1',
          lastName: 'mockLastName 1',
          invitationStatus: 'pending'
        }
      }
    });
    expect(getInvitationScenario(mockForm)).toEqual('invite:new:user');
  });
  it('should get non invitation required based on data', () => {
    const mockForm = fromJS({
      form: {
        values: {
          id: 'mockId',
          email: 'mockEmail 1',
          firstName: 'mockFirstName 1',
          lastName: 'mockLastName 1',
          invitationStatus: 'enabled'
        }
      }
    });
    expect(getInvitationScenario(mockForm)).toEqual('invite:new:user');
  });
});
