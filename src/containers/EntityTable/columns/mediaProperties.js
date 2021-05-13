import React from 'react';
import PropTypes from 'prop-types';
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

export const mediaPropertiesColumn = {
  id: 'mediaProperties',
  Header: <span title="Properties">Properties</span>,
  accessor: (media) => JSON.stringify(media.properties),
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        onChange={(event) => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Properties"
      />
      <SearchIcon searchIconType="primary" size={10} />
    </div>
  ),
  sortMethod: (a, b) => {
    if (a === null) {
      return 1;
    } else if (b === null) {
      return -1;
    } else {
      return a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true });
    }
  },
};

mediaPropertiesColumn.Cell.propTypes = {
  value: PropTypes.any,
};
mediaPropertiesColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func,
};
