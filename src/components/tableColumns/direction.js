/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

export default function(direction, tableType) {
  return {
    Header: 'Direction',
    width: 140,
    show: direction,
    id: 'direction',
    accessor: 'direction',
    filterMethod: (filter, row) => {
      if (filter.value === 'All') {
        return true;
      }
      if (filter.value === 'Inbound') {
        return row[filter.id] === 'inbound';
      }
      if (filter.value === 'Outbound') {
        return row[filter.id] === 'outbound';
      }
    },
    Filter: ({ onChange }) => directionFilter(onChange, tableType)
  };
}

function directionFilter(onChange, tableType) {
  return (
    <CheckboxFilterMenu
      menuType="Direction"
      tableType={tableType}
      className="direction"
      buttonType="columnFilter"
      selectionType="select"
      updateFilter={onChange}
    >
      Direction
    </CheckboxFilterMenu>
  );
}
