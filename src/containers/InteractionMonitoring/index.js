import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import styled from 'styled-components';
import {
  selectColumnsMenuColumns,
  areAllNotActive,
  selectTimeFormat
} from '../ColumnsMenu/selectors';
import { toggleTimeFormat } from '../ColumnsMenu/actions';
import moment from 'moment';
import { makeFakeInteraction } from '../../tools/testInteractions.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import ColumnsMenu from '../ColumnsMenu';
import { Button } from 'cx-ui-components';

import ReactTable from 'react-table';
import './style.css';

const Title = styled.h2`
  padding: 20px;
  font-size: 21px;
  font-family: Arial;
  font-weight: bold;
  color: #474747;
`;

const TableButton = styled.div`
  background: none;
  border: none;
  color: #656565c9;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConfirmationModal = styled.div`
  width: 30%;
  height: 60%;
  margin-left: 35%;
  position: absolute;
  background: white;
  box-shadow: 0px 0px 2px 0px rgba(42, 45, 41, 0.63);
  z-index: 1;
`;

const BlueLine = styled.div`
  height: 1px;
  width: 50px;
  margin-bottom: 18px;
  background: #23cef5;
  display: inline-block;
  position: relative;
  top: 13px;
`;
const BlueQuestionMark = styled.div`
  border-radius: 50%;
  background-color: #23cef5;
  color: white;
  font-weight: bold;
  padding: 2px 3px 0px 4px;
  width: 20px;
  display: inline-block;
  margin: 10px;
