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

export const activeQueueColumn = {
  id: 'activeQueue',
  Header: <span title="Active Queue">Active Queue</span>,
  accessor: queue => queue.activeQueue && queue.activeQueue.name,
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className="entity-table-filter-column-active-queue"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

activeQueueColumn.Cell.propTypes = {
  value: PropTypes.any
};
activeQueueColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
