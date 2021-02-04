/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
export const initialState = fromJS({
  data: [],
  filters: {},
});

// Actions
export const setFilterValue = (filterType, label, value) => ({
  type: 'SET_FILTER_VALUE',
  filterType,
  label,
  value,
});

export const setFilterDate = (filterDate) => ({
  type: 'SET_FILTER_DATE',
  filterDate,
});

export const setShowHideGraph = (statType, showGraph) => ({
  type: 'SHOW_OR_HIDE_GRAPH',
  statType,
  showGraph,
});

// Reducer
export default function ForecastDashboards(state = initialState, action) {
  switch (action.type) {
    case 'SET_FILTER_VALUE':
      return state.setIn(['filters', action.filterType], fromJS({ label: action.label, value: action.value }));
    case 'SET_FILTER_DATE':
      return state.set('filterDate', action.filterDate);
    case 'SHOW_OR_HIDE_GRAPH': {
      return state.setIn(
        ['stats', action.statType, 'showGraph'],
        !state.getIn(['stats', action.statType, 'showGraph'])
      );
    }
    default:
      return initialState;
  }
}
