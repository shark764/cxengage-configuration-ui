/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const listTypeColumn = {
  id: 'listType',
  Header: <span title="List Type">List Type</span>,
  accessor: list => list.listType.name,
  Cell: ({ row }) => <span title={row.listType}>{row.listType}</span>
};
