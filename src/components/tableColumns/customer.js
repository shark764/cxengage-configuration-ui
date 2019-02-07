/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(customerId) {
  const column = {
    Header: 'Customer Id',
    show: customerId,
    id: 'customer',
    accessor: 'customer',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };

  return column;
}
