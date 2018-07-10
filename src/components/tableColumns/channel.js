/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';

export default function chnnelColumn(channel) {
  return {
    Header: 'Channel',
    show: channel,
    id: 'channel',
    accessor: 'channelType',
    Cell: ({ value }) => <span title={value}>{value}</span>
  };
}
