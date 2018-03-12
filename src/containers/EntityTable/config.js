/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

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
          accessor: list => (list.active ? 'Enabled' : 'Disabled')
        }
      ];
    default:
      return [];
  }
}
