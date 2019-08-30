/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(accepted) {
  const acceptedColumn = {
    Header: 'Accepted',
    show: accepted,
    id: 'accepted',
    accessor: 'acceptedWorkOffers',
    filterable: false,
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        <span title={value}>{value || '--'}</span>
      </div>
    )
  };

  acceptedColumn.Cell.propTypes = { value: PropTypes.any };

  return acceptedColumn;
}
