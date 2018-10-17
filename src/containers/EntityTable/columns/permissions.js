/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';

export const permissionsColumn = {
  id: 'permissions',
  Header: <span title="permissions">Permissions</span>,
  accessor: 'permissions',
  Cell: ({ row }) => row.permissions.length,
  Filter: ({ filter, onChange }) => (
    <input
      className="entity-table-filter-column-permissions"
      onChange={event => onChange(event.target.value)}
      style={{ width: '100%' }}
      value={filter ? filter.value : ''}
    />
  )
};

permissionsColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
