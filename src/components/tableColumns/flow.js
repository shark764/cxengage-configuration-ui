/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';

export default function(flowName) {
  return {
    Header: 'Flow',
    show: flowName,
    id: 'flowName',
    accessor: 'flowName',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };
}