`;

class InteractionMonitoring extends Component {
  constructor() {
    super();
    this.componentCleanup = this.componentCleanup.bind(this);
    this.state = {
      clipboardValue: '',
      copied: false,
      data: [],
      sorted: [],
      page: 0,
      pageSize: 10,
      expanded: {},
      resized: [],
      filtered: [],
      selected: null,
      confirmEnd: false,
      demo: true
    };
  }
  componentCleanup() {
    console.log('cleanup called');
    window.parent.postMessage(
      {
        module: 'reporting',
        command: 'removeStatSubscription',
        data: { statId: 'interactions-in-conversation-list' }
      },
      '*'
    );
  }

  componentWillMount() {
    if (this.state.demo) {
      let fakeInteractionArray = this.state.data;
      // fakeInteractionArray.push(makeFakeInteraction());
      // fakeInteractionArray.push(makeFakeInteraction());
      // fakeInteractionArray.push(makeFakeInteraction());
      // fakeInteractionArray.push(makeFakeInteraction());
      // fakeInteractionArray.push(makeFakeInteraction());
      this.setState({ data: fakeInteractionArray });
      setInterval(() => {
        let fakeInteractionArray = this.state.data;
        fakeInteractionArray.push(makeFakeInteraction());
        this.setState({ data: fakeInteractionArray });
      }, 2000);
    }

    window.parent.postMessage(
      {
        module: 'subscribe',
        command: 'cxengage/reporting/batch-response'
      },
      '*'
    );
    window.parent.postMessage(
      {
        module: 'reporting',
        command: 'addStatSubscription',
        data: { statistic: 'interactions-in-conversation-list' }
      },
      '*'
    );

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
                // let fakeInteractionArray = this.state.data;
                // response.interactionsInConversationList.body.results.interactions.forEach(
                //   interaction => fakeInteractionArray.push(interaction)
                // );

                // fakeInteractionArray.push(
                //   response.interactionsInConversationList.body.results
                //     .interactions
                // );
                if (this.state.demo) {
                  this.setState(
                    Object.assign(
                      this.state.data,
                      response.interactionsInConversationList.body.results
                        .interactions
                    )
                  );
                } else {
                  this.setState({
                    data:
                      response.interactionsInConversationList.body.results
                        .interactions
                  });
                }

                break;
              }
              default: {
                console.warn(topic, response);
                break;
              }
            }
          }
        } else if (event.data.module === 'monitorCall') {
          // this.setState({ silentMonitoring: event.data.data });
        } else if (event.data.statId) {
          console.log(event.data.statId);
          this.setState({ statId: event.data.statId });
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

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }
  monitorCall(interactionId) {
    window.parent.postMessage(
      {
        module: 'monitorCall',
        data: {
          interactionId: interactionId
        }
      },
      '*'
    );
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
            style={{
              position: 'relative',
              float: 'right',
              marginRight: '20px'
            }}
          />
          <Button
            id="timeConversion"
            type="secondary"
            onClick={() => this.props.toggleTimeFormat()}
            inner={this.props.TweleveHourFormat ? '12h' : '24h'}
            style={{ marginRight: '20px', float: 'right' }}
          />
        </div>
        {this.state.confirmEnd && (
          <ConfirmationModal>
            <div
              style={{
                width: '100%',
                height: '80%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div style={{ marginTop: '20%', textAlign: 'center' }}>
                Are you sure you want to leave the interaction?
                <div style={{ width: '100%' }}>
                  <BlueLine />
                  <BlueQuestionMark>?</BlueQuestionMark>
                  <BlueLine />
                </div>
                This action cannot be undone.
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button
                id="confirm"
                type="secondary"
                onClick={() => this.props.toggleTimeFormat()}
                inner="Confirm"
                style={{ width: '90px' }}
              />
              <Button
                id="cancel"
                type="secondary"
                onClick={() => this.props.toggleTimeFormat()}
                inner="Cancel"
                style={{ width: '90px' }}
              />
            </div>
          </ConfirmationModal>
        )}
        {this.props.columnsNotEmpty && (
          <ReactTable
            style={{ filter: `blur(${this.state.confirmEnd ? 6 : 0}px)` }}
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
            getTrProps={(state, rowInfo, column) => {
              if (rowInfo) {
                return {
                  onClick: e => {
                    this.setState({
                      selected: rowInfo.row.interactionId
                    });
                  },
                  style: {
                    background:
                      rowInfo.row.interactionId === this.state.selected
                        ? 'rgba(253, 255, 50, 0.17)'
                        : null
                  }
                };
              } else {
                return { style: {} };
              }
            }}
            columns={[
              {
                Header: 'Interaction Id',
                show: this.props.InteractionId,
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
                show: this.props.Agent,
                id: 'agentName',
                accessor: d => (d.agents ? d.agents[0].agentName : null)
              },
              {
                Header: 'Customer Id',
                show: this.props.CustomerId,
                id: 'customer',
                accessor: 'customer'
              },
              {
                Header: 'Contact Point',
                show: this.props.ContactPoint,
                id: 'contactPoint',
                accessor: 'contactPoint'
              },
              {
                Header: 'Flow',
                show: this.props.Flow,
                id: 'flowName',
                accessor: 'flowName'
              },
              {
                Header: 'Channel',
                show: this.props.Channel,
                id: 'channel',
                accessor: 'channelType'
              },
              {
                Header: 'Direction',
                show: this.props.Direction,
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
                }
              },
              {
                Header: 'Presence State',
                show: this.props.PresenceState,
                id: 'presenceState',
                accessor: 'state'
              },
              {
                Header: 'Start Date',
                show: this.props.StartDate,
                id: 'startDateTimestamp',
                accessor: d => moment(d.startTimestamp).format('X'),
                Cell: ({ value }) =>
                  moment.unix(value).format('dddd, MMMM Do YYYY'),
                filterMethod: (filter, row) => {
                  const filterArray = filter.value.split(':');
                  const beforeOrAfter = filterArray[0];
                  let dateString = filterArray[1];
                  // console.log(dateString);
                  if (filterArray[1] === '0' || filterArray[1] === '') {
                    return true;
                  }
                  const filterTime = moment(dateString).format('X');

                  if (beforeOrAfter === 'after') {
                    return row[filter.id] > filterTime;
                  }
                  return row[filter.id] < filterTime;
                },
                Filter: ({ filter, onChange }) => (
                  <div>
                    <select
                      onChange={event => {
                        let filterArray = filter
                          ? filter.value.split(':')
                          : ['after', ''];
                        onChange(`${event.target.value}:${filterArray[1]}`);
                      }}
                      style={{ width: '30%' }}
                      value={filter ? filter.value.split(':')[0] : 'after'}
                    >
                      <option value="after">after</option>
                      <option value="before">before</option>
                    </select>

                    <input
                      value={filter ? filter.value.split(':')[1] : ''}
                      style={{ width: '40%' }}
                      type="date"
                      onChange={event => {
                        let filterArray = filter
                          ? filter.value.split(':')
                          : ['after', ''];
                        onChange(`${filterArray[0]}:${event.target.value}`);
                      }}
                    />
                  </div>
                )
              },
              {
                Header: 'Start Time',
                show: this.props.StartTime,
                id: 'startTimestamp',
                accessor: d => moment(d.startTimestamp).format('X'),
                Cell: ({ value }) =>
                  this.props.TweleveHourFormat
                    ? moment.unix(value).format('h:mm a')
                    : moment.unix(value).format('k:mm'),
                filterMethod: (filter, row) => {
                  const filterArray = filter.value.split('-');
                  const beforeOrAfter = filterArray[0];
                  // console.log(filterArray);
                  let hours = parseInt(filterArray[1].split(':')[0], 10);
                  if (this.props.TweleveHourFormat && filterArray[2] === 'pm') {
                    hours += 12;
                  }
                  let mins = parseInt(filterArray[1].split(':')[1], 10);
                  if (isNaN(mins)) {
                    mins = '00';
                  }
                  if (
                    filterArray[1] === '0' ||
                    filterArray[1] === '' ||
                    filterArray[1] === '0:00' ||
                    filterArray[1] === '0:0' ||
                    filterArray[1] === '00:0' ||
                    filterArray[1] === '00:' ||
                    filterArray[1] === ':00' ||
                    filterArray[1] === '00'
                  ) {
                    return true;
                  }
                  const now = moment()
                    .format()
                    .split('T')[0];
                  const filterString = `${now} ${hours}:${mins}`;
                  const filterTime = moment(filterString).format('X');

                  if (beforeOrAfter === 'after') {
                    return row[filter.id] > filterTime;
                  }
                  return row[filter.id] < filterTime;
                },
                Filter: ({ filter, onChange }) => (
                  <div>
                    <select
                      onChange={event => {
                        let filterArray = filter
                          ? filter.value.split('-')
                          : ['after', '00:00', 'am'];
                        onChange(
                          `${event.target.value}-${filterArray[1]}-${
                            filterArray[2]
                          }`
                        );
                      }}
                      style={{ width: '30%' }}
                      value={filter ? filter.value.split('-')[0] : 'after'}
                    >
                      <option value="after">after</option>
                      <option value="before">before</option>
                    </select>

                    <input
                      value={filter ? filter.value.split('-')[1] : '00:00'}
                      style={{ width: '40%' }}
                      onChange={event => {
                        let filterArray = filter
                          ? filter.value.split('-')
                          : ['after', '00:00', 'am'];
                        onChange(
                          `${filterArray[0]}-${event.target.value}-${
                            filterArray[2]
                          }`
                        );
                      }}
                    />

                    {this.props.TweleveHourFormat && (
                      <select
                        onChange={event => {
                          let filterArray = filter
                            ? filter.value.split('-')
                            : ['after', '00:00', 'minutes'];
                          onChange(
                            `${filterArray[0]}-${filterArray[1]}-${
                              event.target.value
                            }`
                          );
                        }}
                        style={{ width: '30%' }}
                        value={filter ? filter.value.split('-')[2] : 'am'}
                      >
                        <option value="am">am</option>
                        <option value="pm">pm</option>
                      </select>
                    )}
                  </div>
                )
              },
              {
                Header: 'Elapsed Time',
                show: this.props.ElapsedTime,
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
                    (filterArray[2] === 'minutes'
                      ? timeFilter * 60
                      : timeFilter)
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
                      value={
                        filter ? filter.value.split(':')[0] : 'greaterThan'
                      }
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
                show: this.props.Actions,
                filterable: false,
                Cell: ({ value, row }) => {
                  return (
                    <TableButton
                      onClick={() =>
                        // console.log("Should get starteds");
                        this.monitorCall(row.interactionId)
                      }
                    >
                      Monitor Call
                    </TableButton>
                  );
                }
              }
            ]}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  columnsNotEmpty: areAllNotActive(state, props),
  InteractionId: selectColumnsMenuColumns(state, props)
    .get(0)
    .get('active'),
  Agent: selectColumnsMenuColumns(state, props)
    .get(1)
    .get('active'),
  CustomerId: selectColumnsMenuColumns(state, props)
    .get(2)
    .get('active'),
  ContactPoint: selectColumnsMenuColumns(state, props)
    .get(3)
    .get('active'),
  Flow: selectColumnsMenuColumns(state, props)
    .get(4)
    .get('active'),
  Channel: selectColumnsMenuColumns(state, props)
    .get(5)
    .get('active'),
  Direction: selectColumnsMenuColumns(state, props)
    .get(6)
    .get('active'),
  PresenceState: selectColumnsMenuColumns(state, props)
    .get(7)
    .get('active'),
  StartDate: selectColumnsMenuColumns(state, props)
    .get(8)
    .get('active'),
  StartTime: selectColumnsMenuColumns(state, props)
    .get(9)
    .get('active'),
  ElapsedTime: selectColumnsMenuColumns(state, props)
    .get(10)
    .get('active'),
  Actions: selectColumnsMenuColumns(state, props)
    .get(11)
    .get('active'),
  TweleveHourFormat: selectTimeFormat(state, props)
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTimeFormat: () => dispatch(toggleTimeFormat()),
    dispatch
  };
}

InteractionMonitoring.propTypes = {
  // setTwilioEnabled: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InteractionMonitoring
);
