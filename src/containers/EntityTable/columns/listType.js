/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';

export const listTypeColumn = {
  id: 'listType',
  Header: <span title="List Type">List Type</span>,
  accessor: list => list.listType.name,
  Cell: ({ row }) => <span title={row.listType}>{row.listType}</span>,
  Filter: ({ filter, onChange }) => (
    <input
      className="entity-table-filter-column-list-type"
      onChange={event => onChange(event.target.value)}
      style={{ width: '100%' }}
      value={filter ? filter.value : ''}
    />
  )
};

listTypeColumn.Cell.propTypes = {
  row: PropTypes.any
};
listTypeColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
