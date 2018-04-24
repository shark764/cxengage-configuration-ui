/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const listTypeColumn = {
  id: 'listType',
  Header: <abbr title="List Type">List Type</abbr>,
  accessor: list => list.listType.name,
  Cell: ({ row }) => <abbr title={row.listType}>{row.listType}</abbr>
};
