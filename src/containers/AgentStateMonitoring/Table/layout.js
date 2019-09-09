import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { Button, PageHeader, Pagination, CustomDropdownMenu, LoadingSpinnerSVG } from 'cx-ui-components';
import styled, { injectGlobal } from 'styled-components';
import 'rxjs/add/operator/map';
import CheckboxFilterMenu from '../../CheckboxFilterMenu';
// import expanderColumn from '../../../components/tableColumns/expander';
import agentNameColumn from '../../../components/tableColumns/agentStateMonitoring/agent';
import channelTypesColumn from '../../../components/tableColumns/agentStateMonitoring/channelTypes';
import directionColumn from '../../../components/tableColumns/agentStateMonitoring/direction';
import presenceStateColumn from '../../../components/tableColumns/agentStateMonitoring/presenceState';
import groupsColumn from '../../../components/tableColumns/agentStateMonitoring/groups';
import skillsColumn from '../../../components/tableColumns/agentStateMonitoring/skills';
import reasonCodeColumn from '../../../components/tableColumns/agentStateMonitoring/reasonCode';
import presenceStateDurationColumn from '../../../components/tableColumns/agentStateMonitoring/presenceStateDuration';
import offeredColumn from '../../../components/tableColumns/agentStateMonitoring/offered';
import acceptedColumn from '../../../components/tableColumns/agentStateMonitoring/accepted';
import rejectedColumn from '../../../components/tableColumns/agentStateMonitoring/rejected';
import acceptedRateColumn from '../../../components/tableColumns/agentStateMonitoring/acceptedRate';
import awayTimeColumn from '../../../components/tableColumns/agentStateMonitoring/awayTime';
import awayRateColumn from '../../../components/tableColumns/agentStateMonitoring/awayRate';
import bulkColumn from '../../../components/tableColumns/agentStateMonitoring/bulk';

const GridContainer = styled.div`
  display: grid;
  grid-template-areas: 'header header' 'table  table';
  padding: 20px;
`;

const GridTable = styled(ReactTable)`
  grid-area: table;
`;

const Header = styled(PageHeader)`
  grid-area: header;
`;

const ActionsMenu = styled(CustomDropdownMenu)`
  font-size: 14px;
  padding: 7px 15px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  color: #07487a;
  background-color: white;
`;
const ActionButton = styled(Button)`
  margin: 5px auto;
`;
const InlineCheckboxFilterMenu = styled(CheckboxFilterMenu)`
  display: inline-block;
  margin-left: 5px;
`;
const ConverTimeButton = styled(Button)`
  margin-right: 10px;
`;

injectGlobal`
  .AgentStateMonitoringTable .rt-tbody {
    overflow-y: overlay;
  }
  .AgentStateMonitoringTable .rt-resizer {
    z-index: 2 !important;
  }
`;

export default class AgentStateMonitoringTable extends Component {
  constructor() {
    super();
    this.state = {
      filtered: [],
      defaultRowsNumber: parseFloat((window.innerHeight / 32 - 8).toFixed(0))
    };
  }

  defaultFilterMethod = ({ value, id }, row) =>
    String(row[id])
      .toLowerCase()
      .indexOf(value.toLowerCase()) > -1;

  selectToggle = (data, bool, visibleOrAll) => {
    this.props.setVisibleMenu('none', 'agentStateMonitoring');
    data.forEach(x =>
      this.props.onBulkClick(
        visibleOrAll === 'visible' ? x._original.agentId : x.id,
        visibleOrAll === 'visible' ? x._original.sessionId : x.sessionId,
        bool
      )
    );
  };

  getData = visibleOrAll => {
    const pageIndex = this.selectTable.getResolvedState().page;
    const pageSize = this.selectTable.getResolvedState().pageSize;
    const startIndex = pageIndex > 0 ? pageSize * pageIndex : pageIndex;
    const endIndex = startIndex + pageSize;
    if (visibleOrAll === 'visible') {
      return this.selectTable
        .getResolvedState()
        .sortedData.filter((x, index) => index >= startIndex && index < endIndex);
    } else {
      return this.selectTable.props.data;
    }
  };

