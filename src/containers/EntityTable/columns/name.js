/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const nameColumn = {
  id: 'name',
  Header: <abbr title="Name">Name</abbr>,
  accessor: 'name',
  Cell: ({ row }) => <abbr title={row.name}>{row.name}</abbr>
};
