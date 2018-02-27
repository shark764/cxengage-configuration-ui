import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  selectColumns,
  areAllColNotActive,
  selectTimeFormat
} from '../CheckboxFilterMenu/selectors';
import { toggleTimeFormat } from '../CheckboxFilterMenu/actions';
import {
  updateTableData,
  setExpanded,
  setSorted,
  setSelected,
  setFiltered,
  removeSelected
} from './actions';
import {
  updateSkillsData,
  updateGroupsData
} from '../CheckboxFilterMenu/actions';
import moment from 'moment';
import { fakeInteractions } from '../../tools/testInteractions.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import CheckboxFilterMenu from '../CheckboxFilterMenu';
import { Button } from 'cx-ui-components';

import ReactTable from 'react-table';
import './style.css';
import {
  selectInteractionMonitoringTableData,
  selectInteractionMonitoringSorted,
  selectInteractionMonitoringFiltered,
  selectInteractionMonitoringExpanded,
  selectInteractionMonitoringSelected
} from './selectors';

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
  display: inline-block;
  margin-left: 5px;
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

const InteractionDetailsHeader = styled.h4`
  color: grey;
  border-bottom: 1px solid #8080802e;
  max-width: 50%;
  margin-top: 25px;
`;
const GreenStatus = styled.b`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #00800091;
  display: inline-block;
  margin-right: 20px;
`;
const GreyStatus = styled.b`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #8080805c;
  display: inline-block;
  margin-right: 20px;
`;
const GreenStatusIcon = styled.div`
  width: 20px;
  height: 20px;
  text-align: center;
  margin: 0px 3px;
  color: white;
  border-radius: 50%;
  background: #00800091;
  display: inline-block;
`;
const GreyStatusIcon = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 3px;
  text-align: center;
  color: white;
  border-radius: 50%;
  background: #8080805c;
  display: inline-block;
`;
const Info = styled.div`
  font-size: 11pt;
  margin-top: 8px;
`;

const Duration = styled.p`
  margin: 7px 5px 12px 40px;
  font-size: 11pt;
