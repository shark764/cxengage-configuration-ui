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

export const listTypeColumn = {
  id: 'listType',
  Header: <span title="List Type">List Type</span>,
  accessor: list => list.listType.name,
  Cell: ({ row }) => <span title={row.listType}>{row.listType}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`entity-table-filter-column-list-type`}
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

listTypeColumn.Cell.propTypes = {
  row: PropTypes.any
};
listTypeColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
