/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const getHelpLink = entityName => {
  switch (entityName) {
    case 'lists':
      return 'https://docs.cxengage.net/Help/Content/Configuring%20CxEngage/Lists/Lists.htm';
    default:
      return undefined;
  }
};

const nameColumn = {
  id: 'name',
  Header: <abbr title="Name">Name</abbr>,
  accessor: 'name',
  Cell: ({ row }) => <abbr title={row.name}>{row.name}</abbr>
};

// Return Table Column Config based on the entity selected
export function getTableColumns(entityName) {
  switch (entityName) {
    case 'lists':
      return [
        nameColumn,
        {
          id: 'listType',
          Header: <abbr title="List Type">List Type</abbr>,
          accessor: list => list.listType.name,
          Cell: ({ row }) => <abbr title={row.listType}>{row.listType}</abbr>
        },
        {
          id: 'status',
          Header: <abbr title="Status">Status</abbr>,
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
    case 'emailTemplates':
      return [
        nameColumn,
        {
          id: 'description',
          Header: <abbr title="Description">Description</abbr>,
          accessor: 'description',
          Cell: ({ row }) => (
            <abbr title={row.description}>{row.description}</abbr>
          )
        }
      ];
    default:
      return [];
  }
}
