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
    Filter: (
      <CheckboxFilterMenu
        menuType="Groups"
        tableType={tableType}
        buttonType="columnFilter"
        selectionType="checkbox"
      >
        Groups
      </CheckboxFilterMenu>
    ),
    id: 'groups',
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
    }
  };
}
