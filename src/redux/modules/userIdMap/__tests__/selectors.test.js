/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { getAllUsersIdMap, getUserDisplayName } from '../selectors';
import { fromJS } from 'immutable';

describe('getAllUsersIdMap', () => {
  it('Returns users map', () => {
    const initialState = fromJS({
      UserIdMap: {
        '0000': 'Capricorn Shura',
        '0001': 'Aries Mu',
        '0002': 'Sagittarius Aioros',
        '0003': 'Gemini Saga'
      }
    });
    expect(getAllUsersIdMap(initialState)).toMatchSnapshot();
  });
  it('Returns undefined if section is not in state', () => {
    const initialState = fromJS({});
    expect(getAllUsersIdMap(initialState)).toMatchSnapshot();
  });
});

describe('getUserDisplayName', () => {
  it('Returns display name with given id', () => {
    const initialState = fromJS({
      UserIdMap: {
        '0000': 'Capricorn Shura',
        '0001': 'Aries Mu',
        '0002': 'Sagittarius Aioros',
        '0003': 'Gemini Saga'
      }
    });
    expect(getUserDisplayName(initialState, '0003')).toMatchSnapshot();
  });
  it('Returns undefined if given id is not in map', () => {
    const initialState = fromJS({
      UserIdMap: {
        '0000': 'Capricorn Shura',
        '0001': 'Aries Mu',
        '0002': 'Sagittarius Aioros',
        '0003': 'Gemini Saga'
      }
    });
    expect(getUserDisplayName(initialState, '0004')).toMatchSnapshot();
  });
  it('Returns undefined if state section is undefined', () => {
    const initialState = fromJS({
      UserIdMap: undefined
    });
    expect(getUserDisplayName(initialState, '0003')).toMatchSnapshot();
  });
  it('Returns undefined if section is not in state', () => {
    const initialState = fromJS({});
    expect(getUserDisplayName(initialState, '0003')).toMatchSnapshot();
  });
});
