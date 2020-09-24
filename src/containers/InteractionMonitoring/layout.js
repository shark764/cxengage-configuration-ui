import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import 'rxjs/add/operator/map';
import { messageSubscribe, messageUnsubscribe } from './windowMessageObservable';
import { localStorageSubscribe, localStorageUnsubscribe } from './localStorageObservable';
import CheckboxFilterMenu from '../CheckboxFilterMenu';
import { Button, PageHeader, InteractionDetails, Pagination, Confirmation, LoadingSpinnerSVG } from 'cx-ui-components';
import ReactTable from 'react-table';
import interactionIdColumn from '../../components/tableColumns/interactionId';
import expanderColumn from '../../components/tableColumns/expander';
import agentsColumn from '../../components/tableColumns/agents';
import customerColumn from '../../components/tableColumns/customer';
import contactPointColumn from '../../components/tableColumns/contactPoint';
import flowColumn from '../../components/tableColumns/flow';
import channelColumn from '../../components/tableColumns/channel';
import directionColumn from '../../components/tableColumns/direction';
import presenceStateColumn from '../../components/tableColumns/presence';
import startDateColumn from '../../components/tableColumns/startDate';
import startTimeColumn from '../../components/tableColumns/startTime';
import elapsedTimeColumn from '../../components/tableColumns/elapsedTime';
import monitoringColumn from '../../components/tableColumns/monitoring';
import groupsColumn from '../../components/tableColumns/groups';
import skillsColumn from '../../components/tableColumns/skills';

