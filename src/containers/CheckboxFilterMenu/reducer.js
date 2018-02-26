import * as ACTIONS from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  twelveHourFormat: true,
  Columns: JSON.parse(
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
    { name: 'Monitoring', active: true },
    { name: 'Groups', active: false },
    { name: 'Skills', active: false }
  ],
  Groups: [],
  Skills: [],
  visibleMenu: 'none'
});

function updateInteractionMonitoringColumnsLocalStorage(state) {
  window.localStorage.setItem(
    'InteractionMonitoringColumns',
    JSON.stringify(state.get('Columns').toJS())
  );
}

function ColumnsMenu(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_VISIBLE_MENU:
      return state.set('visibleMenu', fromJS(action.menuType));
    case ACTIONS.SET_GROUPS_DATA:
      return state.set('Groups', fromJS(action.arrayOfGroupData));
    case ACTIONS.SET_SKILLS_DATA:
      return state.set('Skills', fromJS(action.arrayOfSkillData));
    case ACTIONS.TOGGLE_INVERSE_MENUITEMS:
      const newState1 = state.update(action.menuType, columns =>
        columns.map(column => column.set('active', !column.get('active')))
      );
      updateInteractionMonitoringColumnsLocalStorage(newState1);
      return newState1;
    case ACTIONS.TOGGLE_MENUITEMS: {
      const index = state
        .get(action.menuType)
        .findIndex(col => col.get('name') === action.itemName);
      const newState2 = state.updateIn([action.menuType, index], column =>
        column.set('active', !column.get('active'))
      );
      updateInteractionMonitoringColumnsLocalStorage(newState2);
      return newState2;
    }
    case ACTIONS.TOGGLE_ALL_MENUITEMS_ON:
      const newState3 = state.update(action.menuType, columns =>
        columns.map(column => column.set('active', true))
      );
      updateInteractionMonitoringColumnsLocalStorage(newState3);
      return newState3;
    case ACTIONS.TOGGLE_ALL_MENUITEMS_OFF:
      const newState4 = state.update(action.menuType, columns =>
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
