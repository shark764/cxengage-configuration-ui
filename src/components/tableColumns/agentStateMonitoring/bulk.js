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

const HeaderCheckbox = styled(Checkbox)`
  width: 15px;
  height: 15px;
  margin: 5px;
`;

const RowCheckbox = styled.input`
  width: 15px;
  height: 15px;
  margin-top: 2px;
`;

export const helperFunctions = {
  header: (value, selectAllVisible, unselectAllVisible) => {
    if (value === 'on') {
      selectAllVisible();
    } else if (value === 'off') {
      unselectAllVisible();
    }
  }
};

export default function(tableType, onBulkClick, selectAllVisible, unselectAllVisible) {
  const bulkColumn = {
    id: 'bulkId',
    // Changing filter behavior for header toggle to
    // Select/Unselect All Visible functionality.
    // See CXV1-19967 for more details.
    Header: (
      <HeaderCheckbox
        className="bulk-action-select-all-toggle"
        onChange={value => helperFunctions.header(value, selectAllVisible, unselectAllVisible)}
      />
    ),
    accessor: 'bulkChangeItem',
    sortable: false,
    resizable: false,
    filterable: false,
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

  return bulkColumn;
}
