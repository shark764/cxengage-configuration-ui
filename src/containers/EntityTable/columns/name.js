/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const nameColumn = {
  id: 'name',
  Header: <span title="Name">Name</span>,
  accessor: 'name',
  Cell: ({ row }) => <span title={row.name}>{row.name}</span>,
  Filter: ({ filter, onChange }) => (
    <input
      className="entity-table-filter-column-name"
      onChange={event => onChange(event.target.value)}
      style={{ width: '100%' }}
      value={filter ? filter.value : ''}
    />
  )
};
