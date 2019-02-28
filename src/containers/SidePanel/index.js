import { connect } from 'react-redux';
import SidePanelLayout from './layout';
import { getSidePanelWidth, userHasCurrentFormPermission } from '../../redux/modules/entities/selectors';

export const mapStateToProps = (state, props) => ({
  slidingWidth: getSidePanelWidth(state),
  userHasCurrentFormPermission: userHasCurrentFormPermission(state)
});

export default connect(mapStateToProps)(SidePanelLayout);
