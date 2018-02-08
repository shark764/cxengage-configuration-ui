import * as ACTIONS from './constants';

export function updateTableData(arrayOfTableData, optionalAppendBoolean) {
  return {
    type: ACTIONS.UPDATE_TABLE_DATA,
    arrayOfTableData,
    optionalAppendBoolean
  };
}

export function showColumn(columnName) {
  return {
    type: ACTIONS.SHOW_COLUMN,
    columnName
  };
}
