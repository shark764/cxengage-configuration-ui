/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CheckboxFilterMenu from '../../../containers/CheckboxFilterMenu';

export const helperFunctions = {
  reasonsFilter: (onChange, tableType, allActive) => reasonsFilter(onChange, tableType, allActive),
  filterMethod: ({ value = 'All' }, { _original: { reasonId } }, filterValues, allActive) => {
    if (value === 'All') {
      return allActive;
    }
    const reason = filterValues.find(fv => fv.id === reasonId);
    return reason ? reason.active : allActive;
  }
};

export default function(reasonCode, tableType, filterValues, allActive) {
  const reasonCodeColumn = {
    id: 'reasonCode',
    Header: 'Reason Code',
    show: reasonCode,
    minWidth: 150,
    accessor: 'reasonName',
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row, filterValues, allActive),
    Filter: ({ onChange }) => helperFunctions.reasonsFilter(onChange, tableType, allActive),
    Cell: ({ value }) =>
      value ? (
        <span title={value}>{value}</span>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <span>--</span>
        </div>
      )
  };

  reasonCodeColumn.Cell.propTypes = { value: PropTypes.any };

  return reasonCodeColumn;
}

export function reasonsFilter(onChange, tableType, allActive) {
  return (
    <CheckboxFilterMenu
      menuType="ReasonLists"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
      updateFilter={onChange}
      hasActiveFilter={!allActive}
    >
      Reasons
    </CheckboxFilterMenu>
  );
}
