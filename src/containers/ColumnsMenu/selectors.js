import { createSelector } from 'reselect';

const selectColumnsMenuMap = state => state.get('ColumnsMenu');

export const selectColumnsMenu = createSelector(
  selectColumnsMenuMap,
  ColumnsMenu => ColumnsMenu
);

export const selectColumnsMenuColumns = createSelector(
  selectColumnsMenuMap,
  subState => {
    return subState.get('columns');
  }
);

export const areAllActive = createSelector(selectColumnsMenuMap, subState => {
  let active = true;
  subState
    .get('columns')
    .forEach(col => (!col.get('active') ? (active = false) : null));
  return active;
});

export const areAllNotActive = createSelector(
  selectColumnsMenuMap,
  subState => {
    let active = false;
    subState
      .get('columns')
      .forEach(col => (col.get('active') ? (active = true) : null));
    return active;
  }
);

export const selectTimeFormat = createSelector(selectColumnsMenuMap, subState =>
  subState.get('twelveHourFormat')
);
