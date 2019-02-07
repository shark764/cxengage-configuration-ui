/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function(agents) {
  const column = {
    Header: 'Agent',
    show: agents,
    id: 'agentName',
    accessor: d => d.agents.map(a => a.agentName).join(', '),
    Cell: ({ value }) => <span title={value}>{value}</span>
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };

  return column;
}
