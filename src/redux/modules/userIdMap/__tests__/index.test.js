/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Reducer
import UserIdMap from '../';

// initialState
import { initialState } from '../';

// Actions
import { addUserDataToMap } from '../';

describe('UserIdMap reducer snapshots', () => {
  it('returns the correct initial state', () => {
    expect(UserIdMap(initialState, {})).toMatchSnapshot();
  });

  it('dispatches ADD_USER_DATA_TO_MAP', () => {
    const mockInitialState = fromJS({
      '0000': 'Capricorn Shura',
      '0001': 'Aries Mu',
      '0002': 'Sagittarius Aioros',
      '0003': 'Gemini Saga'
    });
    expect(UserIdMap(mockInitialState, addUserDataToMap('0004', 'Virgo Shaka'))).toMatchSnapshot();
  });
});
