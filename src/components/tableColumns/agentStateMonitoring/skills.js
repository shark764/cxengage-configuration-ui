/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxFilterMenu from '../../../containers/CheckboxFilterMenu';

export const helperFunctions = {
  skillsFilter: (onChange, tableType) => skillsFilter(onChange, tableType),
  filterMethod: ({ value = 'All' }, { _original: { skills } }, filterValues, allActive) =>
    value === 'All' || allActive
      ? allActive
      : skills
          .map(skill => skill.skillName)
          .filter(value =>
            filterValues.reduce((prev, curr) => (curr.active ? [...prev, curr.name] : prev), []).includes(value)
          ).length > 0
};

export default function(skills, tableType, filterValues, allActive) {
  const skillsColumn = {
    id: 'skills',
    Header: 'Skills',
    show: skills,
    sortable: false,
    minWidth: 140,
    accessor: d => d.skills.map(skill => skill.skillName).join(', '),
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row, filterValues, allActive),
    Filter: ({ onChange }) => helperFunctions.skillsFilter(onChange, tableType),
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

export function skillsFilter(onChange, tableType) {
  return (
    <CheckboxFilterMenu
      menuType="Skills"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
      updateFilter={onChange}
    >
      Skills
    </CheckboxFilterMenu>
  );
}
