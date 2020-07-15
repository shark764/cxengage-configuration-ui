/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { getDisplay } from '../../../redux/modules/entities/users/selectors';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SearchIconSVG } from 'cx-ui-components';

const Input = styled.input`
  width: 100%;
`;
const SearchIcon = styled(SearchIconSVG)`
  position: relative;
  left: -17px;
  opacity: 0.4;
`;

export const labelColumn = {
  id: 'label',
  Header: <span title="Label">Label</span>,
  accessor: d => {
    if (d.label) {
      return d.label;
    } else {
      return getDisplay(d, true);
    }
  },
  Cell: ({ value }) => {
    var obj = [];
    if (value != null) {
      var string = '';
      for (var item in value) {
        string = `: ${value[item]}\n`;
        obj.push(
          <div style={{ padding: '2px' }} title={string} key={item}>
            <text style={{ fontWeight: 'bold' }}>
              {item[0] + item[1]}-{item[2] + item[3]}
            </text>
            {string}
          </div>
        );
      }
      return <span>{obj}</span>;
    }
    return;
  },
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        className={`label-filter-input`}
        data-automation="searchLabelColumn"
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Label"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  ),
  sortMethod: (a, b) => {
    let tempArray = [];
    tempArray = [a, b];

    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    tempArray.sort(collator.compare);

    if (tempArray[0] === a) {
      return -1;
    } else {
      return 1;
    }
  }
};

labelColumn.Cell.propTypes = {
  value: PropTypes.any
};
labelColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func
};
