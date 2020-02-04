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

export const timezoneColumn2 = {
  id: 'timezone2',
  Header: <span title="Timezone">Timezone</span>,
  accessor: ({ activeVersion, versions }) =>
    activeVersion &&
    versions.some(({ id }) => id === activeVersion) &&
    versions.find(({ id }) => id === activeVersion).timezone,
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className="entity-table-filter-column-timezone-2"
        data-automation="searchTimezoneColumn2"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

timezoneColumn2.Cell.propTypes = {
  value: PropTypes.any
};
timezoneColumn2.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
