import * as ACTIONS from './constants';

export function toggleColumn(columnName) {
  return {
    type: ACTIONS.TOGGLE_COLUMN,
    columnName
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
export function toggleAllColumnsOn() {
  return {
    type: ACTIONS.TOGGLE_ALL_COLUMNS_ON
  };
}
export function toggleAllColumnsOff() {
  return {
    type: ACTIONS.TOGGLE_ALL_COLUMNS_OFF
  };
}

export function toggleAllInverseColumns() {
  return {
    type: ACTIONS.TOGGLE_INVERSE_COLUMNS
  };
}

export function toggleTimeFormat() {
  return {
    type: ACTIONS.TOGGLE_TIME_FORMAT
  };
}
