/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import { FilterSelect, filterSelectMethod, columnAccessor } from 'cx-ui-components';

export const platformStatusColumn = {
  id: 'invitationStatus',
  Header: <span title="Platform Status">Platform Status</span>,
  accessor: list => columnAccessor({ name: 'invitationStatus' }, list),
  Cell: ({ row }) => (
    <span title={camelCaseToRegularForm(row['invitationStatus'])}>
      {camelCaseToRegularForm(row['invitationStatus'])}
    </span>
  ),
  filterMethod: (filter, row) => filterSelectMethod(filter, row),
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      className="entity-table-filter-column-platform-status"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', 'pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only']}
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
