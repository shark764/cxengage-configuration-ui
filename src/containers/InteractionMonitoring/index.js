import { connect } from 'react-redux';
import {
  selectInteractionMonitoringColumns,
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
  selectInteractionMonitoringSelected
} from '../../redux/modules/reporting/interactionMonitoring/selectors';

import Layout from './Layout';

const mapStateToProps = (state, props) => ({
  areAllColNotActive: areAllColNotActive(state, {
    menuType: 'Columns',
    tableType: 'InteractionMonitoring'
  }),
  totalRatio: totalRatio(state, props),
  activeColumns: selectInteractionMonitoringColumns(state, props).map(
    ({ active, name }) => active
  ),
  twelveHourFormat: selectTimeFormat(state, props),
  tableData: selectInteractionMonitoringTableData(state, props),
  expanded: selectInteractionMonitoringExpanded(state, props),
  selected: selectInteractionMonitoringSelected(state, props),
  sorted: selectInteractionMonitoringSorted(state, props)
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTimeFormat: () => dispatch(toggleTimeFormat()),
    updateTableData: tableData => dispatch(updateTableData(tableData)),
    updateSkillsColumnFilter: (skillsData, tableType) =>
      dispatch(updateSkillsColumnFilter(skillsData, tableType)),
    updateGroupsColumnFilter: (groupsData, tableType) =>
      dispatch(updateGroupsColumnFilter(groupsData, tableType)),
    setExpanded: expanded => dispatch(setExpanded(expanded)),
    setSelected: (selected, expanded) =>
      dispatch(setSelected(selected, expanded)),
    setSorted: sorted => dispatch(setSorted(sorted)),
    removeSelected: () => dispatch(removeSelected()),
    fetchData: (entityName, tableType) =>
      dispatch(fetchData(entityName, tableType)),
    startInteractionMonitoring: () => dispatch(startInteractionMonitoring()),
    setCurrentEntity: entityName => {
      dispatch(setCurrentEntity(entityName));
    },
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
