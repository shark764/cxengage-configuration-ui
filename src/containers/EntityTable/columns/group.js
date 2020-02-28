/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect } from 'cx-ui-components';
import { selectGroups } from '../../../redux/modules/entities/groups/selectors';
import store from '../../../redux/store';

export const groupColumn = {
  id: 'groups',
  Header: <span title="Groups">Groups</span>,
  accessor: 'groups',
  Cell: ({ value }) => {
    if (value === undefined) {
      return <span title={value ? value : undefined}>{}</span>;
    } else {
      return <span title={value ? value : undefined}>{value.length}</span>;
    }
  },
  filterMethod: (filter, row) => {
    // Show all items on 'All'
    // Check match otherwise
    const len = row[filter.id].length;
    if (filter.value === 'all') {
      return true;
    } else {
      for (let i = 0; i < len; i++) {
        if (Object.values(row[filter.id][i]).indexOf(filter.value) >= 0) {
          return true;
        }
      }
    }
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', ...selectGroups(store.getState()).map(groups => groups.label)]}
    />
  )
};

groupColumn.Cell.propTypes = {
  value: PropTypes.any
};
groupColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
