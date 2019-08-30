/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(awayRate) {
  const awayRateColumn = {
    Header: 'Away Rate',
    show: awayRate,
    id: 'awayRate',
    accessor: 'awayRate',
    filterable: false,
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        <span title={value}>{value ? value + '%' : '--'}</span>
      </div>
    )
  };

  awayRateColumn.Cell.propTypes = { value: PropTypes.any };

  return awayRateColumn;
}
