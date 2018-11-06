/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';

const FilterSelect = styled.select`
  width: 100%;
`;

export const reportTypeColumn = {
  id: 'reportType',
  Header: <span title="Type">Type</span>,
  accessor: 'reportType',
  Cell: ({ row }) => <span title={row.reportType}>{camelCaseToRegularForm(row.reportType)}</span>,
  filterMethod: (filter, row) => {
    if (filter.value === 'all') {
      return true;
    }
    if (filter.value === 'realtime') {
      return row[filter.id] === 'realtime';
    }
    return row[filter.id] === 'historical';
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      className="entity-table-filter-column-report-type"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
    >
      <option value="all" className="entity-table-filter-status-option-all">
        All
      </option>
      <option value="realtime" className="entity-table-filter-status-option-realtime">
        View Realtime Reports
      </option>
      <option value="historical" className="entity-table-filter-status-option-historical">
        View Historical Reports
      </option>
    </FilterSelect>
  )
};

reportTypeColumn.Cell.propTypes = {
  row: PropTypes.any
};
reportTypeColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
