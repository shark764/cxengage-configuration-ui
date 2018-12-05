/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect, filterSelectMethod } from 'cx-ui-components';

export const statusColumn = {
  id: 'active',
  Header: <span title="Status">Status</span>,
  accessor: list => (list.active ? 'Enabled' : 'Disabled'),
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

statusColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
