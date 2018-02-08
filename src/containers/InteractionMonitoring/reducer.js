import * as ACTIONS from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  columns: [
    { name: 'Actions', active: false },
    { name: 'InteractionId', active: true },
    { name: 'Agent', active: false },
    { name: 'CustomerId', active: true },
    { name: 'ContactPoint', active: false },
    { name: 'Flow', active: true },
    { name: 'Direction', active: false },
    { name: 'StartTime', active: true },
    { name: 'ElapsedTime', active: false }
  ]
});

function InteractionMonitoring(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_TABLE_DATA:
      // console.log("reducer", action.arrayOfTableData);
      return state.set('data', action.arrayOfTableData);
    case ACTIONS.SHOW_COLUMN:
      const index = state
        .get('columns')
        .findIndex(col => col.name === action.columnName);
      return state.setIn(['columns', index, 'active'], action.columnName);
    default:
      return state;
  }
}

export default InteractionMonitoring;
