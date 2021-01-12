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

export const disconnectMinutesColumn = {
  id: 'disconnectMinutes',
  Header: <span title="Disconnect Minutes">Disconnect Minutes</span>,
  accessor: (d) => d.clientDisconnectMinutes,
  Cell: ({ value }) => <span title={value}>{value} min</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        data-automation="searchDisconnectMinutesColumn"
        onChange={(event) => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Disconnect Minutes"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  ),
};

disconnectMinutesColumn.Cell.propTypes = {
  value: PropTypes.any,
};
disconnectMinutesColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func,
};
