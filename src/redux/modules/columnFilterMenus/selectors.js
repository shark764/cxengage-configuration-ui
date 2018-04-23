/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const subState = state => state.get('ColumnFilterMenus');

const menuItems = (state, props) => {
  if (props.menuType && props.tableType) {
    return state
      .get('ColumnFilterMenus')
      .getIn([props.tableType, props.menuType]);
  } else {
    return [];
  }
};

export const activeFilter = createSelector(
  [subState, menuItems],
  (subState, menuItems) => {
    const activeItem = menuItems.toJS().filter(item => item.active === true)[0];
    return activeItem ? activeItem.name : null;
  }
);

export const areAllActive = createSelector(
  [subState, menuItems],
  (subState, menuItems) => {
    let active = true;
    menuItems.forEach(item => (!item.get('active') ? (active = false) : null));
    return active;
  }
);

export const totalRatio = createSelector(
  [subState, menuItems],
  (subState, menuItems) => {
    let activeAmount = 0;
    const totalItems = menuItems.size;
    menuItems.forEach(item => (item.get('active') ? activeAmount++ : null));
    return [activeAmount, totalItems];
  }
);

export const selectInteractionMonitoringColumns = createSelector(
  subState,
  subState => subState.getIn(['InteractionMonitoring', 'Columns']).toJS()
);
export const selectGroups = createSelector(subState, subState =>
  subState.getIn(['InteractionMonitoring', 'Groups']).toJS()
);
export const selectSkills = createSelector(subState, subState =>
  subState.getIn(['InteractionMonitoring', 'Skills']).toJS()
);
export const areAllColNotActive = createSelector(subState, subState => {
  let active = false;
  subState
    .getIn(['InteractionMonitoring', 'Columns'])
    .forEach(col => (col.get('active') ? (active = true) : null));
  return active;
});

export const selectTimeFormat = createSelector(subState, subState =>
  subState.get('twelveHourFormat')
);
