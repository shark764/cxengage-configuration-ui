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

export const metricTypeColumn = {
  id: 'metricType',
  Header: <span title="Type">Type</span>,
  accessor: 'customMetricsType',
  Cell: ({ row }) => <span title={row.metricType}>{row.metricType}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`entity-table-filter-column-metric-type`}
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  )
};

metricTypeColumn.Cell.propTypes = {
  row: PropTypes.any
};
