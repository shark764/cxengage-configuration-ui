import { connect } from 'react-redux';
import {
  selectAgentStateMonitoringActiveColumns,
  areAllColNotActive,
  selectVisibleSubMenu,
  menuItemsJs,
  areAllActive
} from '../../../redux/modules/columnFilterMenus/selectors';
import {
  setSorted,
  setSelected,
  removeSelected,
  setAgentDirection,
  setAgentPresenceState,
  setAgentSelected,
  removeAgentSelected,
  getAgentReasonLists,
  toggleBulkAgentChange
} from '../../../redux/modules/reporting/agentStateMonitoring';
import { toggleTimeFormat, setVisibleMenu } from '../../../redux/modules/columnFilterMenus';
import {
  selectAgentStateMonitoringTableDataJS,
  selectAgentStateMonitoringSorted,
  selectAgentStateMonitoringExpanded,
  selectAgentStateMonitoringSelected,
  selectAgentPresenceReasonLists,
  selectCurrentAgentSelected,
  selectCurrentMenuOpen,
  isUpdatingAgentData
} from '../../../redux/modules/reporting/agentStateMonitoring/selectors';
import { getHelpLink } from '../../EntityTable/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';
import { userHasPermissions } from '../../../redux/modules/entities/selectors';

import Layout from './layout';

export const mapStateToProps = (state, props) => ({
  pageTitle: entitiesMetaData['agentStateMonitoring'] ? entitiesMetaData['agentStateMonitoring'].pageTitle : '',
  pageHelpLink: getHelpLink(state),
  areAllColNotActive: areAllColNotActive(state, {
    menuType: 'Columns',
    tableType: 'agentStateMonitoring'
  }),
  activeColumns: selectAgentStateMonitoringActiveColumns(state, props),
  currentVisibleSubMenu: selectVisibleSubMenu(state, props),
  filterValues: {
    channelTypes: menuItemsJs(state, { menuType: 'ChannelType', tableType: 'agentStateMonitoring' }),
    skills: menuItemsJs(state, { menuType: 'Skills', tableType: 'agentStateMonitoring' }),
    groups: menuItemsJs(state, { menuType: 'Groups', tableType: 'agentStateMonitoring' }),
    reasons: menuItemsJs(state, { menuType: 'ReasonLists', tableType: 'agentStateMonitoring' })
  },
  allActive: {
    channelTypes: areAllActive(state, { menuType: 'ChannelType', tableType: 'agentStateMonitoring' }),
    skills: areAllActive(state, { menuType: 'Skills', tableType: 'agentStateMonitoring' }),
    groups: areAllActive(state, { menuType: 'Groups', tableType: 'agentStateMonitoring' }),
    reasons: areAllActive(state, { menuType: 'ReasonLists', tableType: 'agentStateMonitoring' })
  },
  tableData: selectAgentStateMonitoringTableDataJS(state, props),
  expanded: selectAgentStateMonitoringExpanded(state, props),
  selected: selectAgentStateMonitoringSelected(state, props),
  sorted: selectAgentStateMonitoringSorted(state, props),
  selectedAgentReasonLists: selectAgentPresenceReasonLists(state),
  agentSelected: selectCurrentAgentSelected(state),
  menuOpen: selectCurrentMenuOpen(state),
  isUpdating: isUpdatingAgentData(state),
  supervisorUpdatePermissions: {
    direction: userHasPermissions(state, ['MANAGE_ALL_USERS_DIRECTION']),
    state: userHasPermissions(state, ['MANAGE_ALL_USER_STATE'])
  }
});

export const actions = {
  toggleTimeFormat,
  setSelected,
  setSorted,
  removeSelected,
  setAgentDirection,
  setAgentPresenceState,
  setAgentSelected,
  removeAgentSelected,
  getAgentReasonLists,
  setVisibleMenu,
  onBulkClick: toggleBulkAgentChange
};

export default connect(mapStateToProps, actions)(Layout);
