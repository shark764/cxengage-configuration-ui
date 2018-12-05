/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getCurrentEntity, getSelectedEntity } from '../../selectors';
import { listMemberObjects, getEntityListMembers } from '../../listItemSelectors';
import {
  selectNonDisabledUsers,
  getDisplay,
  getInvitationScenario,
  getUserTenantStatus,
  selectEntityListMembers
} from '../selectors';

const initialState = fromJS({
  Entities: {
    users: {
      data: [
        {
          id: '1',
          email: 'mockEmail 1',
          firstName: 'mockFirstName 1',
          lastName: 'mockLastName 1',
          platformStatus: 'enabled',
          status: 'enabled'
        },
        {
          id: '2',
          email: 'mockEmail 2',
          firstName: 'mockFirstName 2',
          lastName: 'mockLastName 2',
          platformStatus: 'enabled',
          status: 'disabled'
        },
        {
          id: '3',
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

const mockSelectedEntity = fromJS({
  name: 'mockName',
  reportType: 'realtime',
  users: [
    {
      id: '1',
      email: 'mockEmail 1',
      firstName: 'mockFirstName 1',
      lastName: 'mockLastName 1',
      platformStatus: 'enabled',
      status: 'enabled'
    },
    {
      id: '2',
      email: 'mockEmail 2',
      firstName: 'mockFirstName 2',
      lastName: 'mockLastName 2',
      platformStatus: 'enabled',
      status: 'disabled'
    },
    {
      id: '3',
      email: 'mockEmail 3',
      firstName: 'mockFirstName 3',
      lastName: 'mockLastName 3',
      platformStatus: 'disabled',
      status: 'enabled'
    }
  ]
});

const listMembers = [
  {
    id: '1',
    email: 'mockEmail 1',
    firstName: 'mockFirstName 1',
    lastName: 'mockLastName 1',
    platformStatus: 'enabled',
    status: 'enabled'
  },
  {
    id: '2',
    email: 'mockEmail 2',
    firstName: 'mockFirstName 2',
    lastName: 'mockLastName 2',
    platformStatus: 'enabled',
    status: 'disabled'
  },
  {
    id: '3',
    email: 'mockEmail 3',
    firstName: 'mockFirstName 3',
    lastName: 'mockLastName 3',
    platformStatus: 'disabled',
    status: 'enabled'
  }
];

jest.mock('../../listItemSelectors');
listMemberObjects.mockImplementation(() => fromJS(listMembers));

jest.mock('../../selectors');
getEntityListMembers.mockImplementation(() => listMembers);
getCurrentEntity.mockImplementation(() => 'dataAccessReports');
getSelectedEntity.mockImplementation(() => mockSelectedEntity);

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
        id: '1',
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

describe('selectEntityListMembers', () => {
  it('should get users with the whole name on it', () => {
    expect(selectEntityListMembers(initialState)).toEqual([
      {
        id: '1',
        name: 'mockFirstName 1 mockLastName 1',
        email: 'mockEmail 1',
        firstName: 'mockFirstName 1',
        lastName: 'mockLastName 1',
        platformStatus: 'enabled',
        status: 'enabled'
      },
      {
        id: '2',
        name: 'mockFirstName 2 mockLastName 2',
        email: 'mockEmail 2',
        firstName: 'mockFirstName 2',
        lastName: 'mockLastName 2',
        platformStatus: 'enabled',
        status: 'disabled'
      },
      {
        id: '3',
        name: 'mockFirstName 3 mockLastName 3',
        email: 'mockEmail 3',
        firstName: 'mockFirstName 3',
        lastName: 'mockLastName 3',
        platformStatus: 'disabled',
        status: 'enabled'
      }
    ]);
  });
});
