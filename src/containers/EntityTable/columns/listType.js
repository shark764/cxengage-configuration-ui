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
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`entity-table-filter-column-list-type`}
        data-automation="searchListTypeColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="List Type"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

listTypeColumn.Cell.propTypes = {
  value: PropTypes.any
};
listTypeColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
