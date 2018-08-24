/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export const metricNameColumn = {
  id: 'metricName',
  Header: <span title="Name">Name</span>,
  accessor: 'customMetricsName',
  Cell: ({ row }) => <span title={row.metricName}>{row.metricName}</span>
};
