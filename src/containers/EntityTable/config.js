/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';

// Return Table Column Config based on the entity selected
export function getTableColumns(entityName) {
  switch (entityName) {
    case 'lists':
      return [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name'
        },
        {
          id: 'listType',
          Header: 'List Type',
          accessor: list => list.listType.name
        },
        {
          id: 'status',
          Header: 'Status',
          accessor: list => (list.active ? 'Enabled' : 'Disabled'),
          filterMethod: (filter, row) => {
            if (filter.value === 'all') {
              return true;
            }
            if (filter.value === 'enabled') {
              return row[filter.id] === 'Enabled';
            }
            return row[filter.id] === 'Disabled';
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: '100%' }}
              value={filter ? filter.value : 'all'}
            >
              <option value="all">All</option>
              <option value="enabled">View Enabled</option>
              <option value="disabled">View Disabled</option>
            </select>
          )
        }
      ];
    default:
      return [];
  }
}
