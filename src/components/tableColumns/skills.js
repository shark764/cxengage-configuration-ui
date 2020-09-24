/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

export const helperFunctions = {
  skillsFilter: (onChange, tableType, allActive) => skillsFilter(onChange, tableType, allActive),
  filterMethod: ({ value = 'All' }, { _original }, filterValues, allActive) => {
    const skills = _original.agents[0].skills;
    return value === 'All' || allActive
      ? allActive
      : skills.filter(skill => filterValues.map(({ id }) => id).includes(skill.skillId)).length > 0;
  }
};

export default function(skills, tableType, filterValues, allActive) {
  const skillsColumn = {
    id: 'skills',
    Header: 'Skills',
    show: skills,
    sortable: false,
    minWidth: 130,
    accessor: d => d.agents[0].skills.map(skill => skill.skillName).join(', '),
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row, filterValues, allActive),
    Filter: ({ onChange }) => helperFunctions.skillsFilter(onChange, tableType, allActive),
    Cell: ({ value }) =>
      value ? (
        <span title={value}>{value}</span>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <span>--</span>
        </div>
      )
  };

  skillsColumn.Cell.propTypes = { value: PropTypes.any };

  return skillsColumn;
}

export function skillsFilter(onChange, tableType, allActive) {
  return (
    <CheckboxFilterMenu
      menuType="Skills"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
      updateFilter={onChange}
      hasActiveFilter={!allActive}
    >
      Skills
    </CheckboxFilterMenu>
  );
}