  selectAllVisible = () => {
    this.selectToggle(this.getData('visible'), true, 'visible');
  };
  unselectAllVisible = () => {
    this.selectToggle(this.getData('visible'), false, 'visible');
  };

  highlightRow = ({ row: { _original: { agentId } } }) =>
    agentId === this.props.agentSelected || agentId === this.props.selected;

  getTableRowProps = (state, rowInfo) => {
    if (rowInfo) {
      return {
        onDoubleClick: () => {
          if (this.props.selected === rowInfo.row._original.agentId) {
            return this.props.removeSelected();
          } else {
            return this.props.setSelected(rowInfo.row._original.agentId, {
              [rowInfo.viewIndex]: rowInfo.row._original.agentId
            });
          }
        },
        style: {
          background: this.highlightRow(rowInfo) ? 'rgba(253, 255, 50, 0.17)' : null
        }
      };
    } else {
      return { style: {} };
    }
  };
  getTdProps = () => ({ style: { fontSize: '11.5pt' } });
  getTheadProps = () => ({ style: { color: 'grey' } });
  onFilteredChange = filtered => this.setState({ filtered: filtered });
  onSortedChange = sorted => this.props.setSorted(sorted);

  // TODO:
  // Improve SubComponent with agent
  // and capacity details
  // SubComponent = ({
  //   row: { agentName, direction, channelTypes, state, presence, reasonName, currentStateDuration, groups, skills }
  // }) => (
  //   <AgentStateDetails
  //     data={{ agentName, direction, channelTypes, state, presence, reasonName, currentStateDuration, groups, skills }}
  //   />
  // );

  toggleTimeFormat = () => this.props.toggleTimeFormat();

