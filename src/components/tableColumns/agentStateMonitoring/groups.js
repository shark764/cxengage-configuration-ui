/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxFilterMenu from '../../../containers/CheckboxFilterMenu';

export const helperFunctions = {
  groupsFilter: (onChange, tableType) => groupsFilter(onChange, tableType),
  filterMethod: ({ value = 'All' }, { _original: { groups } }, filterValues, allActive) =>
    value === 'All'
      ? allActive
      : groups
          .map(group => group.groupName)
          .filter(value =>
            filterValues.reduce((prev, curr) => (curr.active ? [...prev, curr.name] : prev), []).includes(value)
          ).length > 0
};

export default function(groups, tableType, filterValues, allActive) {
  const groupsColumn = {
    Header: 'Groups',
    show: groups,
    sortable: false,
    id: 'groups',
    minWidth: 140,
    accessor: d => d.groups.map(group => group.groupName).join(', '),
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row, filterValues, allActive),
    Filter: ({ onChange }) => helperFunctions.groupsFilter(onChange, tableType),
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

export function groupsFilter(onChange, tableType) {
  return (
    <CheckboxFilterMenu
      menuType="Groups"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
      updateFilter={onChange}
    >
      Groups
    </CheckboxFilterMenu>
  );
}
