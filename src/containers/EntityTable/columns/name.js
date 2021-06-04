/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getDisplay } from '../../../redux/modules/entities/users/selectors';
import styled from 'styled-components';

import { SearchIconSVG } from 'cx-ui-components';

import { customSortStringMethod } from '../../../utils/index';

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
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`name-filter-input`}
        data-automation="searchNameColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Name"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  ),
  sortMethod: customSortStringMethod
};

nameColumn.Cell.propTypes = {
  value: PropTypes.any
};
nameColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
