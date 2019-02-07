/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxFilterMenu from '../../containers/CheckboxFilterMenu';

export const helperFunctions = {
  directionFilter: (onChange, tableType) => directionFilter(onChange, tableType),
  filterMethod: ({ value = 'All', id }, row) => {
    if (value === 'Inbound') {
      return row[id] === 'inbound';
    } else if (value === 'Outbound') {
      return row[id] === 'outbound';
    } else if (value === 'Agent Initiated') {
      return row[id] === 'agent-initiated';
    } else {
      return true;
    }
  }
};

export default function(direction, tableType) {
  const column = {
    Header: 'Direction',
    width: 140,
    resizable: false,
    show: direction,
    id: 'direction',
    accessor: 'direction',
    Cell: ({ value }) => <span title={value}>{value}</span>,
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row),
    Filter: ({ onChange }) => helperFunctions.directionFilter(onChange, tableType)
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };
  column.Filter.propTypes = {
    onChange: PropTypes.func
  };

  return column;
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
