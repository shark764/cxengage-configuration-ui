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

export const activeSlaColumn = {
  id: 'activeSla',
  Header: <span title="Active Version">Active Version</span>,
  accessor: sla => sla.activeSla && sla.activeSla.versionName,
  Cell: ({ row }) => <span title={row.activeSla}>{row.activeSla}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        automation="entityTableFilterColumnActiveSla"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

activeSlaColumn.Cell.propTypes = {
  row: PropTypes.any
};
activeSlaColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
