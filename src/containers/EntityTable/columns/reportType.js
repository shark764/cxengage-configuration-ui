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
  Cell: ({ value }) => <span title={camelCaseToRegularForm(value)}>{camelCaseToRegularForm(value)}</span>,
  filterMethod: (filter, row) => {
    if (filter.value === 'realtime') {
      return true;
    }
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      className="entity-table-filter-column-report-type"
      data-automation="searchReportTypeColumn"
      onChange={(event) => onChange(event.target.value)}
      value="realtime">
      <option value="realtime" className="entity-table-filter-status-option-realtime">
        View Realtime Reports
      </option>
    </FilterSelect>
  ),
};

reportTypeColumn.Cell.propTypes = {
  value: PropTypes.any,
};
reportTypeColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func,
};
