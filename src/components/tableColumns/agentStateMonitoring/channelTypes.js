/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChannelIconSVG } from 'cx-ui-components';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';
import CheckboxFilterMenu from '../../../containers/CheckboxFilterMenu';

const StyledChannelWrapper = styled.div`
  display: inline-block;
  cursor: auto;
  &:not(:last-child) {
    margin-right: 6px;
  }
`;

const FilterMenu = styled(CheckboxFilterMenu)`
  & .DropDown-SubMenu {
    width: 200px;
  }
`;

export const helperFunctions = {
  channelTypesFilter: (onChange, tableType) => channelTypesFilter(onChange, tableType),
  filterMethod: ({ value = 'All' }, { agentName, channelTypes }, filterValues, allActive) =>
    value === 'All'
      ? allActive
      : Object.keys(channelTypes)
          .reduce(
            (prev, curr) =>
              channelTypes[curr].display
                ? [...prev, curr === 'sms' ? curr.toUpperCase() : camelCaseToRegularForm(curr)]
                : prev,
            []
          )
          .filter(value =>
            filterValues.reduce((prev, curr) => (curr.active ? [...prev, curr.name] : prev), []).includes(value)
          ).length > 0
};

export default function channelTypesColumn(channelTypes, tableType, filterValues, allActive) {
  const channelTypesColumn = {
    Header: 'Channel',
    show: channelTypes,
    id: 'channelTypes',
    width: 185,
    resizable: false,
    accessor: 'channelTypes',
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row, filterValues, allActive),
    Filter: ({ onChange }) => helperFunctions.channelTypesFilter(onChange, tableType),
    Cell: ({ value }) => (
      <div style={{ textAlign: 'center' }}>
        {Object.keys(value).reduce(
          (acc, item, index) =>
            value[item].display
              ? [
                  ...acc,
                  <StyledChannelWrapper key={index}>
                    <ChannelIconSVG
                      channelIconType={value[item].active ? 'in-focus' : 'secondary'}
                      channelType={item}
                      size={25}
                      animated
                    />
                  </StyledChannelWrapper>
                ]
              : acc,
          []
        )}
      </div>
    )
  };

  channelTypesColumn.Cell.propTypes = { value: PropTypes.any };

  return channelTypesColumn;
}

export function channelTypesFilter(onChange, tableType) {
  return (
    <FilterMenu
      menuType="ChannelType"
      tableType={tableType}
      buttonType="columnFilter"
      selectionType="checkbox"
      updateFilter={onChange}
    >
      Channel
    </FilterMenu>
  );
}
