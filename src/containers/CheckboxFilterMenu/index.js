import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { areAllActive } from './selectors';
import {
  toggleAllMenuItemsOn,
  toggleAllMenuItemsOff,
  toggleMenuItems,
  toggleAllInverseMenuItems,
  setVisibleMenu
} from './actions';

import CheckboxMenu from '../../components/checkboxMenu.js';

class CheckboxFilterMenu extends React.Component {
  // componentWillMount() {
  //   if (this.props.visibleMenu !== this.props.menuType) {
  //     this.props.setVisibleMenu(this.props.menuType);
  //   }
  // }

  render() {
    return (
      <CheckboxMenu
        items={this.props.items}
        buttonText={this.props.menuType}
        style={this.props.style}
        toggleAllOn={this.props.toggleAllItemsOn}
        toggleAllOff={this.props.toggleAllItemsOff}
        toggleItem={this.props.toggleItem}
        toggleAllInverse={this.props.toggleAllInverseItems}
        allActive={this.props.allActive}
        menuType={this.props.menuType}
        setSubMenuVisibility={this.props.setVisibleMenu}
        currentVisibleSubMenu={this.props.visibleMenu}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  visibleMenu: state.get('CheckboxFilterMenu').get('visibleMenu'),
  items: state.get('CheckboxFilterMenu').get(props.menuType),
  allActive: areAllActive(state, props)
});

function mapDispatchToProps(dispatch) {
  return {
    toggleItem: (columnName, menuType) =>
      dispatch(toggleMenuItems(columnName, menuType)),
    toggleAllItemsOn: menuType => dispatch(toggleAllMenuItemsOn(menuType)),
    toggleAllItemsOff: menuType => dispatch(toggleAllMenuItemsOff(menuType)),
    toggleAllInverseItems: menuType =>
      dispatch(toggleAllInverseMenuItems(menuType)),
    setVisibleMenu: menuType => dispatch(setVisibleMenu(menuType)),
    dispatch
  };
}

CheckboxFilterMenu.propTypes = {
  menuType: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  allActive: PropTypes.bool.isRequired,
  toggleItem: PropTypes.func.isRequired,
  toggleAllItemsOn: PropTypes.func.isRequired,
  toggleAllItemsOff: PropTypes.func.isRequired,
  toggleAllInverseItems: PropTypes.func.isRequired,
  setVisibleMenu: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxFilterMenu);
