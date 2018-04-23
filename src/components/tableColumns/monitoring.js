/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

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

export default function(value, tableType) {
  return {
    Header: 'Monitoring',
    show: value,
    id: 'monitoring',
    width: 180,
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
      return monitoringCell(
        row.channel,
        previousMonitors,
        activeMonitors,
        row.interactionId
      );
    },
    filterMethod: (filter, row) => {
      if (filter.value === 'All') {
        return true;
      }
      if (filter.value === 'Monitored') {
        return row[filter.id].length > 0;
      }
      return row[filter.id].length === 0;
    },
    Filter: ({ filter, onChange }) => (
      <CheckboxFilterMenu
        menuType="Monitoring"
        tableType={tableType}
        buttonType="columnFilter"
        selectionType="select"
        updateFilter={onChange}
      >
        Monitoring
      </CheckboxFilterMenu>
    )
  };
}

function monitoringCell(
  channel,
  previousMonitors,
  activeMonitors,
  interactionId
) {
  return (
    <div>
      {channel === 'voice' && (
        <Fragment>
          {previousMonitors !== 0 ? (
            <GreyStatusIcon>{previousMonitors}</GreyStatusIcon>
          ) : (
            <FillerSpaceIcon />
          )}
          {activeMonitors !== 0 ? (
            <GreenStatusIcon>{activeMonitors}</GreenStatusIcon>
          ) : (
            <FillerSpaceIcon />
          )}
          <MonitorCallButton
            type="secondary"
            className="monitorCall"
            onClick={() =>
              window.parent.postMessage(
                {
                  module: 'monitorCall',
                  data: {
                    interactionId: interactionId
                  }
                },
                '*'
              )
            }
          >
            Monitor
          </MonitorCallButton>
        </Fragment>
      )}
    </div>
  );
}

module.export = [monitoringCell];
