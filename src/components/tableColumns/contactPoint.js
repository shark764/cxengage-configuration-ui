/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';

export default function(contactPoint) {
  return {
    Header: 'Contact Point',
    show: contactPoint,
    id: 'contactPoint',
    accessor: 'contactPoint',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };
}
