/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Initial Sub State
const initialState = fromJS({
  twelveHourFormat: true,
  InteractionMonitoring: {
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
    Direction: [
      { name: 'All', active: true },
      { name: 'Inbound', active: false },
      { name: 'Outbound', active: false }
    ],
    Monitoring: [
      { name: 'All', active: true },
      { name: 'Monitored', active: false },
      { name: 'Not Monitored', active: false }
    ],
    visibleMenu: 'none'
  }
});

// Actions
export const toggleMenuItems = (itemName, menuType, tableType) => ({
  type: 'TOGGLE_MENUITEMS',
  itemName,
  menuType,
  tableType
});
export const oneOnRestOff = (itemName, menuType, tableType) => ({
  type: 'ONE_ON_REST_OFF',
  itemName,
  menuType,
  tableType
});
export const updateGroupsColumnFilter = (arrayOfGroupData, tableType) => ({
  type: 'SET_GROUPS_DATA',
  arrayOfGroupData,
  tableType
});
export const updateSkillsColumnFilter = (arrayOfSkillData, tableType) => ({
  type: 'SET_SKILLS_DATA',
  arrayOfSkillData,
  tableType
});
export const setVisibleMenu = (menuType, tableType) => ({
  type: 'SET_VISIBLE_MENU',
  menuType,
  tableType
});
export const toggleAllMenuItemsOn = (menuType, tableType) => ({
  type: 'TOGGLE_ALL_MENUITEMS_ON',
  menuType,
  tableType
});
export const toggleAllMenuItemsOff = (menuType, tableType) => ({
  type: 'TOGGLE_ALL_MENUITEMS_OFF',
  menuType,
  tableType
});
export const toggleAllInverseMenuItems = (menuType, tableType) => ({
  type: 'TOGGLE_INVERSE_MENUITEMS',
  menuType,
  tableType
});
export const toggleTimeFormat = () => ({ type: 'TOGGLE_TIME_FORMAT' });

// Redducer
export default function ColumnsMenu(state = initialState, action) {
  switch (action.type) {
    case 'SET_VISIBLE_MENU':
      return state.setIn(
        [fromJS(action.tableType), 'visibleMenu'],
        fromJS(action.menuType)
      );
    case 'SET_GROUPS_DATA':
      return state.setIn(
        [action.tableType, 'Groups'],
        fromJS(action.arrayOfGroupData)
      );
    case 'SET_SKILLS_DATA':
      return state.setIn(
        [action.tableType, 'Skills'],
        fromJS(action.arrayOfSkillData)
      );
    case 'TOGGLE_INVERSE_MENUITEMS':
      return state.updateIn([action.tableType, action.menuType], columns =>
        columns.map(column => column.set('active', !column.get('active')))
      );
    case 'TOGGLE_MENUITEMS': {
      const index = state
        .getIn([action.tableType, action.menuType])
        .findIndex(col => col.get('name') === action.itemName);
      return state.updateIn([action.tableType, action.menuType, index], item =>
        item.set('active', !item.get('active'))
      );
    }
    case 'ONE_ON_REST_OFF': {
      console.warn(action);
      return state.setIn(
        [action.tableType, action.menuType],
        state
          .getIn([action.tableType, action.menuType])
          .map(item => item.set('active', item.get('name') === action.itemName))
      );
    }
    case 'TOGGLE_ALL_MENUITEMS_ON':
      return state.updateIn([action.tableType, action.menuType], columns =>
        columns.map(column => column.set('active', true))
      );
    case 'TOGGLE_ALL_MENUITEMS_OFF':
      return state.updateIn([action.tableType, action.menuType], columns =>
        columns.map(column => column.set('active', false))
      );
    case 'TOGGLE_TIME_FORMAT':
      return state.set('twelveHourFormat', !state.get('twelveHourFormat'));
    default:
      return state;
  }
}
