import React from 'react';
import PropTypes, { element } from 'prop-types';
import styled from 'styled-components';
import { SearchIconSVG } from 'cx-ui-components';
import { selectMedias } from '../../../redux/modules/entities/media/selectors';
import store from '../../../redux/store';

const Input = styled.input`
  width: 100%;
`;
const SearchIcon = styled(SearchIconSVG)`
  position: relative;
  left: -17px;
  opacity: 0.4;
`;

function getMediaText(media) {
  let medias = selectMedias(store.getState());
  return media.source
    .map((sourceMediaUuid) => medias.find((media) => media.value === sourceMediaUuid).label)
    .join(', ');
}

export const mediaSourceColumn = {
  id: 'mediaSource',
  Header: <span title="Source">Source</span>,
  accessor: (media) => {
    if (media.type === 'list') {
      return getMediaText(media);
    } else {
      return media.source;
    }
  },
  Cell: ({ value }) => <span title={value}>{value}</span>,
  Filter: ({ filter, onChange }) => (
    <div>
      <Input
        onChange={(event) => onChange(event.target.value)}
        value={filter ? filter.value : ''}
        placeholder="Source"
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

mediaSourceColumn.Cell.propTypes = {
  value: PropTypes.any,
};
mediaSourceColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func,
};
