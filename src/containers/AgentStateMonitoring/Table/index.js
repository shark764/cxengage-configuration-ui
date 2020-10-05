import { connect } from 'react-redux';
import {
  selectAgentStateMonitoringActiveColumns,
  areAllColNotActive,
  selectVisibleSubMenu,
  activeMenuItems,
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
  pageTitle: entitiesMetaData[props.tableType] ? entitiesMetaData[props.tableType].pageTitle : '',
  pageHelpLink: getHelpLink(state),
  areAllColNotActive: areAllColNotActive(state, { ...props, menuType: 'Columns' }),
  activeColumns: selectAgentStateMonitoringActiveColumns(state, props),
  currentVisibleSubMenu: selectVisibleSubMenu(state, props),
  filterValues: {
    channelTypes: activeMenuItems(state, { ...props, menuType: 'ChannelType' }).toJS(),
    skills: activeMenuItems(state, { ...props, menuType: 'Skills' }).toJS(),
    groups: activeMenuItems(state, { ...props, menuType: 'Groups' }).toJS(),
    reasons: activeMenuItems(state, { ...props, menuType: 'ReasonLists' }).toJS()
  },
  allActive: {
    channelTypes: areAllActive(state, { ...props, menuType: 'ChannelType' }),
    skills: areAllActive(state, { ...props, menuType: 'Skills' }),
    groups: areAllActive(state, { ...props, menuType: 'Groups' }),
    reasons: areAllActive(state, { ...props, menuType: 'ReasonLists' }),
    direction: areAllActive(state, { ...props, menuType: 'Direction' }),
    state: areAllActive(state, { ...props, menuType: 'PresenceState' })
  },
  tableData: selectAgentStateMonitoringTableDataJS(state, props),
  expanded: selectAgentStateMonitoringExpanded(state, props),
  selected: selectAgentStateMonitoringSelected(state, props),
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
