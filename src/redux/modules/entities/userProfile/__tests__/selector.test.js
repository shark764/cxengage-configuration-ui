import { fromJS } from 'immutable';

import { generateUUID } from 'serenova-js-utils/uuid';
import { selectUserTenants, isSaving, userProfileInitialValues } from '../selectors';

jest.mock('serenova-js-utils/uuid');

generateUUID.mockReturnValue('mock-uuid');

describe('selectUserTenants', () => {
  const state = fromJS({
    Entities: {
      userProfile: {
        userTenants: [
          {
            name: 'tenant 1',
            tenantId: 'tenant1',
          },
          {
            name: 'tenant 2',
            tenantId: 'tenant2',
          },
        ],
      },
    },
  });

  it('returns all the tenants an user is assigned to', () => {
    expect(selectUserTenants(state)).toMatchSnapshot();
  });

  it('if user has no tenants he has been assigned to, undefined is returned', () => {
    expect(selectUserTenants(state.deleteIn(['Entities', 'userProfile', 'userTenants']))).toMatchSnapshot();
  });
});

describe('isSaving', () => {
  const state = fromJS({
    Entities: {
      userProfile: {
        updating: true,
      },
    },
  });

  it('if the user profile is being saved it returns true', () => {
    expect(isSaving(state)).toMatchSnapshot();
  });

  it('if the user profile is not being saved it returns undefined or false', () => {
    expect(isSaving(state.deleteIn(['Entities', 'userProfile', 'updating']))).toMatchSnapshot();
  });
});

describe('userProfileInitialValues', () => {
  const state = fromJS({
    Entities: {
      users: {
        data: [
          {
            id: 'user1',
            extensions: [
              {
                type: 'pstn',
                value: '+50375241007',
                description: 'something',
              },
              {
                type: 'sip',
                value: 'sip:email@email.com',
              },
            ],
          },
        ],
      },
    },
    UserData: {
      agentId: 'user1',
    },
  });

  it('gets current user data including formatted extensions', () => {
    expect(userProfileInitialValues(state)).toMatchSnapshot();
  });

  it("if there's no info on current user a empty map is returned", () => {
    expect(userProfileInitialValues(state.deleteIn(['Entities', 'users', 'data', 0]))).toMatchSnapshot();
  });
});
