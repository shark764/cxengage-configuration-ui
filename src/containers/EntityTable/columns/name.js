/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getDisplay } from '../../../redux/modules/entities/users/selectors';
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

export const nameColumn = {
  id: 'name',
  Header: <span title="Name">Name</span>,
  accessor: d => {
    if (d.name) {
      return d.name;
    } else {
      return getDisplay(d, true);
    }
  },
  Cell: ({ row }) => {
    if (row.name) {
      return <span title={row.name}>{row.name}</span>;
    } else {
      return <span title={getDisplay(row._original, true)}>{getDisplay(row._original, true)}</span>;
    }
  },
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`name-filter-input`}
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

nameColumn.Cell.propTypes = {
  row: PropTypes.any
};
nameColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
