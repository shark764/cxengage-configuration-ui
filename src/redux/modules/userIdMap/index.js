/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
const initialState = fromJS({});

// Actions
export const addUserDataToMap = (userId, userName) => ({
  type: 'ADD_USER_DATA_TO_MAP',
  userId,
  userName
});

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER_DATA_TO_MAP': {
      return state.set(action.userId, action.userName);
    }
    default:
      return state;
  }
}
