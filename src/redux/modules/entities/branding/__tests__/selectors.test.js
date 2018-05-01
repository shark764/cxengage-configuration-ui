/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getBranding, getProtectedBranding } from '../selectors';

describe('getBranding', () => {
  const initialState = fromJS({
    Entities: {
      branding: {
        data: 'mock branding data'
      }
    }
  });
  it('returns the branding data', () => {
    expect(getBranding(initialState)).toEqual('mock branding data');
  });
});

describe('getProtectedBranding', () => {
  const initialState = fromJS({
    Entities: {
      protectedBranding: {
        data: 'mock protected branding data'
      }
    }
  });
  it('returns the branding data', () => {
    expect(getProtectedBranding(initialState)).toEqual(
      'mock protected branding data'
    );
  });
});
