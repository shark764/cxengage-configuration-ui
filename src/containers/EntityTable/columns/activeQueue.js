/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
`;

export const activeQueueColumn = {
  id: 'activeQueue',
  Header: <span title="Active Queue">Active Queue</span>,
  accessor: queue => queue.activeQueue.name,
  Cell: ({ row }) => <span title={row.activeQueue}>{row.activeQueue}</span>,
  Filter: ({ filter, onChange }) => (
    <Input
      className="entity-table-filter-column-active-queue"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : ''}
    />
  )
};

activeQueueColumn.Cell.propTypes = {
  row: PropTypes.any
};
activeQueueColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
