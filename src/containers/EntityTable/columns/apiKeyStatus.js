/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect, filterSelectMethod } from 'cx-ui-components';

export const apiKeyStatusColumn = {
  id: 'status',
  Header: <span title="Status">Status</span>,
  accessor: list => (list.status ? 'Enabled' : 'Disabled'),
  Cell: ({ value }) => <span title={value}>{value}</span>,
  filterMethod: (filter, row) => filterSelectMethod(filter, row),
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      className="entity-table-filter-column-status"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', 'enabled', 'disabled']}
    />
  )
};

apiKeyStatusColumn.Cell.propTypes = {
  value: PropTypes.any
};
apiKeyStatusColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
