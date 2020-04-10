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

export const timezoneColumn = {
  id: 'timezone',
  Header: <span title="Timezone">Timezone</span>,
  accessor: d => (d.timezone ? d.timezone : ''),
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`timezone-filter-input`}
        data-automation="searchTimeZoneColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Timezone"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

timezoneColumn.Cell.propTypes = {
  value: PropTypes.any
};
timezoneColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
