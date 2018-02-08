import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { selectInteractionMonitoringTableData } from './selectors';
import { updateTableData } from './actions';
import moment from 'moment';
import { makeFakeInteraction } from '../../tools/testInteractions.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ColumnsMenu } from 'cx-ui-components';

import ReactTable from 'react-table';
import './style.css';
import { setTimeout } from 'timers';

const Title = styled.h2`
  font-size: 21px;
  font-family: Arial;
  font-weight: bold;
  color: #474747;
`;

const TableButton = styled.button`
  background: none;
  border: none;
  color: #656565c9;
`;

class InteractionMonitoring extends Component {
  constructor() {
    super();
    this.state = {
      clipboardValue: '',
      copied: false,
      data: [],
      sorted: [],
      page: 0,
      pageSize: 10,
      expanded: {},
      resized: [],
      filtered: []
    };
  }

  componentDidMount() {
    setInterval(() => {
      let fakeInteractionArray = this.state.data;
      fakeInteractionArray.push(makeFakeInteraction());
      this.setState({ data: fakeInteractionArray });
    }, 2000);

    setTimeout(() => {
      window.parent.postMessage(
        {
          module: 'subscribe',
          command: 'cxengage/reporting/batch-response',
          secondary: true
        },
        '*'
      );
      window.parent.postMessage(
        {
          module: 'reporting',
          command: 'addStatSubscription',
          data: { statistic: 'interactions-in-conversation-list' },
          secondary: true
        },
        '*'
      );
    }, 3000);

    window.addEventListener(
      'message',
      event => {
        // console.log(
        //   "A secondary iFrame recieved a response from parent window",
        //   event.data
        // );
        if (event.data.type === 'webpackOk') {
          return;
        } else if (event.data.subscription !== undefined) {
          const error = event.data.subscription.err;
          const topic = event.data.subscription.topic;
          const response = event.data.subscription.response;

          if (error) {
            console.error(error);
          } else {
            switch (topic) {
              case 'cxengage/reporting/batch-response': {
                // console.log(
                //   response.interactionsInConversationList.body.results
                //     .interactions
                // );
                let fakeInteractionArray = this.state.data;
                response.interactionsInConversationList.body.results.interactions.forEach(
                  interaction => fakeInteractionArray.push(interaction)
                );
                // fakeInteractionArray.push(
                //   response.interactionsInConversationList.body.results
                //     .interactions
                // );
                this.setState({ data: fakeInteractionArray });

                break;
              }
              default: {
                console.warn(topic, response);
                break;
              }
            }
          }
        } else if (event.data.module === 'monitorCall') {
          this.setState({ silentMonitoring: event.data.data });
        } else if (event.data.module === 'angularIsReady') {
          window.parent.postMessage(
            {
              module: 'subscribe',
              command: 'cxengage/reporting/batch-response'
            },
            '*'
          );
        }
      },
      false
    );
  }

