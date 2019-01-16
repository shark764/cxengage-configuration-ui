/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import { FilterSelect, columnAccessor } from 'cx-ui-components';

export const platformStatusColumn = {
  id: 'invitationStatus',
  Header: <span title="Platform Status">Platform Status</span>,
  accessor: list => columnAccessor({ name: 'invitationStatus' }, list),
  Cell: ({ row }) => (
    <span title={camelCaseToRegularForm(row['invitationStatus'])}>
      {camelCaseToRegularForm(row['invitationStatus'])}
    </span>
  ),
  filterMethod: (filter, row) => {
    // Show all items on 'All'
    // Show 'pending', 'invited', 'expired', 'enabled', 'sso-only' items on 'All Active'
    // Check match otherwise
    // We remove white spaces since camelCaseToRegularForm adds
    // empty space at beginning when string has capital letter
    if (filter.value === 'all') {
      return true;
    } else if (filter.value === 'all active') {
      return ['pending', 'invited', 'expired', 'enabled', 'sso-only'].includes(row['_original'][filter.id]);
    } else if (filter.value === 'all non-active') {
      return ['disabled'].includes(row['_original'][filter.id]);
    } else {
      return camelCaseToRegularForm(row[filter.id]).trim() === camelCaseToRegularForm(filter.value).trim();
    }
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      className="entity-table-filter-column-platform-status"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all active'}
      options={[
        'all',
        'all active',
        'all non-active',
        'pending',
        'invited',
        'expired',
        'enabled',
        'disabled',
        'sso-only'
      ]}
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