`;

class InteractionMonitoring extends Component {
  constructor() {
    super();
    this.componentCleanup = this.componentCleanup.bind(this);
    this.state = {
      confirmEnd: false,
      filtered:
        JSON.parse(
          window.localStorage.getItem('interactionMonitoringFilters')
        ) || [],
      demo: false
    };
  }
  componentCleanup() {
    console.log('Cleanup called for interaction monitoring component');
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
      // setInterval(() => {
      //   let fakeInteractionArray = this.props.tableData.toJS();
      //   fakeInteractionArray.push(makeFakeInteraction());
      //   this.props.updateTableData(fakeInteractionArray);
      // }, 2000);
      this.props.updateTableData(fakeInteractions);
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
        module: 'subscribe',
        command: 'cxengage/reporting/get-skills-response'
      },
      '*'
    );
    window.parent.postMessage(
      {
        module: 'subscribe',
        command: 'cxengage/reporting/get-groups-response'
      },
      '*'
    );
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
        command: 'getGroups',
        data: {}
      },
      '*'
    );
    window.parent.postMessage(
      {
        module: 'reporting',
        command: 'getSkills',
        data: {}
      },
      '*'
    );
    this.getAllActiveInteractions();

    window.addEventListener(
      'message',
      event => {
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
                if (!this.state.demo) {
                  this.props.updateTableData(
                    response.interactionsInConversationList.body.results
                      .interactions
                  );
                }
                break;
              }
              case 'cxengage/reporting/get-groups-response': {
                let groups = [];
                response.result.forEach(group => {
                  groups.push({
                    name: group.name,
                    groupId: group.id,
                    active: true
                  });
                });
                this.props.updateGroupsData(groups);
                break;
              }
              case 'cxengage/reporting/get-skills-response': {
                let skills = [];
                response.result.forEach(skill => {
                  skills.push({
                    name: skill.name,
                    groupId: skill.id,
                    active: true
                  });
                });
                this.props.updateSkillsData(skills);
                break;
              }
              default: {
                console.warn(topic, response);
                break;
              }
            }
          }
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
  getAllActiveInteractions() {
    window.parent.postMessage(
      {
        module: 'reporting',
        command: 'addStatSubscription',
        data: { statistic: 'interactions-in-conversation-list' }
      },
      '*'
    );
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Title>Interaction Monitoring</Title>
          <div>
            <Button
              id="timeConversion"
              type="secondary"
              onClick={() => this.props.toggleTimeFormat()}
              style={{ marginRight: '20px' }}
            >
              {this.props.TweleveHourFormat ? '12h' : '24h'}
            </Button>
            <CheckboxFilterMenu
              style={{
                position: 'relative',
                display: 'inline-block',
                marginRight: '20px'
              }}
              menuType="Columns"
            />
          </div>
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
                style={{ width: '90px' }}
              >
                Confirm
              </Button>
              <Button
                id="cancel"
                type="secondary"
                onClick={() => this.props.toggleTimeFormat()}
                style={{ width: '90px' }}
              >
                Cancel
              </Button>
            </div>
          </ConfirmationModal>
        )}
        {this.props.columnsNotEmpty && (
          <ReactTable
            style={{ filter: `blur(${this.state.confirmEnd ? 6 : 0}px)` }}
            defaultPageSize={20}
            className="-striped -highlight"
            data={this.props.tableData.toJS()}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id])
                .toLowerCase()
                .indexOf(filter.value.toLowerCase()) > -1
            }
            filtered={this.state.filtered}
            onFilteredChange={filtered => {
              this.setState({ filtered: filtered });
              const groupFilterIndex = filtered.findIndex(
                filter => filter.id === 'groups'
              );
              const skillFilterIndex = filtered.findIndex(
                filter => filter.id === 'skills'
              );
              if (groupFilterIndex !== -1 && skillFilterIndex !== -1) {
                window.localStorage.setItem(
                  'interactionMonitoringFilters',
                  JSON.stringify([
                    filtered[groupFilterIndex],
                    filtered[skillFilterIndex]
                  ])
                );
              } else if (groupFilterIndex !== -1) {
                window.localStorage.setItem(
                  'interactionMonitoringFilters',
                  JSON.stringify([filtered[groupFilterIndex]])
                );
              } else if (skillFilterIndex !== -1) {
                window.localStorage.setItem(
                  'interactionMonitoringFilters',
                  JSON.stringify([filtered[skillFilterIndex]])
                );
              }
            }}
            expanded={this.props.expanded}
            sorted={this.props.sorted}
            onSortedChange={sorted => this.props.setSorted(sorted)}
            getTheadProps={(state, rowInfo, column) => {
              return {
                style: {
                  fontWeight: 'bold'
                }
              };
            }}
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
                      rowInfo.row.interactionId === this.props.selected
                        ? 'rgba(253, 255, 50, 0.17)'
                        : null
                  }
                };
              } else {
                return { style: {} };
              }
            }}
            SubComponent={row => {
              const startTime = this.props.TweleveHourFormat
                ? moment.unix(row.row.startTimestamp).format('h:mm a')
                : moment.unix(row.row.startTimestamp).format('k:mm');
              const startDate = moment
                .unix(row.row.startTimestamp)
                .format('dddd, MMMM Do YYYY');
              const activeParticipantsArray = row.row.agentName.split(', ');
              activeParticipantsArray.pop();
              const lastParticipant = activeParticipantsArray.pop();

              return (
                <div style={{ padding: '20px 80px' }}>
                  <InteractionDetailsHeader>
                    Interactions Details
                  </InteractionDetailsHeader>
                  <Info>
                    {row.row.direction === 'inbound'
                      ? `Inbound ${row.row.channel} interaction from ${
                          row.row.customer
                        } started at ${startTime} on ${startDate}.`
                      : `Outbound ${row.row.channel} interaction to ${
                          row.row.customer
                        } started at ${startTime} on ${startDate}.`}
                    {/* ${row.row.channel} interaction started`} */}
                  </Info>
                  <Info>
                    {row.row.direction === 'inbound'
                      ? `Customer reached ${
                          row.row.contactPoint
                        } and was directed through the ${
                          row.row.flowName
                        } flow.`
                      : null}
                  </Info>
                  <InteractionDetailsHeader>
                    Active Participants
                  </InteractionDetailsHeader>
                  <Info>
                    {activeParticipantsArray.length === 0
                      ? `${
                          activeParticipantsArray[0]
                        } is handling this interaction.`
                      : `${activeParticipantsArray.join(
                          ', '
                        )} and ${lastParticipant} are active participants on this interaction.`}
                  </Info>
                  {row.row.monitoring.length > 0 && (
                    <InteractionDetailsHeader>
                      Interaction Monitors
                    </InteractionDetailsHeader>
                  )}
                  <div>
                    {row.row.monitoring.length > 0 && (
                      <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {row.row.monitoring.map((agent, i) => [
                          agent.endTimestamp === null ? (
                            <GreenStatus key={`inProgress${i}`} />
                          ) : (
                            <GreyStatus key={`notInProgress${i}`} />
                          ),
                          <p
                            style={{ display: 'inline-block', margin: '5px' }}
                            key={`info${i}`}
                          >{`${agent.agentName} ${
                            agent.endTimestamp === null
                              ? `is currently monitoring this interaction and ${
                                  agent.bargedIn ? '' : 'has not'
                                } participated in the conversation.`
                              : `previously monitored this interaction and ${
                                  agent.bargedIn ? '' : 'has not'
                                } participated in the conversation.`
                          }`}</p>,
                          <br key={`break${i}`} />,
                          <Duration key={`duration${i}`}>
                            {agent.endTimestamp === null
                              ? `${
                                  this.props.TweleveHourFormat
                                    ? moment(agent.startTimestamp).format(
                                        'h:mm a'
                                      )
                                    : moment(agent.startTimestamp).format(
                                        'k:mm'
                                      )
                                } - Now`
                              : `${
                                  this.props.TweleveHourFormat
                                    ? moment(agent.startTimestamp).format(
                                        'h:mm a'
                                      )
                                    : moment(agent.startTimestamp).format(
                                        'k:mm'
                                      )
                                } - ${
                                  this.props.TweleveHourFormat
                                    ? moment(agent.endTimestamp).format(
                                        'h:mm a'
                                      )
                                    : moment(agent.endTimestamp).format('k:mm')
                                }`}
                          </Duration>
                        ])}
                      </ul>
                    )}
                  </div>
                </div>
              );
            }}
            columns={[
              {
                Header: 'Interaction Id',
                show: this.props.InteractionId,
                id: 'interactionId',
                accessor: 'interactionId',
                Cell: ({ value }) => (
                  <CopyToClipboard text={value}>
                    <TableButton>{value}</TableButton>
                  </CopyToClipboard>
                )
              },
              {
                Header: 'Agent',
                show: this.props.Agent,
                id: 'agentName',
                // accessor: d => (d.agents ? d.agents[0].agentName : null)
                accessor: d => {
                  let agentString = '';
                  d.agents.forEach(
                    agent => (agentString += agent.agentName + ', ')
                  );
                  return agentString;
                }
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
                  if (filter.value === 'all') {
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
                    value={filter ? filter.value : 'all'}
                  >
                    <option value="all">All</option>
                    <option value="inbound">Inbound</option>
                    <option value="outbound">Outbound</option>
                  </select>
                )
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
                accessor: d => parseInt(d.currentStateDuration / 1000, 10),
                Cell: ({ value }) =>
                  moment()
                    .startOf('day')
                    .seconds(value)
                    .format('HH:mm:ss'),
                filterMethod: (filter, row) => {
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
                Header: 'Monitoring',
                show: this.props.Monitoring,
                id: 'monitoring',
                width: 160,
                accessor: d => d.monitors,
                Cell: ({ value, row }) => {
                  let activeMonitors = 0;
                  let previousMonitors = 0;
                  row.monitoring.forEach(monitor => {
                    if (monitor.endTimestamp === null) {
                      activeMonitors++;
                    } else {
                      previousMonitors++;
                    }
                  });
                  return (
                    <div>
                      {row.channel === 'voice' && [
                        previousMonitors !== 0 && (
                          <GreyStatusIcon>{previousMonitors}</GreyStatusIcon>
                        ),
                        activeMonitors !== 0 && (
                          <GreenStatusIcon>{activeMonitors}</GreenStatusIcon>
                        ),
                        <Button
                          type="secondary"
                          style={{
                            float: 'right',
                            marginRight: '10px',
                            height: '20px',
                            paddingTop: '1px'
                          }}
                          onClick={() => this.monitorCall(row.interactionId)}
                        >
                          Monitor
                        </Button>
                      ]}
                    </div>
                  );
                },
                filterMethod: (filter, row) => {
                  if (filter.value === 'all') {
                    return true;
                  }
                  if (filter.value === 'monitored') {
                    return row[filter.id].length > 0;
                  }
                  return row[filter.id].length === 0;
                },
                Filter: ({ filter, onChange }) => (
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: '100%' }}
                    value={filter ? filter.value : 'all'}
                  >
                    <option value="all">All</option>
                    <option value="monitored">Monitored</option>
                    <option value="unmonitored">Not Monitored</option>
                  </select>
                )
              },
              {
                Header: 'Groups',
                show: this.props.Groups,
                filterable: true,
                sortable: false,
                Filter: (
                  <CheckboxFilterMenu
                    style={{ width: '100px', margin: '0 auto' }}
                    menuType="Groups"
                  />
                ),
                id: 'groups',
                accessor: d => {
                  let groupArray = [];
                  d.agents.forEach(agent =>
                    agent.groups.forEach(group => {
                      if (groupArray.indexOf(group.groupName) === -1) {
                        groupArray.push(group.groupName);
                      }
                    })
                  );
                  return groupArray.join(' , ');
                }
              },
              {
                Header: 'Skills',
                show: this.props.Skills,
                filterable: true,
                sortable: false,
                Filter: (
                  <CheckboxFilterMenu
                    style={{ width: '87px', margin: '0 auto' }}
                    menuType="Skills"
                  />
                ),
                id: 'skills',
                accessor: d => {
                  let skillsArray = [];
                  d.agents.forEach(agent =>
                    agent.skills.forEach(group => {
                      if (skillsArray.indexOf(group.skillName) === -1) {
                        skillsArray.push(group.skillName);
                      }
                    })
                  );
                  return skillsArray.join(' , ');
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
  columnsNotEmpty: areAllColNotActive(state, props),
  InteractionId: selectColumns(state, props)
    .get(0)
    .get('active'),
  Agent: selectColumns(state, props)
    .get(1)
    .get('active'),
  CustomerId: selectColumns(state, props)
    .get(2)
    .get('active'),
  ContactPoint: selectColumns(state, props)
    .get(3)
    .get('active'),
  Flow: selectColumns(state, props)
    .get(4)
    .get('active'),
  Channel: selectColumns(state, props)
    .get(5)
    .get('active'),
  Direction: selectColumns(state, props)
    .get(6)
    .get('active'),
  PresenceState: selectColumns(state, props)
    .get(7)
    .get('active'),
  StartDate: selectColumns(state, props)
    .get(8)
    .get('active'),
  StartTime: selectColumns(state, props)
    .get(9)
    .get('active'),
  ElapsedTime: selectColumns(state, props)
    .get(10)
    .get('active'),
  Monitoring: selectColumns(state, props)
    .get(11)
    .get('active'),
  Groups: selectColumns(state, props)
    .get(12)
    .get('active'),
  Skills: selectColumns(state, props)
    .get(13)
    .get('active'),
  TweleveHourFormat: selectTimeFormat(state, props),
  tableData: selectInteractionMonitoringTableData(state, props),
  expanded: selectInteractionMonitoringExpanded(state, props),
  filtered: selectInteractionMonitoringFiltered(state, props),
  selected: selectInteractionMonitoringSelected(state, props),
  sorted: selectInteractionMonitoringSorted(state, props)
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTimeFormat: () => dispatch(toggleTimeFormat()),
    updateTableData: tableData => dispatch(updateTableData(tableData)),
    updateSkillsData: skillsData => dispatch(updateSkillsData(skillsData)),
    updateGroupsData: groupsData => dispatch(updateGroupsData(groupsData)),
    setExpanded: expanded => dispatch(setExpanded(expanded)),
    setFiltered: filtered => dispatch(setFiltered(filtered)),
    setSelected: (selected, expanded) =>
      dispatch(setSelected(selected, expanded)),
    setSorted: sorted => dispatch(setSorted(sorted)),
    removeSelected: () => dispatch(removeSelected()),
    dispatch
  };
}

InteractionMonitoring.propTypes = {
  toggleTimeFormat: PropTypes.func.isRequired,
  updateTableData: PropTypes.func.isRequired,
  updateSkillsData: PropTypes.func.isRequired,
  updateGroupsData: PropTypes.func.isRequired,
  setExpanded: PropTypes.func.isRequired,
  setFiltered: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  setSorted: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InteractionMonitoring
);
