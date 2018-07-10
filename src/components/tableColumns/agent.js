/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

export default function(agents) {
  return {
    Header: 'Agent',
    show: agents,
    id: 'agentName',
    accessor: d => d.agents.map(a => a.agentName).join(', '),
    Cell: ({ value }) => <span title={value}>{value}</span>
  };
}
