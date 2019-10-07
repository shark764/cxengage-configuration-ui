/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';

export function constructGeneralBooleanColumn(string) {
  const normalizedString = camelCaseToRegularForm(string);
  const column = {
    id: string,
    Header: <span title={normalizedString}>{normalizedString}</span>,
    accessor: list => (list[string] ? 'Yes' : 'No'),
    Cell: ({ value }) => <span title={value}>{value}</span>,
    filterMethod: (filter, row) => {
      if (filter.value === 'all') {
        return true;
      }
      if (filter.value === 'yes') {
        return row[filter.id] === 'Yes';
      }
      return row[filter.id] === 'No';
    },
    Filter: ({ filter, onChange }) => (
      <select
        className={'entity-table-filter-column-' + string}
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="all" className={'entity-table-filter-' + string + '-option-all'}>
          All
        </option>
        <option value="yes" className={'entity-table-filter-' + string + '-option-yes'}>
          View Yes
        </option>
        <option value="no" className={'entity-table-filter-' + string + '-option-no'}>
          View No
        </option>
      </select>
    )
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
