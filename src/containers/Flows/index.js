import { connect } from 'react-redux';
import Flows from './layout';
import { setCurrentEntity, setSelectedEntityId, openFlowDesigner } from '../../redux/modules/entities';

export const actions = {
  setCurrentEntity,
  setSelectedEntityId,
  openFlowDesigner
};

export default connect(null, actions)(Flows);
