/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
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
  return {
    Header: 'Interaction Id',
    show: interactionId,
    id: 'interactionId',
    accessor: 'interactionId',
    Cell: ({ value }) => (
      <CopyToClipboard text={value}>
        <TableButton>{value}</TableButton>
      </CopyToClipboard>
    )
  };
}
