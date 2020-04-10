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

export const activeBusinessHourColumn = {
  id: 'activeBusinessHour',
  Header: <span title="Active Business Hour">Active Version</span>,
  accessor: ({ activeVersion, versions }) =>
    activeVersion &&
    versions &&
    versions.some(({ id }) => id === activeVersion) &&
    versions.find(({ id }) => id === activeVersion).name,
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className="entity-table-filter-column-active-business-hour"
        data-automation="searchActiveBusinessHourColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Active Business Hour"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

activeBusinessHourColumn.Cell.propTypes = {
  value: PropTypes.any
};
activeBusinessHourColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
