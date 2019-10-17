/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToRegularForm, capitalizeFirstLetter } from 'serenova-js-utils/strings';

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
  const column = {
    id: string,
    Header: <span title={normalizedString}>{normalizedString}</span>,
    accessor: string,
    Cell: ({ row }) => {
      return Array.isArray(row[string]) ? (
        <span title={row[string].join(', ')}>{row[string].join(', ')}</span>
      ) : (
        <span title={row[string]}>{row[string]}</span>
      );
    },
    Filter: ({ filter, onChange }) => (
      <div>
        <Input
          className={`${normalizedString}-filter-input`}
          data-automation={`search${capitalizeFirstLetter(string)}Column`}
          onChange={event => onChange(event.target.value)}
          value={filter ? filter.value : ''}
        />
        <SearchIcon searchIconType="primary" size={10} />
      </div>
    )
  };

  column.Cell.propTypes = {
    row: PropTypes.any
  };
  column.Filter.propTypes = {
    filter: PropTypes.func,
    onChange: PropTypes.func
  };

  return column;
}
