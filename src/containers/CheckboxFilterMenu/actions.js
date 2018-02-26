import * as ACTIONS from './constants';

export function toggleMenuItems(itemName, menuType) {
  return {
    type: ACTIONS.TOGGLE_MENUITEMS,
    itemName,
    menuType
  };
}
export function updateGroupsData(arrayOfGroupData) {
  return {
    type: ACTIONS.SET_GROUPS_DATA,
    arrayOfGroupData
  };
}
export function updateSkillsData(arrayOfSkillData) {
  return {
    type: ACTIONS.SET_SKILLS_DATA,
    arrayOfSkillData
  };
}
export function setVisibleMenu(menuType) {
  return {
    type: ACTIONS.SET_VISIBLE_MENU,
    menuType
  };
}
export function toggleAllMenuItemsOn(menuType) {
  return {
    type: ACTIONS.TOGGLE_ALL_MENUITEMS_ON,
    menuType
  };
}
export function toggleAllMenuItemsOff(menuType) {
  return {
    type: ACTIONS.TOGGLE_ALL_MENUITEMS_OFF,
    menuType
  };
}

export function toggleAllInverseMenuItems(menuType) {
  return {
    type: ACTIONS.TOGGLE_INVERSE_MENUITEMS,
    menuType
  };
}

export function toggleTimeFormat() {
  return {
    type: ACTIONS.TOGGLE_TIME_FORMAT
  };
}
