/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

export const helperFunctions = {
  groupsFilter: (onChange, tableType, allActive) => groupsFilter(onChange, tableType, allActive),
  filterMethod: ({ value = 'All' }, { _original }, filterValues, allActive) => {
    const groups = _original.agents[0].groups;
    return value === 'All' || allActive
      ? allActive
      : groups.filter(group => filterValues.map(({ id }) => id).includes(group.groupId)).length > 0;
  }
};

export default function(groups, tableType, filterValues, allActive) {
  const groupsColumn = {
    Header: 'Groups',
    show: groups,
    sortable: false,
    id: 'groups',
    minWidth: 140,
    accessor: d => d.agents[0].groups.map(group => group.groupName).join(', '),
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row, filterValues, allActive),
    Filter: ({ onChange }) => helperFunctions.groupsFilter(onChange, tableType, allActive),
    Cell: ({ value }) =>
      value ? (
        <span title={value}>{value}</span>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <span>--</span>
        </div>
      )
  };

  groupsColumn.Cell.propTypes = { value: PropTypes.any };

  return groupsColumn;
}

export function groupsFilter(onChange, tableType, allActive) {
  return (
    <CheckboxFilterMenu
      menuType="Groups"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
      updateFilter={onChange}
      hasActiveFilter={!allActive}
    >
      Groups
    </CheckboxFilterMenu>
  );
}
