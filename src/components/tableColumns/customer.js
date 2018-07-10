/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';

export default function(customerId) {
  return {
    Header: 'Customer Id',
    show: customerId,
    id: 'customer',
    accessor: 'customer',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };
}
