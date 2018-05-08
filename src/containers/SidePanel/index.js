import { connect } from 'react-redux';
import SidePanelLayout from './Layout';
import {
  getSidePanelWidth,
  userHasUpdatePermission
} from '../../redux/modules/entities/selectors';

export const mapStateToProps = (state, props) => ({
  slidingWidth: getSidePanelWidth(state),
  userHasUpdatePermission: userHasUpdatePermission(state)
});

export default connect(mapStateToProps)(SidePanelLayout);
