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
    width: 180,
    resizable: false,
    accessor: d => timeStampToSeconds(d.startTimestamp),
    Cell: ({ value }) =>
      twelveHourFormat ? twelveHourTime(value) : twentyFourHourTime(value),
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

      const filterString = `${now} ${hours}:${mins}`;
      const filterTime = timeStampToSeconds(filterString);

      if (beforeOrAfter === 'After') {
        return row[filter.id] > filterTime;
      }
      return row[filter.id] < filterTime;
    },
    Filter: ({ filter, onChange }) => (
      <CustomFilterMenu
        menuType="Start Time"
        tableType={tableType}
        buttonType="columnFilter"
        className="startTime"
        updateFilter={onChange}
        currentFilter={
          filter ? filter.value.split('-').join(' ') : 'After 00:00 AM'
        }
      >
        <CustomSubMenuWrapper>
          <FilterSelect
            className="StartTimeFilter"
            onChange={event => {
              let filterArray = filter
                ? filter.value.split('-')
                : ['After', '00:00', 'AM'];
              onChange(
                `${event.target.value}-${filterArray[1]}-${filterArray[2]}`
              );
            }}
            options={['After', 'Before']}
          />

          <TimeInput
            value={filter ? filter.value.split('-')[1] : '00:00'}
            onChange={event => {
              let filterArray = filter
                ? filter.value.split('-')
                : ['After', '00:00', 'AM'];
              onChange(
                `${filterArray[0]}-${event.target.value}-${filterArray[2]}`
              );
            }}
          />

          {twelveHourFormat && (
            <FilterSelect
              onChange={event => {
                let filterArray = filter
                  ? filter.value.split('-')
                  : ['After', '00:00', 'minutes'];
                onChange(
                  `${filterArray[0]}-${filterArray[1]}-${event.target.value}`
                );
              }}
              options={['AM', 'PM']}
            />
          )}
        </CustomSubMenuWrapper>
      </CustomFilterMenu>
    )
  };
}
