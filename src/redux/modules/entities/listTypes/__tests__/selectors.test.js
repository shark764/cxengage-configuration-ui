/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getListTypesOptions } from '../selectors';

describe('getListTypesOptions', () => {
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
  it('converts the list types to javascript, filters out active false, and maps to the name and id', () => {
    expect(getListTypesOptions(state)).toMatchSnapshot();
  });
});
