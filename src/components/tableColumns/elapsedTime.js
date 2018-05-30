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
  startOfDay
} from 'cx-ui-components';

const CustomSubMenuWrapper = styled.div`
  padding: 8px;
`;

const MinutesInput = styled.input`
  width: 50px;
  textalign: center;
  marginleft: 5px;
`;

export const helperFunctions = {
  columnFilterOnChangeEvents: (filter, onChange, event, inputSource) => {
    let filterArray = filter
      ? filter.value.split(':')
      : ['Greater Than', 0, 'Minutes'];
    switch (inputSource) {
      case 'greaterThanOrLessThan':
        return onChange(
          `${event.target.value}:${filterArray[1]}:${filterArray[2]}`
        );
      case 'timeInput':
        return onChange(
          `${filterArray[0]}:${event.target.value}:${filterArray[2]}`
        );
      case 'secondsOrMinutes':
        return onChange(
          `${filterArray[0]}:${filterArray[1]}:${event.target.value}`
        );
      default:
        return filterArray;
    }
  },
  formatFilter: filter => {
    let facts = filter.split(':');
    return `${facts[0] === 'Greater Than' ? ' + ' : ' - '} ${facts[1]} ${
      facts[2] === 'Minutes' ? 'Min' : 'Sec'
    }`;
  },
  elapsedTimeFilter: (filter, onChange, tableType) => (
    <ElapsedTimeFilter
      filter={filter}
      onChange={onChange}
      tableType={tableType}
    />
  )
};

export default function(value, tableType) {
  return {
    Header: 'Elapsed Time',
    show: value,
    id: 'elapsedTime',
    width: 150,
    accessor: d => parseInt(d.currentStateDuration / 1000, 10),
    Cell: ({ value }) => startOfDay(value),
    filterMethod: (filter, row) => {
      let filterArray = filter.value.split(':');
      let timeFilter = parseInt(filterArray[1], 10);
      // time is in seconds by default
      if (filterArray[1] === '0' || filterArray[1] === '') {
        return true;
      }
      if (filterArray[0] === 'Less Than') {
        return (
          row[filter.id] <
          (filterArray[2] === 'Minutes' ? timeFilter * 60 : timeFilter)
        );
      }
      return (
        row[filter.id] >
        (filterArray[2] === 'Minutes' ? timeFilter * 60 : timeFilter)
      );
    },
    Filter: ({ filter, onChange }) =>
      helperFunctions.elapsedTimeFilter(filter, onChange, tableType)
  };
}

export class ElapsedTimeFilter extends Component {
  greaterThanOnChange = event =>
    helperFunctions.columnFilterOnChangeEvents(
      this.props.filter,
      this.props.onChange,
      event,
      'greaterThanOrLessThan'
    );
  minutesInputOnChange = event =>
    helperFunctions.columnFilterOnChangeEvents(
      this.props.filter,
      this.props.onChange,
      event,
      'timeInput'
    );
  timeToggleOnChange = event =>
    helperFunctions.columnFilterOnChangeEvents(
      this.props.filter,
      this.props.onChange,
      event,
      'secondsOrMinutes'
    );
  render() {
    return (
      <CustomFilterMenu
        menuType="Elapsed Time"
        tableType={this.props.tableType}
        buttonType="columnFilter"
        className="elapsedTime"
        updateFilter={this.props.onChange}
        currentFilter={
          this.props.filter
            ? helperFunctions.formatFilter(this.props.filter.value)
            : 'All Results'
        }
      >
        <CustomSubMenuWrapper>
          <FilterSelect
            onChange={this.greaterThanOnChange}
            options={['Greater Than', 'Less Than']}
          />

          <MinutesInput
            value={
              this.props.filter ? this.props.filter.value.split(':')[1] : 0
            }
            onChange={this.minutesInputOnChange}
          />

          <FilterSelect
            onChange={this.timeToggleOnChange}
            options={['Minutes', 'Seconds']}
          />
        </CustomSubMenuWrapper>
      </CustomFilterMenu>
    );
  }
}

ElapsedTimeFilter.propTypes = {
  tableType: PropTypes.string,
  filter: PropTypes.object,
  onChange: PropTypes.func
};
