/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CustomFilterMenu from '../../containers/CustomFilterMenu';
import {
  // Components:
  FilterSelect,
  // time functions:
  timeStampToSeconds,
  twelveHourTime,
  twentyFourHourTime,
  currentTime
} from 'cx-ui-components';

const CustomSubMenuWrapper = styled.div`
  padding: 8px;
`;

const TimeInput = styled.input`
  width: 65px;
  text-align: center;
`;

export default function(startTime, tableType, twelveHourFormat) {
  return {
    Header: 'Start Time',
    show: startTime,
    id: 'startTimestamp',
    minWidth: 190,
    resizable: false,
    accessor: d => timeStampToSeconds(d.startTimestamp),
    Cell: ({ value }) =>
      twelveHourFormat ? (
        <span title={twelveHourTime(value)}>{twelveHourTime(value)}</span>
      ) : (
        <span title={twentyFourHourTime(value)}>
          {twentyFourHourTime(value)}
        </span>
      ),
    filterMethod: (filter, row) => {
      const filterArray = filter.value.split('-');
      const beforeOrAfter = filterArray[0];
      let hours = parseInt(filterArray[1].split(':')[0], 10);
      if (twelveHourFormat && filterArray[2] === 'PM') {
        hours += 12;
      }
      let mins = parseInt(filterArray[1].split(':')[1], 10);
      if (isNaN(mins)) {
        mins = '00';
      }
      if (isNaN(hours)) {
        hours = '00';
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
      const now = currentTime();
      const filterString = `${now} ${hours === 0 ? '00' : hours}:${
        mins === 0 ? '00' : mins
      }`;
      const filterTime = timeStampToSeconds(filterString);

      if (beforeOrAfter === 'After') {
        return row[filter.id] > filterTime;
      }
      return row[filter.id] < filterTime;
    },
    Filter: ({ filter, onChange }) => (
      <StartTimeFilter
        filter={filter}
        onChange={onChange}
        tableType={tableType}
        twelveHourFormat={twelveHourFormat}
      />
    )
  };
}

export class StartTimeFilter extends Component {
  filterArray = () =>
    this.props.filter
      ? this.props.filter.value.split('-')
      : ['After', '00:00', 'AM'];
  afterBeforeOnchange = event =>
    this.props.onChange(
      `${event.target.value}-${this.filterArray()[1]}-${this.filterArray()[2]}`
    );
  timeInputOnchange = event =>
    this.props.onChange(
      `${this.filterArray()[0]}-${event.target.value}-${this.filterArray()[2]}`
    );
  amPmOnChange = event =>
    this.props.onChange(
      `${this.filterArray()[0]}-${this.filterArray()[1]}-${event.target.value}`
    );
  currentFilterString = () => {
    if (this.props.filter) {
      const filter = this.props.filter.value.split('-');
      if (this.props.twelveHourFormat) {
        return filter.join(' ');
      } else {
        return `${filter[0]} ${filter[1]}`;
      }
    } else {
      return 'All Results';
    }
  };

  render() {
    return (
      <CustomFilterMenu
        menuType="Start Time"
        tableType={this.props.tableType}
        buttonType="columnFilter"
        className="startTime"
        updateFilter={this.props.onChange}
        currentFilter={this.currentFilterString()}
      >
        <CustomSubMenuWrapper>
          <FilterSelect
            className="StartTimeFilter"
            onChange={this.afterBeforeOnchange}
            options={['After', 'Before']}
            defaultValue={
              this.props.filter
                ? this.props.filter.value.split('-')[0]
                : 'After'
            }
          />

          <TimeInput
            value={
              this.props.filter
                ? this.props.filter.value.split('-')[1]
                : '00:00'
            }
            onChange={this.timeInputOnchange}
          />

          {this.props.twelveHourFormat && (
            <FilterSelect
              onChange={this.amPmOnChange}
              options={['AM', 'PM']}
              defaultValue={
                this.props.filter ? this.props.filter.value.split('-')[2] : 'AM'
              }
            />
          )}
        </CustomSubMenuWrapper>
      </CustomFilterMenu>
    );
  }
}

StartTimeFilter.propTypes = {
  twelveHourFormat: PropTypes.bool,
  tableType: PropTypes.string,
  onChange: PropTypes.func,
  filter: PropTypes.object
};
