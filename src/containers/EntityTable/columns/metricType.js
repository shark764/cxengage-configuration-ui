/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';

export const metricTypeColumn = {
  id: 'metricType',
  Header: <span title="Type">Type</span>,
  accessor: 'customMetricsType',
  Cell: ({ row }) => <span title={row.metricType}>{row.metricType}</span>
};

metricTypeColumn.Cell.propTypes = {
  row: PropTypes.any
};
