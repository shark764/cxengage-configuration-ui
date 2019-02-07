/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';
import { monitorInteractionInitialization } from '../../redux/modules/supervisorToolbar';
import store from '../../redux/store';
import { Button } from 'cx-ui-components';

const MonitorCallButton = styled(Button)`
  float: right;
  margin-right: 10px;
  height: 20px;
  padding-top: 1px;
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
  border-radius: 20%;
  background: #024f7969;
  display: inline-block;
`;
const FillerSpaceIcon = styled.div`
  width: 20px;
  display: inline-block;
  margin: 0px 3px;
`;

export const helperFunctions = {
  implicitDisable: (row, agentId) =>
    row.monitoring.filter(x => x.agentId === agentId && x.endTimestamp === null).length === 1,
  accessor: d => d.monitors,
  monitoringFilterMethod: (filter, row) => {
    if (filter.value === 'All') {
      return true;
    }
    if (filter.value === 'Monitored') {
      return row[filter.id].length > 0;
    }
    return row[filter.id].length === 0;
  },
  monitorFilter: (tableType, onChange) => <MonitorFilter tableType={tableType} onChange={onChange} />,
  Cell: function(value, row, monitoredId, monitoringStatus, agentId, userHasMonitorAllCallsPermission) {
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
      <MonitoringCell
        channel={row.channel}
        previousMonitors={previousMonitors}
        activeMonitors={activeMonitors}
        interactionId={row.interactionId}
        monitoredId={monitoredId}
        monitoringStatus={monitoringStatus}
        implicitDisable={this.implicitDisable(row, agentId)}
        userHasMonitorAllCallsPermission={userHasMonitorAllCallsPermission}
      />
    );
  }
};

export default function(value, tableType, monitoredId, monitoringStatus, agentId, userHasMonitorAllCallsPermission) {
  const column = {
    Header: 'Monitoring',
    show: value,
    id: 'monitoring',
    minWidth: 180,
    resizable: false,
    accessor: d => helperFunctions.accessor(d),
    Cell: ({ value, row }) =>
      helperFunctions.Cell(value, row, monitoredId, monitoringStatus, agentId, userHasMonitorAllCallsPermission),
    filterMethod: (filter, row) => helperFunctions.monitoringFilterMethod(filter, row),
    Filter: ({ onChange }) => helperFunctions.monitorFilter(tableType, onChange)
  };

  column.Cell.propTypes = {
    value: PropTypes.any,
    row: PropTypes.any
  };
  column.Filter.propTypes = {
    onChange: PropTypes.func
  };

  return column;
}
export class MonitorFilter extends Component {
  render() {
    return (
      <CheckboxFilterMenu
        menuType="Monitoring"
        tableType={this.props.tableType}
        buttonType="columnFilter"
        selectionType="select"
        updateFilter={this.props.onChange}
      >
        Monitoring
      </CheckboxFilterMenu>
    );
  }
}

export class MonitoringCell extends Component {
  monitorInteractionRequestor = e =>
    store.dispatch(monitorInteractionInitialization(this.props.interactionId)) && e.stopPropagation();
  render() {
    return (
      <div>
        {this.props.channel === 'voice' && (
          <Fragment>
            {this.props.previousMonitors !== 0 ? (
              <GreyStatusIcon>{this.props.previousMonitors}</GreyStatusIcon>
            ) : (
              <FillerSpaceIcon />
            )}
            {this.props.activeMonitors !== 0 ? (
              <GreenStatusIcon>{this.props.activeMonitors}</GreenStatusIcon>
            ) : (
              <FillerSpaceIcon />
            )}
            {this.props.userHasMonitorAllCallsPermission && (
              <MonitorCallButton
                type="secondary"
                id={'monitorCallButton'}
                className="monitorCall"
                disabled={
                  this.props.monitoringStatus !== 'offline' ||
                  this.props.implicitDisable ||
                  this.props.monitoringStatus === 'sqsShutDown'
                }
                onClick={this.monitorInteractionRequestor}
              >
                Monitor
              </MonitorCallButton>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

MonitoringCell.propTypes = {
  channel: PropTypes.string,
  previousMonitors: PropTypes.number,
  activeMonitors: PropTypes.number,
  monitoredId: PropTypes.string,
  interactionId: PropTypes.string,
  monitoringStatus: PropTypes.string,
  implicitDisable: PropTypes.bool,
  userHasMonitorAllCallsPermission: PropTypes.bool
};
MonitorFilter.propTypes = {
  tableType: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
