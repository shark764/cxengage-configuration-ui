/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import styled from 'styled-components';
import { SearchIconSVG } from 'cx-ui-components';

const Input = styled.input`
  width: 100%;
`;
const SearchIcon = styled(SearchIconSVG)`
  position: relative;
  left: -17px;
  opacity: 0.4;
`;

export function constructGeneralTextColumn(string) {
  const normalizedString = camelCaseToRegularForm(string);
  return {
    id: string,
    Header: <span title={normalizedString}>{normalizedString}</span>,
    accessor: string,
    Cell: ({ row }) => <span title={row[string]}>{row[string]}</span>,
    Filter: ({ filter, onChange }) => (
      <div>
        <Input
          className={`${normalizedString}-filter-input`}
          onChange={event => onChange(event.target.value)}
          value={filter ? filter.value : ''}
        />
        <SearchIcon searchIconType="primary" size={10} />
      </div>
    )
  };
}
