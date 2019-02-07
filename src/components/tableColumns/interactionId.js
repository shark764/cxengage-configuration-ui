/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TableButton = styled.div`
  background: none;
  border: none;
  color: #656565c9;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  margin-left: 5px;
`;

export default function(interactionId) {
  const column = {
    Header: 'Interaction Id',
    show: interactionId,
    id: 'interactionId',
    accessor: 'interactionId',
    Cell: ({ value }) => interactionIdCell(value)
  };

  column.Cell.propTypes = {
    value: PropTypes.any
  };

  return column;
}

export function interactionIdCell(value) {
  return (
    <span title={value}>
      <CopyToClipboard text={value}>
        <TableButton>{value}</TableButton>
      </CopyToClipboard>
    </span>
  );
}
