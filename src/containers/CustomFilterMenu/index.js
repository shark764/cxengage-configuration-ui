import { connect } from 'react-redux';

import { setVisibleMenu } from '../../redux/modules/columnFilterMenus';

import { CustomDropdownMenu } from 'cx-ui-components';

const mapStateToProps = (state, props) => ({
  currentVisibleSubMenu: state.getIn([
    'ColumnFilterMenus',
    props.tableType,
    'visibleMenu'
  ])
});

function mapDispatchToProps(dispatch) {
  return {
    setVisibleMenu: (menuType, tableType) =>
      dispatch(setVisibleMenu(menuType, tableType)),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDropdownMenu);
