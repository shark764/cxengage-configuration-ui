/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const nameColumn = {
  id: 'name',
  Header: <span title="Name">Name</span>,
  accessor: 'name',
  Cell: ({ row }) => <span title={row.name}>{row.name}</span>
};
