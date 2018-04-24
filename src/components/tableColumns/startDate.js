/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import styled from 'styled-components';
import CustomFilterMenu from '../../containers/CustomFilterMenu';
import {
  // Components,
  FilterSelect,
  // time functions:
  fullDateString,
  timeStampToSeconds
} from 'cx-ui-components';

const CustomSubMenuWrapper = styled.div`
  padding: 8px;
`;

export default function(startDate, tableType) {
  return {
    Header: 'Start Date',
    minWidth: 170,
    show: startDate,
    id: 'startDateTimestamp',
    accessor: d => timeStampToSeconds(d.startTimestamp),
    Cell: ({ value }) => fullDateString(value),
    filterMethod: (filter, row) => {
      const filterArray = filter.value.split(':');
      const beforeOrAfter = filterArray[0];
      let dateString = filterArray[1];
      if (filterArray[1] === '0' || filterArray[1] === '') {
        return true;
      }
      const filterTime = timeStampToSeconds(dateString);

      if (beforeOrAfter === 'After') {
        return row[filter.id] > filterTime;
      }
      return row[filter.id] < filterTime;
    },
    Filter: ({ filter, onChange }) => (
      <div>
        <CustomFilterMenu
          menuType="Start Date"
          tableType={tableType}
          className="startDate"
          buttonType="columnFilter"
          updateFilter={onChange}
          currentFilter={
            filter ? filter.value.split(':').join(' ') : 'All Results'
          }
        >
          <CustomSubMenuWrapper>
            <FilterSelect
              onChange={event => {
                let filterArray = filter
                  ? filter.value.split(':')
                  : ['After', ''];
                onChange(`${event.target.value}:${filterArray[1]}`);
              }}
              options={['After', 'Before']}
              // The below style is required as styled component
              // doesn't like the type="date" input
              style={{ width: '160px' }}
            />

            <input
              value={filter ? filter.value.split(':')[1] : ''}
              type="date"
              onChange={event => {
                let filterArray = filter
                  ? filter.value.split(':')
                  : ['After', ''];
                onChange(`${filterArray[0]}:${event.target.value}`);
              }}
            />
          </CustomSubMenuWrapper>
        </CustomFilterMenu>
      </div>
    )
  };
}
