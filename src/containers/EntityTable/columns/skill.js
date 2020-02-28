/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect } from 'cx-ui-components';
import { selectSkills } from '../../../redux/modules/entities/skills/selectors';
import store from '../../../redux/store';

export const skillColumn = {
  id: 'skills',
  Header: <span title="Skills">Skills</span>,
  accessor: 'skills',
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
    } else if (filter.value !== 'No Skills') {
      for (let i = 0; i < len; i++) {
        if (Object.values(row[filter.id][i]).indexOf(filter.value) >= 0) {
          return true;
        }
      }
    } else {
      if (len === 0) {
        return true;
      }
    }
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', 'No Skills', ...selectSkills(store.getState()).map(skills => skills.label)]}
    />
  )
};

skillColumn.Cell.propTypes = {
  value: PropTypes.any
};
skillColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
