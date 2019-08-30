/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { timeFromStatisticsFormat } from 'cx-ui-components';

export default function(awayTime, tableType, twelveHourFormat) {
  const awayTimeColumn = {
    Header: 'Away Time',
    show: awayTime,
    id: 'awayTime',
    accessor: 'awayTime',
    filterable: false,
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        <span title={timeFromStatisticsFormat(value)}>{timeFromStatisticsFormat(value)}</span>
      </div>
    )
  };

  awayTimeColumn.Cell.propTypes = { value: PropTypes.any };

  return awayTimeColumn;
}