  componentDidUnmount() {
    // TODO: remove stat subscription
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Title>Interaction Monitoring</Title>
        <div
          style={{
            width: '100%',
            height: '50px'
          }}
        >
          <ColumnsMenu
            columns={[
              { name: 'Actions', active: false },
              { name: 'InteractionId', active: true },
              { name: 'Agent', active: false },
              { name: 'CustomerId', active: true },
              { name: 'ContactPoint', active: false },
              { name: 'Flow', active: true },
              { name: 'Direction', active: false },
              { name: 'StartTime', active: true },
              { name: 'ElapsedTime', active: false }
            ]}
            style={{
              position: 'relative',
              float: 'right',
              marginRight: '20px'
            }}
          />
        </div>
        <ReactTable
          defaultPageSize={20}
          className="-striped -highlight"
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id])
              .toLowerCase()
              .indexOf(filter.value.toLowerCase()) > -1
          }
          filtered={this.state.filtered}
          onFilteredChange={filtered => this.setState({ filtered })}
          columns={[
            {
              Header: 'Interaction Id',
              show: this.state.showInteractionIdCol,
              id: 'interactionId',
              accessor: 'interactionId',
              Cell: ({ value }) => (
                <CopyToClipboard
                  text={value}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <TableButton>{value}</TableButton>
                </CopyToClipboard>
              )
            },
            {
              Header: 'Agent',
              show: this.state.showAgentCol,
              id: 'agentName',
              accessor: d => d.agents[0].agentName
            },
            { Header: 'Customer Id', id: 'customer', accessor: 'customer' },
            {
              Header: 'Contact Point',
              show: this.state.showContactPointCol,
              id: 'contactPoint',
              accessor: 'contactPoint'
            },
            {
              Header: 'Flow',
              show: this.state.showFlowCol,
              id: 'flowName',
              accessor: 'flowName'
            },
            {
              Header: 'Direction',
              show: this.state.showDirectionCol,
              id: 'direction',
              accessor: 'direction',
              filterMethod: (filter, row) => {
                if (filter.value === 'any') {
                  return true;
                }
                if (filter.value === 'inbound') {
                  return row[filter.id] === 'inbound';
                }
                if (filter.value === 'outbound') {
                  return row[filter.id] === 'outbound';
                }
              },
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: '100%' }}
                  value={filter ? filter.value : 'any'}
                >
                  <option value="any">Any</option>
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                </select>
              )
            },
            {
              Header: 'Start Time',
              accessor: 'startTimestamp',
              Cell: ({ value }) => moment(value).format('H:mm a')
            },
            {
              Header: 'Elapsed Time',
              id: 'elapsedTime',
              // accessor: "currentStateDuration",
              accessor: d => parseInt(d.currentStateDuration / 1000, 10),
              Cell: ({ value }) =>
                moment()
                  .startOf('day')
                  .seconds(value)
                  .format('HH:mm:ss'),
              filterMethod: (filter, row) => {
                // console.log(filter);
                let filterArray = filter.value.split(':');
                let timeFilter = parseInt(filterArray[1], 10);
                // time is in seconds by default
                if (filterArray[1] === '0' || filterArray[1] === '') {
                  return true;
                }
                if (filterArray[0] === 'lessThan') {
                  return (
                    row[filter.id] <
                    (filterArray[2] === 'minutes'
                      ? timeFilter * 60
                      : timeFilter)
                  );
                }
                return (
                  row[filter.id] >
                  (filterArray[2] === 'minutes' ? timeFilter * 60 : timeFilter)
                );
              },
              Filter: ({ filter, onChange }) => (
                <div>
                  <select
                    onChange={event => {
                      let filterArray = filter
                        ? filter.value.split(':')
                        : ['greaterThan', 0, 'minutes'];
                      onChange(
                        `${event.target.value}:${filterArray[1]}:${
                          filterArray[2]
                        }`
                      );
                    }}
                    style={{ width: '30%' }}
                    value={filter ? filter.value.split(':')[0] : 'greaterThan'}
                  >
                    <option value="greaterThan">+</option>
                    <option value="lessThan">-</option>
                  </select>

                  <input
                    value={filter ? filter.value.split(':')[1] : 0}
                    style={{ width: '40%' }}
                    onChange={event => {
                      let filterArray = filter
                        ? filter.value.split(':')
                        : ['greaterThan', 0, 'minutes'];
                      onChange(
                        `${filterArray[0]}:${event.target.value}:${
                          filterArray[2]
                        }`
                      );
                    }}
                  />

                  <select
                    onChange={event => {
                      let filterArray = filter
                        ? filter.value.split(':')
                        : ['greaterThan', 0, 'minutes'];
                      onChange(
                        `${filterArray[0]}:${filterArray[1]}:${
                          event.target.value
                        }`
                      );
                    }}
                    style={{ width: '30%' }}
                    value={filter ? filter.value.split(':')[2] : 'minutes'}
                  >
                    <option value="minutes">min</option>
                    <option value="seconds">sec</option>
                  </select>
                </div>
              )
            },
            {
              Header: 'Actions',
              show: this.state.showActionsCol,
              filterable: false,
              Cell: ({ value }) => <TableButton>Monitor Call</TableButton>
            }
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tableData: selectInteractionMonitoringTableData(state, props)
});

function mapDispatchToProps(dispatch) {
  return {
    updateTableData: (arrayOfTableData, optionalAppendBoolean) =>
      dispatch(updateTableData(arrayOfTableData, optionalAppendBoolean)),
    dispatch
  };
}

InteractionMonitoring.propTypes = {
  setTwilioEnabled: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InteractionMonitoring
);
