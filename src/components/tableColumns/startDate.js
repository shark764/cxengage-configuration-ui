/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      const dateArray = dateString.split('/').reverse();
      const isoFormatDate = dateArray.concat(dateArray.splice(1, 1));
      const filterTime = timeStampToSeconds(isoFormatDate.join('-'));

      if (beforeOrAfter === 'After') {
        return row[filter.id] > filterTime;
      }
      return row[filter.id] < filterTime;
    },
    Filter: ({ filter, onChange }) => (
      <StartDateFilter
        filter={filter}
        onChange={onChange}
        tableType={tableType}
      />
    )
  };
}

export class StartDateFilter extends Component {
  filterArray = () =>
    this.props.filter ? this.props.filter.value.split(':') : ['After', ''];
  changeAfterBefore = event =>
    this.props.onChange(`${event.target.value}:${this.filterArray()[1]}`);
  changeDateInput = event =>
    this.props.onChange(`${this.filterArray()[0]}:${event.target.value}`);

  render() {
    return (
      <div>
        <CustomFilterMenu
          menuType="Start Date"
          tableType={this.props.tableType}
          className="startDate"
          buttonType="columnFilter"
          updateFilter={this.props.onChange}
          currentFilter={
            this.props.filter
              ? this.props.filter.value.split(':').join(' ')
              : 'All Results'
          }
        >
          <CustomSubMenuWrapper>
            <FilterSelect
              onChange={this.changeAfterBefore}
              options={['After', 'Before']}
              // The below style is required as styled component
              // doesn't like the type="date" input
              style={{ width: '160px' }}
            />

            <input
              value={
                this.props.filter ? this.props.filter.value.split(':')[1] : ''
              }
              type="date"
              onChange={this.changeDateInput}
            />
          </CustomSubMenuWrapper>
        </CustomFilterMenu>
      </div>
    );
  }
}

StartDateFilter.propTypes = {
  tableType: PropTypes.string.isRequired,
  filter: PropTypes.object,
  onChange: PropTypes.func.isRequired
};
