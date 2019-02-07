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
  const column = {
    Header: 'Start Date',
    minWidth: 210,
    resizable: false,
    show: startDate,
    id: 'startDateTimestamp',
    accessor: d => timeStampToSeconds(d.startTimestamp),
    Cell: ({ value }) => <span title={fullDateString(value)}>{fullDateString(value)}</span>,
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
    Filter: ({ filter, onChange }) => <StartDateFilter filter={filter} onChange={onChange} tableType={tableType} />
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };
  column.Filter.propTypes = {
    filter: PropTypes.func,
    onChange: PropTypes.func
  };

  return column;
}

export class StartDateFilter extends Component {
  filterArray = () => (this.props.filter ? this.props.filter.value.split(':') : ['After', '']);
  changeAfterBefore = event => this.props.onChange(`${event.target.value}:${this.filterArray()[1]}`);
  changeDateInput = event => this.props.onChange(`${this.filterArray()[0]}:${event.target.value}`);
  formatCurrentFilter = filter => {
    const beforeOrAfter = filter.value.split(':')[0];
    const dateArray = filter.value.split(':')[1].split('-');
    return dateArray[1]
      ? `${beforeOrAfter} ${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`
      : `${beforeOrAfter} mm/dd/yyyy`;
  };

  render() {
    return (
      <div>
        <CustomFilterMenu
          menuType="Start Date"
          tableType={this.props.tableType}
          className="startDate"
          buttonType="columnFilter"
          updateFilter={this.props.onChange}
          currentFilter={this.props.filter ? this.formatCurrentFilter(this.props.filter) : 'All Results'}
        >
          <CustomSubMenuWrapper>
            <FilterSelect
              onChange={this.changeAfterBefore}
              options={['After', 'Before']}
              defaultValue={this.props.filter ? this.props.filter.value.split(':')[0] : 'After'}
              // The below style is required as styled component
              // doesn't like the type="date" input
              style={{ width: '160px' }}
            />

            <input type="date" onChange={this.changeDateInput} />
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
