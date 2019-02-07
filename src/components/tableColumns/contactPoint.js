/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(contactPoint) {
  const column = {
    Header: 'Contact Point',
    show: contactPoint,
    id: 'contactPoint',
    accessor: 'contactPoint',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };

  return column;
}
