import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect } from 'cx-ui-components';
import { currentTenantId } from '../../../redux/modules/userData/selectors';
import store from '../../../redux/store';

export const sharedColumn2 = {
  id: 'shared2',
  Header: <span title="Shared">Shared</span>,
  accessor: ({ createdBy, shared }) =>
    createdBy === currentTenantId(store.getState()) ? 'Inherited' : shared ? 'Yes' : 'No',
  Cell: ({ value }) => <span title={value}>{value}</span>,
  filterMethod: (filter, row) => {
    // Show all items on 'All'
    // Check match otherwise
    if (filter.value === 'all') {
      return true;
    }
    return row[filter.id].toLowerCase() === filter.value;
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      data-automation="searchTimezoneColumn2"
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', 'yes', 'no', 'inherited']}
    />
  )
};

sharedColumn2.Cell.propTypes = {
  value: PropTypes.any
};
sharedColumn2.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
