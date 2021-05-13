import React from 'react';
import PropTypes from 'prop-types';
import { FilterSelect } from 'cx-ui-components';

export const mediaTypeColumn = {
  id: 'mediaType',
  Header: <span title="Type">Type</span>,
  accessor: (media) => media.type,
  Cell: ({ value }) => {
    if (value === 'tts') {
      return <span title={value ? value : undefined}>{'Text-to-Speech'}</span>;
    } else if (value === 'audio') {
      return <span title={value ? value : undefined}>{'Audio'}</span>;
    } else {
      return <span title={value ? value : undefined}>{'Media List'}</span>;
    }
  },
  Filter: ({ filter, onChange }) => (
    <FilterSelect
      tableType="modal"
      onChange={(event) => onChange(event.target.value)}
      value={filter ? filter.value : 'all'}
      options={['all', 'Audio', 'Text-to-Speech', 'Media List']}
    />
  ),
  filterMethod: (filter, row) => {
    if (filter.value === 'all') {
      return true;
    }
    if (filter.value === 'Audio') {
      return row[filter.id] === 'audio';
    }
    if (filter.value === 'Text-to-Speech') {
      return row[filter.id] === 'tts';
    }
    if (filter.value === 'Media List') {
      return row[filter.id] === 'list';
    }
  },
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

mediaTypeColumn.Cell.propTypes = {
  value: PropTypes.any,
};
mediaTypeColumn.Filter.propTypes = {
  filter: PropTypes.func,
  onChange: PropTypes.func,
};
