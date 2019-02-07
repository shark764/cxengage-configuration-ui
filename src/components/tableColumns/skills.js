/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

export default function(value, tableType) {
  const column = {
    Header: 'Skills',
    show: value,
    filterable: true,
    sortable: false,
    minWidth: 190,
    Filter: skillsFilter(tableType),
    id: 'skills',
    accessor: d => {
      let skillsArray = [];
      d.agents.forEach(agent =>
        agent.skills.forEach(skill => {
          if (skillsArray.indexOf(skill.skillName) === -1) {
            skillsArray.push(skill.skillName);
          }
        })
      );
      return skillsArray.join(', ');
    },
    Cell: ({ value }) => <span title={value}>{value}</span>
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };

  return column;
}

export function skillsFilter(tableType) {
  return (
    <CheckboxFilterMenu menuType="Skills" tableType={tableType} buttonType="columnFilter" selectionType="checkbox">
      Skills
    </CheckboxFilterMenu>
  );
}
