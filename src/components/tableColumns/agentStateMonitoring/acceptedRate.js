/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(acceptedRate) {
  const acceptedRateColumn = {
    Header: 'Accepted Rate',
    show: acceptedRate,
    id: 'acceptedRate',
    accessor: 'acceptedWorkOffersRate',
    filterable: false,
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        <span title={value}>{value ? value + '%' : '--'}</span>
      </div>
    )
  };

  acceptedRateColumn.Cell.propTypes = { value: PropTypes.any };

  return acceptedRateColumn;
}
