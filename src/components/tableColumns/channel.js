/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

export default function chnnelColumn(channel) {
  return {
    Header: 'Channel',
    show: channel,
    id: 'channel',
    accessor: 'channelType'
  };
}
