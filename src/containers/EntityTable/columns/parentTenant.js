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

export const parentTenantColumn = {
  id: 'parentTenant',
  Header: <span title="parentTenant">Parent Tenant</span>,
  accessor: d => (d.parent && d.parent.name ? d.parent.name : ''),
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`parent-tenant-filter-input`}
        data-automation="searchParentTenantColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Parent Tenant"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

parentTenantColumn.Cell.propTypes = {
  value: PropTypes.any
};
parentTenantColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
