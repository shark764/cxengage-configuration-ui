/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

export default function(value, tableType) {
  return {
    Header: 'Skills',
    show: value,
    filterable: true,
    sortable: false,
    Filter: skillsFilter(tableType),
    id: 'skills',
    accessor: d => {
      let skillsArray = [];
      d.agents.forEach(agent =>
        agent.skills.forEach(group => {
          if (skillsArray.indexOf(group.skillName) === -1) {
            skillsArray.push(group.skillName);
          }
        })
      );
      return skillsArray.join(', ');
    }
  };
}

export function skillsFilter(tableType) {
  return (
    <CheckboxFilterMenu
      menuType="Skills"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
    >
      Skills
    </CheckboxFilterMenu>
  );
}
