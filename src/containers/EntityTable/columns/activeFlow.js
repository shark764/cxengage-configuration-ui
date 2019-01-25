/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
`;

export const activeFlowColumn = {
  id: 'activeFlow',
  Header: <span title="Active Flow">Active Flow</span>,
  accessor: flow => flow.activeFlow && flow.activeFlow.name,
  Cell: ({ row }) => <span title={row.activeFlow}>{row.activeFlow}</span>,
  Filter: ({ filter, onChange }) => (
    <Input
      className="entity-table-filter-column-active-flow"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : ''}
    />
  )
};

activeFlowColumn.Cell.propTypes = {
  row: PropTypes.any
};
activeFlowColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
