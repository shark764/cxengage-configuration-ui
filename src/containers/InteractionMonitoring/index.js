import { connect } from 'react-redux';
import {
  selectInteractionMonitoringActiveColumns,
  areAllColNotActive,
  selectTimeFormat,
  totalRatio
} from '../../redux/modules/columnFilterMenus/selectors';
import { setCurrentEntity, fetchData } from '../../redux/modules/entities';
import {
  updateTableData,
  setExpanded,
  setSorted,
  setSelected,
  removeSelected,
  startInteractionMonitoring
} from '../../redux/modules/reporting/interactionMonitoring';
import {
  updateSkillsColumnFilter,
  updateGroupsColumnFilter,
  toggleTimeFormat
} from '../../redux/modules/columnFilterMenus';
import {
  selectInteractionMonitoringTableData,
  selectInteractionMonitoringSorted,
  selectInteractionMonitoringExpanded,
  selectInteractionMonitoringSelected,
  userHasViewAllMonitoredCallsPermission
} from '../../redux/modules/reporting/interactionMonitoring/selectors';
import {
  selectSupervisorToolbarSilentMonitoringInteractionId,
  selectSupervisorToolbarSilentMonitoringStatus
} from '../../redux/modules/supervisorToolbar/selectors';
import { getCurrentAgentId } from '../../redux/modules/userData/selectors';

import Layout from './Layout';

export const mapStateToProps = (state, props) => ({
  getCurrentAgentId: getCurrentAgentId(state),
  areAllColNotActive: areAllColNotActive(state, {
    menuType: 'Columns',
    tableType: 'InteractionMonitoring'
  }),
  totalRatio: totalRatio(state, props),
  activeColumns: selectInteractionMonitoringActiveColumns(state, props),
  twelveHourFormat: selectTimeFormat(state, props),
  tableData: selectInteractionMonitoringTableData(state, props),
  expanded: selectInteractionMonitoringExpanded(state, props),
  selected: selectInteractionMonitoringSelected(state, props),
  sorted: selectInteractionMonitoringSorted(state, props),
  monitoredId: selectSupervisorToolbarSilentMonitoringInteractionId(
    state,
    props
  ),
  monitoringStatus: selectSupervisorToolbarSilentMonitoringStatus(state, props),
  userHasViewAllMonitoredCallsPermission: userHasViewAllMonitoredCallsPermission(
    state
  )
});

export const actions = {
  toggleTimeFormat,
  updateTableData,
  updateSkillsColumnFilter,
  updateGroupsColumnFilter,
  setExpanded,
  setSelected,
  setSorted,
  removeSelected,
  fetchData,
  startInteractionMonitoring,
  setCurrentEntity
};

export default connect(mapStateToProps, actions)(Layout);
