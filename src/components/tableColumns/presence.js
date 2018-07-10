/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';

export default function(presenceState) {
  return {
    Header: 'Presence State',
    show: presenceState,
    id: 'presenceState',
    accessor: 'state',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };
}
