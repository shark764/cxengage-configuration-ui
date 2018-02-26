/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

// Return Table Column Config based on the entity selected
export function getTableColumns(entityName) {
  switch (entityName) {
    case 'lists':
      return [{
        id: 'name', Header: 'Name', accessor: 'name',
      },{
        id: 'description', Header: 'Description', accessor: 'listType.description',
      },{
        id: 'status', Header: 'Status', accessor: d => d.active ? 'Enabled' : 'Disabled',
      }];
    default:
    return [];
  }
}
