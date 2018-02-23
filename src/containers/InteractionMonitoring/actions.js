import * as ACTIONS from './constants';

export function updateTableData(arrayOfTableData) {
  return {
    type: ACTIONS.SET_TABLE_DATA,
    arrayOfTableData
  };
}
export function setExpanded(expanded) {
  return {
    type: ACTIONS.SET_EXPANDED,
    expanded
  };
}
export function setFiltered(filtered) {
  return {
    type: ACTIONS.SET_FILTERED,
    filtered
  };
}
export function setSelected(selected, expanded) {
  return {
    type: ACTIONS.SET_SELECTED,
    selected,
    expanded
  };
}
export function setSorted(sorted) {
  return {
    type: ACTIONS.SET_SORTED,
    sorted
  };
}
export function removeSelected() {
  return {
    type: ACTIONS.REMOVE_SELECTED
  };
}
