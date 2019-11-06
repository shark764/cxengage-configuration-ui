/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect } from 'cx-ui-components';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';

export const presenceStateColumn = {
  id: 'presenceState',
  Header: <span title="State">State</span>,
  accessor: 'state',
  Cell: ({ value }) => (
    <span title={camelCaseToRegularForm(value === 'notready' ? 'notReady' : value)}>
      {camelCaseToRegularForm(value === 'notready' ? 'notReady' : value)}
    </span>
  ),
  filterMethod: (filter, row) => {
    // Show all items on 'All'
    // Check if 'notready'
    // Check match otherwise
    if (filter.value === 'all') {
      return true;
    }
    if (filter.value === 'notReady') {
      return row[filter.id] === 'notready';
    }
    return row[filter.id] === filter.value;
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      data-automation="searchRoleNameColumn"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', 'busy', 'ready', 'notReady', 'allocated', 'offline']}
    />
  )
};

presenceStateColumn.Cell.propTypes = {
  value: PropTypes.any
};
presenceStateColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
