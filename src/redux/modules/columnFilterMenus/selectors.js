/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { List } from 'immutable';

const subState = state => state.get('ColumnFilterMenus');

const menuItems = (state, props) => {
  if (props.menuType && props.tableType) {
    return state
      .get('ColumnFilterMenus')
      .getIn([props.tableType, props.menuType]);
  } else {
    return new List();
  }
};

const menu = (state, props) => {
  if (props.tableType) {
    return state.get('ColumnFilterMenus').get(props.tableType);
  } else {
    return new List();
  }
};

export const selectVisibleSubMenu = createSelector([menu], menu => {
  return menu.get('visibleMenu');
});

export const areAllActive = createSelector([menuItems], menuItems => {
  let active = true;
  menuItems.forEach(item => (!item.get('active') ? (active = false) : null));
  return menuItems.size === 0 ? false : active;
});

export const totalRatio = createSelector([menuItems], menuItems => {
  let activeAmount = 0;
  const totalItems = menuItems.size;
  menuItems.forEach(item => (item.get('active') ? activeAmount++ : null));
  return [activeAmount, totalItems];
});

export const selectInteractionMonitoringColumns = createSelector(
  subState,
  subState => subState.getIn(['InteractionMonitoring', 'Columns']).toJS()
);
export const selectGroups = createSelector(menu, menu =>
  menu.get('Groups').toJS()
);
export const selectSkills = createSelector(menu, menu =>
  menu.get('Skills').toJS()
);
export const areAllColNotActive = createSelector(menuItems, menuItems => {
  if (menuItems.size === 0) {
    return true;
  } else {
    let anyActive = false;
    menuItems.forEach(col => (col.get('active') ? (anyActive = true) : null));
    return anyActive ? false : true;
  }
});

export const selectTimeFormat = state =>
  subState(state).get('twelveHourFormat');
