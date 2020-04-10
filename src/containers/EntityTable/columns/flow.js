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

export const flowColumn = {
  id: 'flow',
  Header: <span title="Flow">Flow</span>,
  accessor: d => {
    if (d.flow !== undefined && d.flow.name) {
      return d.flow.name;
    } else {
      return '';
    }
  },
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`flow-filter-input`}
        data-automation="searchFlowColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Flow"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

flowColumn.Cell.propTypes = {
  value: PropTypes.any
};
flowColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
