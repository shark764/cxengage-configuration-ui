/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectTenantIdentityProviders } from '../selectors';

const initialState = fromJS({
  Entities: {
    identityProviders: {
      data: [
        {
          id: 'mockId1',
          name: 'mockName1',
          active: true
        },
        {
          id: 'mockId2',
          name: 'mockName2',
          active: false
        }
      ],
      userExistInPlatform: true
    }
  }
});

describe('selectTenantIdentityProviders', () => {
  it('Gets the correct IDPs', () => {
    expect(selectTenantIdentityProviders(initialState)).toMatchSnapshot();
  });
  it('Does not get any IDPs from state', () => {
    expect(selectTenantIdentityProviders(fromJS([]))).toMatchSnapshot();
  });
});
