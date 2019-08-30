/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
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

export default function(agent) {
  const agentNameColumn = {
    id: 'agentName',
    show: agent,
    Header: <span title="Agent">Agent</span>,
    accessor: 'agentName',
    minWidth: 140,
    Cell: ({ value }) => <span title={value}>{value || '--'}</span>,
    Filter: ({ filter, onChange }) => (
      <div>
        <Input
          className={`agent-name-filter-input`}
          data-automation="searchAgentNameColumn"
          onChange={event => onChange(event.target.value)}
          value={filter ? filter.value : ''}
        />
        <SearchIcon searchIconType="primary" size={10} />
      </div>
    )
  };

  agentNameColumn.Cell.propTypes = { value: PropTypes.any };
  agentNameColumn.Filter.propTypes = { filter: PropTypes.func, onChange: PropTypes.func };

  return agentNameColumn;
}
