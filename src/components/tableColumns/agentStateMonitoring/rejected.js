/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(rejected) {
  const rejectedColumn = {
    Header: 'Rejected',
    show: rejected,
    id: 'rejected',
    accessor: 'rejectedWorkOffers',
    filterable: false,
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        <span title={value}>{value || '--'}</span>
      </div>
    )
  };

  rejectedColumn.Cell.propTypes = { value: PropTypes.any };

  return rejectedColumn;
}
