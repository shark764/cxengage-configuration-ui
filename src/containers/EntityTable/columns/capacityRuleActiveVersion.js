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

export const capacityRuleActiveVersionColumn = {
  id: 'capacityRuleActiveVersion',
  Header: <span title="Active Version">Active Version</span>,
  accessor: (capacityRule) => capacityRule.activeRule && capacityRule.activeRule.name,
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className="entity-table-filter-column-active-business-hour"
        data-automation="searchCapacityRuleActiveVersionColumn"
        onChange={(event) => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Active Capacity Rule Version"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  ),
  sortMethod: (a, b) => {
    if (a === null) {
      return 1;
    } else if (b === null) {
      return -1;
    } else {
      return a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true });
    }
  },
};

capacityRuleActiveVersionColumn.Cell.propTypes = {
  value: PropTypes.any,
};
capacityRuleActiveVersionColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func,
};
