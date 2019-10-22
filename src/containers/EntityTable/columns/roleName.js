/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect } from 'cx-ui-components';
import { selectTenantRoles } from '../../../redux/modules/entities/roles/selectors';
import store from '../../../redux/store';

export const roleNameColumn = {
  id: 'roleName',
  Header: <span title="Role Name">Role Name</span>,
  accessor: 'roleName',
  Cell: ({ value }) => <span title={value ? value : undefined}>{value}</span>,
  filterMethod: (filter, row) => {
    // Show all items on 'All'
    // Check match otherwise
    if (filter.value === 'all') {
      return true;
    }
    return row[filter.id] === filter.value;
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      data-automation="searchRoleNameColumn"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', ...selectTenantRoles(store.getState()).map(role => role.label)]}
    />
  )
};

roleNameColumn.Cell.propTypes = {
  value: PropTypes.any
};
roleNameColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
