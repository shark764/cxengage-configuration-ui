import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  areAllActive,
  totalRatio,
  activeFilter
} from '../../redux/modules/columnFilterMenus/selectors';
import {
  toggleAllMenuItemsOn,
  toggleAllMenuItemsOff,
  toggleMenuItems,
  oneOnRestOff,
  toggleAllInverseMenuItems,
  setVisibleMenu
} from '../../redux/modules/columnFilterMenus';
import { CheckboxMenu } from 'cx-ui-components';

const mapStateToProps = (state, props) => ({
  currentVisibleSubMenu: state.getIn([
    'ColumnFilterMenus',
    props.tableType,
    'visibleMenu'
  ]),
  items: state
    .getIn(['ColumnFilterMenus', props.tableType, props.menuType])
    .toJS(),
  allActive: areAllActive(state, props),
  value: activeFilter(state, props),
  totalRatio: totalRatio(state, props)
});

function mapDispatchToProps(dispatch) {
  return {
    oneOnRestOff: (itemName, menuType, tableType) =>
      dispatch(oneOnRestOff(itemName, menuType, tableType)),
    toggleItem: (itemName, menuType, tableType) =>
      dispatch(toggleMenuItems(itemName, menuType, tableType)),
    toggleAllOn: (menuType, tableType) =>
      dispatch(toggleAllMenuItemsOn(menuType, tableType)),
    toggleAllOff: (menuType, tableType) =>
      dispatch(toggleAllMenuItemsOff(menuType, tableType)),
    toggleAllInverse: (menuType, tableType) =>
      dispatch(toggleAllInverseMenuItems(menuType, tableType)),
    setSubMenuVisibility: (menuType, tableType) =>
      dispatch(setVisibleMenu(menuType, tableType)),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxMenu);
