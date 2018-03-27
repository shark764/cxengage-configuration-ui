/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State

const initialState = fromJS({
  styles: {}
});

// Actions

export const fetchBranding = () => ({
  type: 'FETCH_BRANDING'
});

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_BRANDING_FULFILLED':
      return state.set('styles', fromJS(JSON.parse(action.response.styles)));
    default:
      return state;
  }
}
