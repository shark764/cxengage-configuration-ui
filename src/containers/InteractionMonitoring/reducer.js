import * as ACTIONS from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: [],
  sorted: [],
  filtered: [],
  expanded: {},
  selected: ''
});

function InteractionMonitoring(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_TABLE_DATA:
      return state.set('data', fromJS(action.arrayOfTableData));
    case ACTIONS.SET_SORTED:
      return state
        .set('sorted', action.sorted)
        .set('selected', '')
        .set('expanded', {});
    case ACTIONS.SET_FILTERED:
      return state
        .set('filtered', action.filtered)
        .set('expanded', {})
        .set('selected', '');
    case ACTIONS.SET_EXPANDED:
      return state.set('expanded', action.expanded);
    case ACTIONS.SET_SELECTED:
      return state
        .set('selected', action.selected)
        .set('expanded', action.expanded);
    case ACTIONS.REMOVE_SELECTED:
      return state.set('expanded', {}).set('selected', '');
    default:
      return state;
  }
}

export default InteractionMonitoring;
