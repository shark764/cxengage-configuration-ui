/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function channelColumn(channel) {
  const column = {
    Header: 'Channel',
    show: channel,
    id: 'channel',
    width: 140,
    resizable: false,
    accessor: 'channelType',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };

  return column;
}
