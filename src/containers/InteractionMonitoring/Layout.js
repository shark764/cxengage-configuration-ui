import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'rxjs/add/operator/map';
import {
  messageSubscribe,
  messageUnsubscribe
} from './windowMessageObservable';
import {
  localStorageSubscribe,
  localStorageUnsubscribe
} from './localStorageObservable';
import CheckboxFilterMenu from '../CheckboxFilterMenu';
import { Button, PageHeader, InteractionDetails } from 'cx-ui-components';
import ReactTable from 'react-table';
import interactionIdColumn from '../../components/tableColumns/interactionId';
import expanderColumn from '../../components/tableColumns/expander';
import agentColumn from '../../components/tableColumns/agent';
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

export default class InteractionMonitoring extends Component {
  constructor() {
    super();
    this.state = {
      filtered: []
    };
  }

  componentWillMount() {
    messageSubscribe();
    localStorageSubscribe();
    this.props.setCurrentEntity('InteractionMonitoring');
    this.props.fetchData('groups', 'InteractionMonitoring');
    this.props.fetchData('skills', 'InteractionMonitoring');
    this.props.startInteractionMonitoring();
  }

  componentWillUnmount() {
    messageUnsubscribe();
    localStorageUnsubscribe();
  }

  render() {
    return (
      <Wrapper>
        <PageHeader
          text="Interaction Monitoring"
          helpLink="https://docs.cxengage.net/Help/Content/Monitoring/Silent%20Monitoring/Silent-monitoring.htm?Highlight=silent%20monitoring"
        >
          <div>
            <ConverTimeButton
              id="timeConversion"
              type="secondary"
              className="timeConversion"
              onClick={() => this.props.toggleTimeFormat()}
            >
              {this.props.twelveHourFormat ? '12h' : '24h'}
            </ConverTimeButton>
            <InlineCheckboxFilterMenu
              type="secondary"
              menuType="Columns"
              tableType="InteractionMonitoring"
              selectionType="checkbox"
            >
              Columns
            </InlineCheckboxFilterMenu>
          </div>
        </PageHeader>

        {!this.props.areAllColNotActive && (
          <ReactTable
            defaultPageSize={20}
            className="-striped -highlight"
            data={this.props.tableData}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id])
                .toLowerCase()
                .indexOf(filter.value.toLowerCase()) > -1
            }
            expanded={this.props.expanded}
            sorted={this.props.sorted}
            filtered={this.state.filtered}
            onFilteredChange={filtered => {
              this.setState({ filtered: filtered });
            }}
            onSortedChange={sorted => this.props.setSorted(sorted)}
            getTableProps={() => ({ style: { height: '80vh' } })}
            getTdProps={() => ({ style: { fontSize: '11.5pt' } })}
            getTheadProps={() => ({ style: { color: 'grey' } })}
            getTrProps={(state, rowInfo, column) => {
              if (rowInfo) {
                return {
                  onClick: e => {
                    if (this.props.selected === rowInfo.row.interactionId) {
                      this.props.removeSelected();
                    } else {
                      this.props.setSelected(rowInfo.row.interactionId, {
                        [rowInfo.viewIndex]: rowInfo.row.interactionId
                      });
                    }
                  },
                  style: {
                    background:
                      rowInfo.row.interactionId === this.props.monitoredId
                        ? 'rgba(253, 255, 50, 0.17)'
                        : null
                  }
                };
              } else {
                return { style: {} };
              }
            }}
            SubComponent={({ row }) => {
              const {
                startTimestamp,
                agentName,
                direction,
                channel,
                contactPoint,
                flowName,
                customer,
                monitoring
              } = row;
              return (
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
            }}
            columns={[
              expanderColumn(),
              interactionIdColumn(this.props.activeColumns[0]),
              agentColumn(this.props.activeColumns[1]),
              customerColumn(this.props.activeColumns[2]),
              contactPointColumn(this.props.activeColumns[3]),
              flowColumn(this.props.activeColumns[4]),
              channelColumn(this.props.activeColumns[5]),
              directionColumn(
                this.props.activeColumns[6],
                'InteractionMonitoring'
              ),
              presenceStateColumn(this.props.activeColumns[7]),
              startDateColumn(
                this.props.activeColumns[8],
                'InteractionMonitoring'
              ),
              startTimeColumn(
                this.props.activeColumns[9],
                'InteractionMonitoring',
                this.props.twelveHourFormat
              ),
              elapsedTimeColumn(
                this.props.activeColumns[10],
                'InteractionMonitoring'
              ),
              monitoringColumn(
                this.props.activeColumns[11],
                'InteractionMonitoring',
                this.props.monitoredId,
                this.props.monitoringStatus
              ),
              groupsColumn(
                this.props.activeColumns[12],
                'InteractionMonitoring'
              ),
              skillsColumn(
                this.props.activeColumns[13],
                'InteractionMonitoring'
              )
            ]}
          />
        )}
      </Wrapper>
    );
  }
}

InteractionMonitoring.propTypes = {
  monitoredId: PropTypes.string,
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
  activeColumns: PropTypes.arrayOf(PropTypes.bool.isRequired)
};
