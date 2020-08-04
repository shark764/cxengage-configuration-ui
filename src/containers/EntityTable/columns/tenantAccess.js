/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import { FilterSelect, columnAccessor } from 'cx-ui-components';

export const tenantAccessColumn = {
  id: 'invitationStatus',
  Header: <span title="Tenant Access">Tenant Access</span>,
  accessor: list => columnAccessor({ name: 'invitationStatus' }, list),
  Cell: ({ row }) => (
    <span title={camelCaseToRegularForm(row['invitationStatus'])}>
      {camelCaseToRegularForm(row['invitationStatus'])}
    </span>
  ),
  filterMethod: (filter, row) => {
    // Show all items on 'All'
    // Show 'enabled', 'expired', 'invited', 'pending' and 'sso-only' on 'All non-disabled'
    // Check match otherwise
    // We remove white spaces since camelCaseToRegularForm adds
    // empty space at beginning when string has capital letter
    if (filter.value === 'all') {
      return true;
    } else if (filter.value === 'all non-disabled') {
      return ['pending', 'invited', 'expired', 'enabled', 'sso-only'].includes(row['_original'][filter.id]);
    } else {
      return camelCaseToRegularForm(row[filter.id]).trim() === camelCaseToRegularForm(filter.value).trim();
    }
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      className="entity-table-filter-column-tenant-access"
      data-automation="searchTenantAccessColumn"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all non-disabled'}
      options={['all', 'all non-disabled', 'pending', 'invited', 'expired', 'enabled', 'disabled', 'sso-only']}
    />
  )
};

tenantAccessColumn.Cell.propTypes = {
  row: PropTypes.any
};
tenantAccessColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
