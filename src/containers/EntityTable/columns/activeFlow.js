/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SearchIconSVG } from 'cx-ui-components';

const Input = styled.input`
  width: 100%;
`;
const SearchIcon = styled(SearchIconSVG)`
  position: relative;
  left: -17px;
  opacity: 0.4;
`;

export const activeFlowColumn = {
  id: 'activeFlow',
  Header: <span title="Active Flow">Active Version</span>,
  accessor: flow => flow.activeFlow && flow.activeFlow.name,
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className="entity-table-filter-column-active-flow"
        data-automation="searchActiveFlowColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Active Flow"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

activeFlowColumn.Cell.propTypes = {
  value: PropTypes.any
};
activeFlowColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
