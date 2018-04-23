/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
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

export default function(value, tableType) {
  const formatFilter = filter => {
    let facts = filter.split(':');
    return `${facts[0] === 'Greater Than' ? ' + ' : ' - '} ${facts[1]} ${
      facts[2] === 'Minutes' ? 'Min' : 'Sec'
    }`;
  };
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
    Filter: ({ filter, onChange }) => (
      <CustomFilterMenu
        menuType="Elapsed Time"
        tableType={tableType}
        buttonType="columnFilter"
        className="elapsedTime"
        updateFilter={onChange}
        currentFilter={filter ? formatFilter(filter.value) : 'All Results'}
      >
        <CustomSubMenuWrapper>
          <FilterSelect
            onChange={event => {
              let filterArray = filter
                ? filter.value.split(':')
                : ['Greater Than', 0, 'Minutes'];
              onChange(
                `${event.target.value}:${filterArray[1]}:${filterArray[2]}`
              );
            }}
            options={['Greater Than', 'Less Than']}
          />

          <MinutesInput
            value={filter ? filter.value.split(':')[1] : 0}
            onChange={event => {
              let filterArray = filter
                ? filter.value.split(':')
                : ['Greater Than', 0, 'Minutes'];
              onChange(
                `${filterArray[0]}:${event.target.value}:${filterArray[2]}`
              );
            }}
          />

          <FilterSelect
            onChange={event => {
              let filterArray = filter
                ? filter.value.split(':')
                : ['Greater Than', 0, 'Minutes'];
              onChange(
                `${filterArray[0]}:${filterArray[1]}:${event.target.value}`
              );
            }}
            options={['Minutes', 'Seconds']}
          />
        </CustomSubMenuWrapper>
      </CustomFilterMenu>
    )
  };
}
