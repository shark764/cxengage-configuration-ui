/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getListTypesOptions } from '../selectors';

describe('getListTypesOptions', () => {
  describe('list types defined', () => {
    const state = fromJS({
      Entities: {
        listTypes: {
          data: [
            {
              id: '1',
              name: 'mock list type name 1',
              someOtherField: 'mock value',
              active: true
            },
            {
              id: '2',
              name: 'mock list type name 2',
              someOtherField: 'mock value',
              active: false
            }
          ]
        }
      }
    });
    it('converted to javascript, filters out active false, and maps to the name and id', () => {
      expect(getListTypesOptions(state)).toMatchSnapshot();
    });
  });
  describe('list types are undefined', () => {
    const state = fromJS({
      Entities: {
        listTypes: {
          data: undefined
        }
      }
    });
    it('returns undefined', () => {
      expect(getListTypesOptions(state)).toBe(undefined);
    });
  });
});
