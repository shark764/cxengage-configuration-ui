/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import * as sel from '../selectors';
import { fromJS } from 'immutable';

import { findEntity } from '../../entities/selectors';

jest.mock('../../entities/selectors');

findEntity.mockReturnValueOnce(fromJS({})).mockReturnValue(
  fromJS({
    firstName: 'First Name',
  })
);

describe('getCurrentTenantName', () => {
  it('returns current tenant name', () => {
    const initialState = fromJS({
      UserData: {
        currentTenantName: 'mockTenantName',
      },
    });
    expect(sel.getCurrentTenantName(initialState)).toMatchSnapshot();
  });
});

describe('getCurrentTenantId', () => {
  it('returns current tenant id', () => {
    const initialState = fromJS({
      UserData: {
        currentTenantId: 'mockTenantId',
      },
    });
    expect(sel.getCurrentTenantId(initialState)).toMatchSnapshot();
  });
});

describe('getCurrentPermissions', () => {
  it('returns current tenant permissions', () => {
    const initialState = fromJS({
      UserData: {
        permissions: 'mockPermissions',
      },
    });
    expect(sel.getCurrentPermissions(initialState)).toMatchSnapshot();
  });
});

describe('getCurrentAgentId', () => {
  it('returns current agent id', () => {
    const initialState = fromJS({
      UserData: {
        agentId: '0000-0000-0000-0000',
      },
    });
    expect(sel.getCurrentAgentId(initialState)).toMatchSnapshot();
  });
});

describe('getCurrentAgentName', () => {
  const initialState = fromJS({
    UserData: {
      agentId: '0000-0000-0000-0000',
    },
  });
  it("there's no info for the user, undefined is returned", () => {
    expect(sel.getCurrentAgentName(initialState)).toMatchSnapshot();
  });

  it('current agent name is returned', () => {
    expect(sel.getCurrentAgentName(initialState)).toMatchSnapshot();
  });
});
