import { connect } from 'react-redux';
import {
  selectInteractionMonitoringActiveColumns,
  areAllColNotActive,
  selectTimeFormat,
  totalRatio,
  activeMenuItems,
  areAllActive
} from '../../redux/modules/columnFilterMenus/selectors';
import { setCurrentEntity, fetchData } from '../../redux/modules/entities';
import {
  updateTableData,
  setExpanded,
  setSorted,
  setSelected,
  removeSelected,
  startInteractionMonitoring,
  getExtensions
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
  userHasViewAllMonitoredCallsPermission,
  userHasMonitorAllCallsPermission,
  selectExtensions,
  isFetchingUserExtensions
} from '../../redux/modules/reporting/interactionMonitoring/selectors';
import {
  selectSupervisorToolbarSilentMonitoringInteractionId,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectCanSilentMonitor,
  selectLoadingUserStatus
} from '../../redux/modules/supervisorToolbar/selectors';
import { getCurrentAgentId } from '../../redux/modules/userData/selectors';
import { getHelpLink } from '../EntityTable/selectors';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';

import Layout from './layout';
import { isInIframe } from 'serenova-js-utils/browser';

const TABLE_TYPE = 'interactionMonitoring';

export const mapStateToProps = (state, props) => ({
  pageTitle: entitiesMetaData[TABLE_TYPE] ? entitiesMetaData[TABLE_TYPE].pageTitle : '',
  pageHelpLink: getHelpLink(state),
  getCurrentAgentId: getCurrentAgentId(state),
  areAllColNotActive: areAllColNotActive(state, {
    menuType: 'Columns',
    tableType: TABLE_TYPE
  }),
  activeGroupFilters: activeMenuItems(state, { tableType: TABLE_TYPE, menuType: 'Groups' }).toJS(),
  activeSkillFilters: activeMenuItems(state, { tableType: TABLE_TYPE, menuType: 'Skills' }).toJS(),
  groupsAreAllActive: areAllActive(state, { tableType: TABLE_TYPE, menuType: 'Groups' }),
  skillsAreAllActive: areAllActive(state, { tableType: TABLE_TYPE, menuType: 'Skills' }),
  extensions: selectExtensions(state),
  totalRatio: totalRatio(state, props),
  activeColumns: selectInteractionMonitoringActiveColumns(state, props),
  twelveHourFormat: selectTimeFormat(state, props),
  tableData: selectInteractionMonitoringTableData(state, props),
  expanded: selectInteractionMonitoringExpanded(state, props),
  selected: selectInteractionMonitoringSelected(state, props),
  sorted: selectInteractionMonitoringSorted(state, props),
  monitoredId: selectSupervisorToolbarSilentMonitoringInteractionId(state, props),
  monitoringStatus: selectSupervisorToolbarSilentMonitoringStatus(state, props),
  userHasViewAllMonitoredCallsPermission: userHasViewAllMonitoredCallsPermission(state),
  userHasMonitorAllCallsPermission: userHasMonitorAllCallsPermission(state),
  insideIframe: !isInIframe(),
  canSilentMonitor: selectCanSilentMonitor(state),
  loadingUserStatus: selectLoadingUserStatus(state),
  isFetchingUserExtensions: isFetchingUserExtensions(state)
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
  getExtensions,
  setCurrentEntity
};

export default connect(mapStateToProps, actions)(Layout);
