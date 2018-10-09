/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { entitiesMetaData } from '../entities/metaData';

/**
 * Construct the initial state from the information in the entities metadata file
 */
export const constructInitialState = () => {
  /**
   * Start with basic defaults
   */
  let initialState = {
    twelveHourFormat: true,
    none: {
      Columns: [],
      visibleMenu: 'none'
    }
  };
  /**
   * Add all columns from entityMetaData file
   */
  Object.keys(entitiesMetaData).forEach(entityName => {
    initialState[entityName] = {
      visibleMenu: 'none'
    }
    initialState[entityName].Columns = JSON.parse( window.localStorage.getItem(`${entityName}Columns`)) || entitiesMetaData[entityName].columns;
  });
  /**
   * Add entities custom menus
   * for example silent monitoring table has custom filters
   */
  initialState.interactionMonitoring.Groups = [];
  initialState.interactionMonitoring.Skills = [];
  initialState.interactionMonitoring.Direction = [
    { name: 'All', active: true },
    { name: 'Inbound', active: false },
    { name: 'Outbound', active: false },
    { name: 'Agent Initiated', active: false }
  ];
  initialState.interactionMonitoring.Monitoring = [
    { name: 'All', active: true },
    { name: 'Monitored', active: false },
    { name: 'Not Monitored', active: false }
  ];

  return fromJS(initialState);
}

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

// Reducer
export default function ColumnsMenu(state = constructInitialState(), action) {
  switch (action.type) {
    case 'SET_VISIBLE_MENU':
      return state.setIn(
        [fromJS(action.tableType), 'visibleMenu'],
        fromJS(action.menuType)
      );
    case 'SET_GROUPS_DATA':
      return state.setIn(
        [action.tableType, 'Groups'],
        fromJS(action.arrayOfGroupData).filter(x => x.get('active'))
      );
    case 'SET_SKILLS_DATA':
      return state.setIn(
        [action.tableType, 'Skills'],
        fromJS(action.arrayOfSkillData).filter(x => x.get('active'))
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