const InlineCheckboxFilterMenu = styled(CheckboxFilterMenu)`
  display: inline-block;
`;
const ConverTimeButton = styled(Button)`
  margin-right: 20px;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

injectGlobal`
.InteractionMonitoringTable .rt-tbody {
  overflow-y: overlay;
}
.InteractionMonitoringTable .rt-resizer {
  z-index: 2 !important;
}
.InteractionMonitoringTable .rt-td:last-child {
  overflow: visible;
}
`;

export default class InteractionMonitoring extends Component {
  constructor() {
    super();
    this.state = {
      filtered: [{ id: 'channel', value: 'voice' }],
      defaultRowsNumber: parseFloat((window.innerHeight / 32 - 8).toFixed(0)),
      showNoExtensionsWarning: false
    };
  }

  componentWillMount() {
    messageSubscribe();
    localStorageSubscribe();
    this.props.getExtensions();
    this.props.setCurrentEntity('interactionMonitoring');
    this.props.fetchData('groups', 'interactionMonitoring');
    this.props.fetchData('skills', 'interactionMonitoring');
    this.props.startInteractionMonitoring();
  }

  componentWillUnmount() {
    messageUnsubscribe();
    localStorageUnsubscribe();
  }
  defaultFilterMethod = ({ value, id }, row) =>
    String(row[id])
      .toLowerCase()
      .indexOf(value.toLowerCase()) > -1;

  highlightRow = ({ row }) =>
    row.interactionId === this.props.monitoredId ||
    row.monitoring.filter(x => x.agentId === this.props.getCurrentAgentId && x.endTimestamp === null).length === 1;

  getTableRowProps = (state, rowInfo) => {
    if (rowInfo) {
      return {
        onClick: () => {
          if (this.props.selected === rowInfo.row.interactionId) {
            return this.props.removeSelected();
          } else {
            return this.props.setSelected(rowInfo.row.interactionId, {
              [rowInfo.viewIndex]: rowInfo.row.interactionId
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
  SubComponent = ({
    row: { startTimestamp, agentName, direction, channel, contactPoint, flowName, customer, monitoring }
  }) =>
    this.props.userHasViewAllMonitoredCallsPermission && (
      <InteractionDetails
        data={{
          startTimestamp,
          agentName,
          direction,
          channel,
          contactPoint,
          flowName,
          customer,
          monitoring
        }}
        twelveHourFormat={this.props.twelveHourFormat}
      />
    );
  toggleTimeFormat = () => this.props.toggleTimeFormat();

  showNoExtensionsWarning = (e, show = true) => {
    e.stopPropagation();
    this.setState({ showNoExtensionsWarning: show });
  };

  render() {
    return (
      <Wrapper>
        <PageHeader text={this.props.pageTitle} helpLink={this.props.pageHelpLink}>
          <div>
            <ConverTimeButton
              id="timeConversion"
              type="secondary"
              className="timeConversion"
              onClick={this.toggleTimeFormat}
            >
              {this.props.twelveHourFormat ? '12h' : '24h'}
            </ConverTimeButton>
            <InlineCheckboxFilterMenu
              type="secondary"
              menuType="Columns"
              tableType="interactionMonitoring"
              selectionType="checkbox"
            >
              Columns
            </InlineCheckboxFilterMenu>
          </div>
        </PageHeader>

        {!this.props.areAllColNotActive && (
          <ReactTable
            PaginationComponent={Pagination}
            noDataText={
              this.props.isFetchingUserExtensions ? <LoadingSpinnerSVG size={60} /> : 'No active interactions found'
            }
            defaultPageSize={this.state.defaultRowsNumber}
            pageSizeOptions={[this.state.defaultRowsNumber, 20, 50, 100]}
            className="InteractionMonitoringTable -striped -highlight"
            data={this.props.tableData}
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
            SubComponent={this.SubComponent}
            columns={[
              expanderColumn(),
              interactionIdColumn(this.props.activeColumns[0]),
              agentsColumn(this.props.activeColumns[1]),
              customerColumn(this.props.activeColumns[2]),
              contactPointColumn(this.props.activeColumns[3]),
              flowColumn(this.props.activeColumns[4]),
              channelColumn(this.props.activeColumns[5]),
              directionColumn(this.props.activeColumns[6], 'interactionMonitoring'),
              presenceStateColumn(this.props.activeColumns[7]),
              startDateColumn(this.props.activeColumns[8], 'interactionMonitoring'),
              startTimeColumn(this.props.activeColumns[9], 'interactionMonitoring', this.props.twelveHourFormat),
              elapsedTimeColumn(this.props.activeColumns[10], 'interactionMonitoring'),
              groupsColumn(
                this.props.activeColumns[12],
                'interactionMonitoring',
                this.props.activeGroupFilters,
                this.props.groupsAreAllActive
              ),
              skillsColumn(
                this.props.activeColumns[13],
                'interactionMonitoring',
                this.props.activeSkillFilters,
                this.props.skillsAreAllActive
              ),
              monitoringColumn(
                this.props.activeColumns[11],
                'interactionMonitoring',
                this.props.monitoredId,
                this.props.monitoringStatus,
                this.props.getCurrentAgentId,
                this.props.userHasMonitorAllCallsPermission,
                this.props.extensions,
                this.props.canSilentMonitor,
                this.props.loadingUserStatus,
                this.showNoExtensionsWarning
              )
            ]}
          />
        )}
        {this.state.showNoExtensionsWarning && (
          <Confirmation
            mainText="You do not have any extensions configured in your user profile"
            openPopupBox={true}
            cancelBtnText="Okay"
            cancelBtnCallback={e => this.showNoExtensionsWarning(e, false)}
            onMaskClick={e => this.showNoExtensionsWarning(e, false)}
          />
        )}
      </Wrapper>
    );
  }
}

InteractionMonitoring.propTypes = {
  monitoredId: PropTypes.string,
  getCurrentAgentId: PropTypes.string,
  monitoringStatus: PropTypes.string,
  totalRatio: PropTypes.array,
  tableData: PropTypes.any,
  expanded: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  areAllColNotActive: PropTypes.bool.isRequired,
  sorted: PropTypes.any.isRequired,
  toggleTimeFormat: PropTypes.func.isRequired,
  updateTableData: PropTypes.func.isRequired,
  updateSkillsColumnFilter: PropTypes.func.isRequired,
  updateGroupsColumnFilter: PropTypes.func.isRequired,
  setExpanded: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  setSorted: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
  twelveHourFormat: PropTypes.bool.isRequired,
  activeColumns: PropTypes.arrayOf(PropTypes.bool.isRequired),
  setCurrentEntity: PropTypes.func,
  fetchData: PropTypes.func,
  startInteractionMonitoring: PropTypes.func,
  getExtensions: PropTypes.func,
  userHasViewAllMonitoredCallsPermission: PropTypes.bool.isRequired,
  userHasMonitorAllCallsPermission: PropTypes.bool,
  insideIframe: PropTypes.bool,
  pageTitle: PropTypes.string,
  pageHelpLink: PropTypes.string,
  extensions: PropTypes.array,
  canSilentMonitor: PropTypes.bool,
  loadingUserStatus: PropTypes.bool,
  activeGroupFilters: PropTypes.array,
  activeSkillFilters: PropTypes.array,
  skillsAreAllActive: PropTypes.bool,
  groupsAreAllActive: PropTypes.bool,
  isFetchingUserExtensions: PropTypes.bool
};
