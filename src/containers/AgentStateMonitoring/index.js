import { connect } from 'react-redux';
import { setCurrentEntity, fetchData } from '../../redux/modules/entities';
import { startAgentStateMonitoring, setSelectedSidePanelId } from '../../redux/modules/reporting/agentStateMonitoring';
import {
  getSelectedSidePanelId,
  getSelectedAgentsBulkChangeItems
} from '../../redux/modules/reporting/agentStateMonitoring/selectors';
import { getSidePanelWidth } from '../../redux/modules/entities/selectors';

import Layout from './layout';

export const mapStateToProps = state => ({
  selectedSidePanelId: getSelectedSidePanelId(state),
  slidingWidth: getSidePanelWidth(state),
  bulkSelectedTotal: getSelectedAgentsBulkChangeItems(state)
});

export const actions = { fetchData, startAgentStateMonitoring, setCurrentEntity, setSelectedSidePanelId };

export default connect(mapStateToProps, actions)(Layout);
