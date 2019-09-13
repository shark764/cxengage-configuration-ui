/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox } from 'cx-ui-components';

const CheckboxWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const FilterCheckbox = styled(Checkbox)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;

const RowCheckbox = styled.input`
  width: 15px;
  height: 15px;
  margin-top: 2px;
`;

export default function(onBulkClick) {
  const bulkColumn = {
    id: 'bulkId',
    accessor: 'bulkChangeItem',
    filterMethod: ({ value, id }, rows) => {
      if (value === 'on') {
        return rows[id] === true;
      } else if (value === 'off') {
        return rows[id] === undefined;
      } else {
        return true;
      }
    },
    Filter: ({ onChange }) => (
      <FilterCheckbox className="bulk-action-filter-toggle" onChange={onChange} indeterminate="true" />
    ),
    sortable: false,
    resizable: false,
    width: 40,
    Cell: ({ row }) =>
      row._original.presence !== 'offline' ? (
        <CheckboxWrapper
          className="bulk-action-selector-toggle"
          onClick={e => onBulkClick(row._original.agentId, row._original.sessionId) && e.stopPropagation()}
        >
          <RowCheckbox
            type="checkbox"
            checked={row._original.bulkChangeItem || false}
            readOnly
            title="Add or remove this from the bulk actions form"
          />
        </CheckboxWrapper>
      ) : (
        <div style={{ textAlign: 'center' }} title={`Not available`}>
          <span>--</span>
        </div>
      )
  };

  bulkColumn.Cell.propTypes = { value: PropTypes.any, row: PropTypes.any };
  bulkColumn.Filter.propTypes = { onChange: PropTypes.func };

  return bulkColumn;
}
