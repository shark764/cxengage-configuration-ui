/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function(offered) {
  const offeredColumn = {
    Header: 'Offered',
    show: offered,
    id: 'offered',
    accessor: 'offeredWorkOffers',
    filterable: false,
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        <span title={value}>{value || '--'}</span>
      </div>
    )
  };

  offeredColumn.Cell.propTypes = { value: PropTypes.any };

  return offeredColumn;
}
