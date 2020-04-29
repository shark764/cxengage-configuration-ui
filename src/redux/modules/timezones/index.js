/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

export default function reducer(state = fromJS({}), action) {
  switch (action.type) {
    case 'SET_TIMEZONES': {
      return state.set('allZones', fromJS(action.timezones));
    }
    default:
      return state;
  }
}
