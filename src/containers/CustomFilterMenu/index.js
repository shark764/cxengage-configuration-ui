import { connect } from 'react-redux';
import { setVisibleMenu } from '../../redux/modules/columnFilterMenus';
import { CustomDropdownMenu } from 'cx-ui-components';
import { selectVisibleSubMenu } from '../../redux/modules/columnFilterMenus/selectors';

export const mapStateToProps = (state, props) => ({
  currentVisibleSubMenu: selectVisibleSubMenu(state, props)
});

export const actions = { setVisibleMenu };

export default connect(mapStateToProps, actions)(CustomDropdownMenu);
