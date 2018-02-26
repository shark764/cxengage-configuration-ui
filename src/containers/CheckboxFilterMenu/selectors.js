import { createSelector } from 'reselect';

const subState = state => state.get('CheckboxFilterMenu');

const menuItems = (state, props) => {
  if (props.menuType) {
    return state.get('CheckboxFilterMenu').get(props.menuType);
  } else {
    return state.get('CheckboxFilterMenu').get('Columns');
  }
};

export const areAllActive = createSelector(
  [subState, menuItems],
  (subState, menuItems) => {
    let active = true;
    menuItems.forEach(item => (!item.get('active') ? (active = false) : null));
    return active;
  }
);

export const selectColumns = createSelector(subState, subState =>
  subState.get('Columns')
);

export const areAllColNotActive = createSelector(subState, subState => {
  let active = false;
  subState
    .get('Columns')
    .forEach(col => (col.get('active') ? (active = true) : null));
  return active;
});

export const selectTimeFormat = createSelector(subState, subState =>
  subState.get('twelveHourFormat')
);
