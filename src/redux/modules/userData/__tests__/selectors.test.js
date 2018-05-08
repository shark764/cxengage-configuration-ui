/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import * as sel from '../selectors';
import { fromJS } from 'immutable';

describe('getCurrentTenantName', () => {
  it('returns current tenant name', () => {
    const initialState = fromJS({
      UserData: {
        currentTenantName: 'mockTenantName'
      }
    });
    expect(sel.getCurrentTenantName(initialState)).toMatchSnapshot();
  });
});

describe('getCurrentTenantId', () => {
  it('returns current tenant id', () => {
    const initialState = fromJS({
      UserData: {
        currentTenantId: 'mockTenantId'
      }
    });
    expect(sel.getCurrentTenantId(initialState)).toMatchSnapshot();
  });
});

describe('getCurrentPermissions', () => {
  it('returns current tenant permissions', () => {
    const initialState = fromJS({
      UserData: {
        permissions: 'mockPermissions'
      }
    });
    expect(sel.getCurrentPermissions(initialState)).toMatchSnapshot();
  });
});
