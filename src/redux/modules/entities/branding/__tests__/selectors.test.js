/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { hasAllBranding, getCustomTheme } from '../selectors';

describe('hasAllBranding', () => {
  describe('when both branding and protected branding are defined', () => {
    const initialState = fromJS({
      Entities: {
        branding: {
          data: 'mock branding data'
        },
        protectedBranding: {
          data: 'mock protected branding data'
        }
      }
    });
    it('returns true', () => {
      expect(hasAllBranding(initialState)).toBe(true);
    });
  });
  describe('when branding is undefined', () => {
    const initialState = fromJS({
      Entities: {
        protectedBranding: {
          data: 'mock protected branding data'
        }
      }
    });
    it('returns false', () => {
      expect(hasAllBranding(initialState)).toBe(false);
    });
  });
  describe('when protected branding is undefined', () => {
    const initialState = fromJS({
      Entities: {
        protectedBranding: {
          data: 'mock protected branding data'
        }
      }
    });
    it('returns false', () => {
      expect(hasAllBranding(initialState)).toBe(false);
    });
  });
});

describe('getCustomTheme', () => {
  describe('when styles is defined', () => {
    const initialState = fromJS({
      Entities: {
        branding: {
          data: {
            styles: '{ "mockStyle": "mock style value" }'
          }
        }
      }
    });
    it('returns JSON parsed style', () => {
      expect(getCustomTheme(initialState)).toMatchSnapshot();
    });
  });
  describe('when styles is undefined', () => {
    const initialState = fromJS({
      Entities: {}
    });
    it('returns an empty object', () => {
      expect(getCustomTheme(initialState)).toEqual({});
    });
  });
});
