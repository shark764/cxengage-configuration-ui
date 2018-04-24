/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const descriptionColumn = {
  id: 'description',
  Header: <abbr title="Description">Description</abbr>,
  accessor: 'description',
  Cell: ({ row }) => <abbr title={row.description}>{row.description}</abbr>
};
