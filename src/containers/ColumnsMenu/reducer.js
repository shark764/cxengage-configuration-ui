import * as ACTIONS from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  twelveHourFormat: true,
  columns: JSON.parse(
    window.localStorage.getItem('InteractionMonitoringColumns')
  ) || [
    { name: 'InteractionId', active: true },
    { name: 'Agent', active: true },
    { name: 'CustomerId', active: true },
    { name: 'ContactPoint', active: true },
    { name: 'Flow', active: true },
    { name: 'Channel', active: false },
    { name: 'Direction', active: true },
    { name: 'Presence State', active: false },
    { name: 'Start Date', active: false },
    { name: 'StartTime', active: true },
    { name: 'ElapsedTime', active: true },
    { name: 'Actions', active: true }
  ]
});

function updateInteractionMonitoringColumnsLocalStorage(state) {
  window.localStorage.setItem(
    'InteractionMonitoringColumns',
    JSON.stringify(state.get('columns').toJS())
  );
}

function ColumnsMenu(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_INVERSE_COLUMNS:
      const newState1 = state.update('columns', columns =>
        columns.map(column => column.set('active', !column.get('active')))
      );
      updateInteractionMonitoringColumnsLocalStorage(newState1);
      return newState1;
    case ACTIONS.TOGGLE_COLUMN: {
      const index = state
        .get('columns')
        .findIndex(col => col.get('name') === action.columnName);
      const newState2 = state.updateIn(['columns', index], column =>
        column.set('active', !column.get('active'))
      );
      updateInteractionMonitoringColumnsLocalStorage(newState2);
      return newState2;
    }
    case ACTIONS.TOGGLE_ALL_COLUMNS_ON:
      const newState3 = state.update('columns', columns =>
        columns.map(column => column.set('active', true))
      );
      updateInteractionMonitoringColumnsLocalStorage(newState3);
      return newState3;
    case ACTIONS.TOGGLE_ALL_COLUMNS_OFF:
      const newState4 = state.update('columns', columns =>
        columns.map(column => column.set('active', false))
      );
      updateInteractionMonitoringColumnsLocalStorage(newState4);
      return newState4;
    case ACTIONS.TOGGLE_TIME_FORMAT:
      return state.set('twelveHourFormat', !state.get('twelveHourFormat'));
    default:
      return state;
  }
}

export default ColumnsMenu;
