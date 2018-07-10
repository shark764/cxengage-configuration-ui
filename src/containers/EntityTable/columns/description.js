/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const descriptionColumn = {
  id: 'description',
  Header: <span title="Description">Description</span>,
  accessor: 'description',
  Cell: ({ row }) => <span title={row.description}>{row.description}</span>
};
