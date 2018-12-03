/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import { FilterSelect, filterSelectMethod } from 'cx-ui-components';

export const tenantStatusColumn = {
  id: 'status',
  Header: <span title="Tenant Status">Tenant Status</span>,
  accessor: list => list.status,
  Cell: ({ row }) => <span title={camelCaseToRegularForm(row['status'])}>{camelCaseToRegularForm(row['status'])}</span>,
  filterMethod: (filter, row) => filterSelectMethod(filter, row),
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      className="entity-table-filter-column-status"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', 'accepted', 'pending', 'invited', 'disabled']}
    />
  )
};

tenantStatusColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
