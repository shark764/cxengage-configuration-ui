import { connect } from 'react-redux';
import {
  areAllActive,
  totalRatio,
  selectVisibleSubMenu,
  menuItemsJs
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

export const mapStateToProps = (state, props) => ({
  currentVisibleSubMenu: selectVisibleSubMenu(state, props),
  items: menuItemsJs(state, props),
  allActive: areAllActive(state, props),
  totalRatio: totalRatio(state, props)
});

export const actions = {
  oneOnRestOff: oneOnRestOff,
  toggleItem: toggleMenuItems,
  toggleAllOn: toggleAllMenuItemsOn,
  toggleAllOff: toggleAllMenuItemsOff,
  toggleAllInverse: toggleAllInverseMenuItems,
  setSubMenuVisibility: setVisibleMenu
};

export default connect(mapStateToProps, actions)(CheckboxMenu);