  render() {
    return (
      <GridContainer id={this.props.id} className={this.props.className}>
        <Header text={this.props.pageTitle} helpLink={this.props.pageHelpLink}>
          <ActionsMenu
            currentFilter="Actions"
            setVisibleMenu={this.props.setVisibleMenu}
            currentVisibleSubMenu={this.props.currentVisibleSubMenu}
            menuType="actionsMenu"
            buttonType="columnFilter"
            tableType={`agentStateMonitoring`}
            id="actions-button"
          >
            <ActionButton
              buttonType="columnFilter"
              data-automation="tableItemsActionsSelectAllVisible"
              onClick={this.selectAllVisible}
            >
              Select All Visible
            </ActionButton>
            <ActionButton
              buttonType="columnFilter"
              data-automation="tableItemsActionsUnselectAllVisible"
              onClick={this.unselectAllVisible}
            >
              Unselect All Visible
            </ActionButton>
          </ActionsMenu>

          <InlineCheckboxFilterMenu
            type="secondary"
            menuType="Columns"
            tableType={`agentStateMonitoring`}
            currentVisibleSubMenu={this.props.currentVisibleSubMenu}
            selectionType="checkbox"
          >
            Columns
          </InlineCheckboxFilterMenu>
        </Header>

        {!this.props.areAllColNotActive && (
          <GridTable
            tableType="agentStateMonitoring"
            innerRef={r => (this.selectTable = r)}
            PaginationComponent={Pagination}
            defaultPageSize={this.state.defaultRowsNumber}
            pageSizeOptions={[this.state.defaultRowsNumber, 20, 50, 100]}
            className="AgentStateMonitoringTable -striped -highlight"
            data={this.props.tableData}
            noDataText={this.props.fetching ? <LoadingSpinnerSVG size={60} /> : 'No results found'}
            filterable
            defaultFilterMethod={this.defaultFilterMethod}
            expanded={this.props.expanded}
            sorted={this.props.sorted}
            filtered={this.state.filtered}
            onFilteredChange={this.onFilteredChange}
            onSortedChange={this.onSortedChange}
            getTableProps={this.getTableProps}
            getTdProps={this.getTdProps}
            getTheadProps={this.getTheadProps}
            getTrProps={this.getTableRowProps}
            // TODO:
            // Improve SubComponent with proper data
            // SubComponent={this.SubComponent}
            columns={[
              // expanderColumn(),
              bulkColumn(this.props.onBulkClick),
              channelTypesColumn(
                this.props.activeColumns[0],
                'agentStateMonitoring',
                this.props.filterValues.channelTypes,
                this.props.allActive.channelTypes
              ),
              agentNameColumn(this.props.activeColumns[1]),
              groupsColumn(
                this.props.activeColumns[2],
                'agentStateMonitoring',
                this.props.filterValues.groups,
                this.props.allActive.groups
              ),
              skillsColumn(
                this.props.activeColumns[3],
                'agentStateMonitoring',
                this.props.filterValues.skills,
                this.props.allActive.skills
              ),
              directionColumn(
                this.props.activeColumns[4],
                'agentStateMonitoring',
                this.props.setAgentDirection,
                this.props.setAgentSelected,
                this.props.removeAgentSelected,
                this.props.agentSelected,
                this.props.menuOpen,
                this.props.isUpdating,
                this.props.supervisorUpdatePermissions.direction
              ),
              presenceStateColumn(
                this.props.activeColumns[5],
                'agentStateMonitoring',
                this.props.setAgentPresenceState,
                this.props.setAgentPendingAway,
                this.props.forceLogoutAgent,
                this.props.setAgentSelected,
                this.props.removeAgentSelected,
                this.props.getAgentReasonLists,
                this.props.selectedAgentReasonLists,
                this.props.agentSelected,
                this.props.menuOpen,
                this.props.isUpdating,
                this.props.supervisorUpdatePermissions.state
              ),
              reasonCodeColumn(
                this.props.activeColumns[6],
                'agentStateMonitoring',
                this.props.filterValues.reasons,
                this.props.allActive.reasons
              ),
              presenceStateDurationColumn(this.props.activeColumns[7], 'agentStateMonitoring'),
              offeredColumn(this.props.activeColumns[8]),
              acceptedColumn(this.props.activeColumns[9]),
              rejectedColumn(this.props.activeColumns[10]),
              acceptedRateColumn(this.props.activeColumns[11]),
              awayTimeColumn(this.props.activeColumns[12], 'agentStateMonitoring'),
              awayRateColumn(this.props.activeColumns[13])
            ]}
          />
        )}
      </GridContainer>
    );
  }
}

AgentStateMonitoringTable.propTypes = {
  pageTitle: PropTypes.string,
  pageHelpLink: PropTypes.string,
  tableData: PropTypes.any,
  expanded: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  areAllColNotActive: PropTypes.bool.isRequired,
  sorted: PropTypes.any.isRequired,
  toggleTimeFormat: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  setSorted: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
  activeColumns: PropTypes.arrayOf(PropTypes.bool.isRequired),
  setAgentDirection: PropTypes.func,
  setAgentPresenceState: PropTypes.func,
  setAgentPendingAway: PropTypes.func,
  forceLogoutAgent: PropTypes.func,
  setAgentSelected: PropTypes.func,
  removeAgentSelected: PropTypes.func,
  getAgentReasonLists: PropTypes.func,
  selectedAgentReasonLists: PropTypes.array,
  agentSelected: PropTypes.string,
  menuOpen: PropTypes.string,
  setVisibleMenu: PropTypes.func,
  onBulkClick: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  currentVisibleSubMenu: PropTypes.string,
  isUpdating: PropTypes.bool,
  fetching: PropTypes.bool,
  supervisorUpdatePermissions: PropTypes.object,
  filterValues: PropTypes.object,
  allActive: PropTypes.object
};
