/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { timeFromStatisticsFormat } from 'cx-ui-components';

export default function(presenceStateDuration) {
  const presenceStateDurationColumn = {
    Header: 'Time in Presence State',
    show: presenceStateDuration,
    id: 'presenceStateDuration',
    accessor: 'currentStateDuration',
    filterable: false,
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        <span title={timeFromStatisticsFormat(value)}>{timeFromStatisticsFormat(value)}</span>
      </div>
    )
  };

  presenceStateDurationColumn.Cell.propTypes = { value: PropTypes.any };

  return presenceStateDurationColumn;
}
