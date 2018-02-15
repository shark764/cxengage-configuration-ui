import * as ACTIONS from './constants';

export function toggleColumn(columnName) {
  return {
    type: ACTIONS.TOGGLE_COLUMN,
    columnName
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
