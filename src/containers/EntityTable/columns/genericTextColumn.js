/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import styled from 'styled-components';

const Input = styled.input`
width: 100%;
`;

export function constructGeneralTextColumn(string) {
  const normalizedString = camelCaseToRegularForm(string);
  return {
    id: string,
    Header: <span title={normalizedString}>{normalizedString}</span>,
    accessor: string,
    Cell: ({ row }) => <span title={row[string]}>{row[string]}</span>,
    Filter: ({ filter, onChange }) => (
      <Input
        className={`${normalizedString}-filter-input`}
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      />
    )
  };
}
