/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import { FilterSelect } from 'cx-ui-components';

export const platformStatusColumn = {
  id: 'platformStatus',
  Header: <span title="Platform Status">Platform Status</span>,
  accessor: 'platformStatus',
  Cell: ({ row }) => (
    <span title={camelCaseToRegularForm(row['platformStatus'])}>{camelCaseToRegularForm(row['platformStatus'])}</span>
  ),
  filterMethod: (filter, row) => {
    // Show all items on 'All'
    // Show 'enabled' and 'pending' items on 'All non-disabled'
    // Check match otherwise
    // We remove white spaces since camelCaseToRegularForm adds
    // empty space at beginning when string has capital letter
    if (filter.value === 'all') {
      return true;
    } else if (filter.value === 'all non-disabled') {
      return ['enabled', 'pending'].includes(row['_original'][filter.id]);
    } else {
      return camelCaseToRegularForm(row[filter.id]).trim() === camelCaseToRegularForm(filter.value).trim();
    }
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      className="entity-table-filter-column-platform-status"
      data-automation="searchPlatformStatusColumn"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all non-disabled'}
      options={['all', 'all non-disabled', 'disabled', 'enabled', 'pending']}
    />
  )
};

platformStatusColumn.Cell.propTypes = {
  row: PropTypes.any
};
platformStatusColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
