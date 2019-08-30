/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(presenceState) {
  const presenceStateColumn = {
    Header: 'Presence State',
    show: presenceState,
    id: 'presenceState',
    accessor: 'state',
    Cell: ({ value }) => <span title={value}>{value || '--'}</span>
  };

  presenceStateColumn.Cell.propTypes = {
    value: PropTypes.any
  };

  return presenceStateColumn;
}
