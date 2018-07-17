/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

export default function(value, tableType) {
  return {
    Header: 'Groups',
    show: value,
    filterable: true,
    sortable: false,
    Filter: groupsFilter(tableType),
    id: 'groups',
    minWidth: 190,
    accessor: d => {
      let groupArray = [];
      d.agents.forEach(agent =>
        agent.groups.forEach(group => {
          if (groupArray.indexOf(group.groupName) === -1) {
            groupArray.push(group.groupName);
          }
        })
      );
      return groupArray.join(', ');
    },
    Cell: ({ value }) => <span title={value}>{value}</span>
  };
}

export function groupsFilter(tableType) {
  return (
    <CheckboxFilterMenu
      menuType="Groups"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
    >
      Groups
    </CheckboxFilterMenu>
  );
}
