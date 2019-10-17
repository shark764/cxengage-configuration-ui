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

export const permissionsColumn = {
  id: 'permissions',
  Header: <span title="permissions">Permissions</span>,
  accessor: d => d.permissions.length,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`entity-table-filter-column-permissions`}
        data-automation="searchPermissionsColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

permissionsColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
