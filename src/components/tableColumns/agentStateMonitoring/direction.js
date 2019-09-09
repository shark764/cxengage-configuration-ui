/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DirectionIconSVG, PopoverDialog, FormattedTitle, DirectionRow, LoadingSpinnerSVG } from 'cx-ui-components';
import CheckboxFilterMenu from '../../../containers/CheckboxFilterMenu';

const DirectionContainer = styled.div`
  position: relative;
  order: 0;
  flex: 0 1 52px;
  align-self: auto;
`;
const PopoverMenu = styled(PopoverDialog)`
  left: 27px;
  padding-bottom: 15px;
`;

const CenterWrapper = styled.div`
  text-align: center;
`;

export const helperFunctions = {
  directionFilter: (onChange, tableType) => directionFilter(onChange, tableType),
  filterMethod: ({ value = 'All', id }, row) => {
    if (value === 'Inbound') {
      return row[id] === 'inbound';
    } else if (value === 'Outbound') {
      return row[id] === 'outbound';
    } else if (value === 'Do Not Disturb Outbound') {
      return row[id] === 'agent-initiated';
    } else {
      return true;
    }
  }
};

export default function(
  direction,
  tableType,
  setAgentDirection,
  setAgentSelected,
  removeAgentSelected,
  agentSelected,
  menuOpen,
  isUpdating,
  supervisorHasUpdatePermission
) {
  const directionColumn = {
    Header: 'Work Mode',
    width: 150,
    resizable: false,
    show: direction,
    id: 'direction',
    accessor: 'direction',
    Cell: ({ value, row }) =>
      supervisorHasUpdatePermission && row._original.presence !== 'offline' ? (
        <DirectionCell
          row={row}
          currentDirection={value}
          currentAgentId={row._original.agentId}
          setAgentDirection={setAgentDirection}
          setAgentSelected={setAgentSelected}
          removeAgentSelected={removeAgentSelected}
          agentSelected={agentSelected}
          menuOpen={menuOpen}
          isUpdating={isUpdating}
        />
      ) : (
        <CenterWrapper>
          <DirectionIconSVG directionIconType="primary" directionMode={value} size={25} />
        </CenterWrapper>
      ),
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row),
    Filter: ({ onChange }) => helperFunctions.directionFilter(onChange, tableType),
    getProps: () => {
      return { style: { overflow: 'visible' } };
    }
  };

  directionColumn.Cell.propTypes = { value: PropTypes.any, row: PropTypes.any };
  directionColumn.Filter.propTypes = { onChange: PropTypes.func };

  return directionColumn;
}

function directionFilter(onChange, tableType) {
  return (
    <CheckboxFilterMenu
      menuType="Direction"
      tableType={tableType}
      className="direction"
      buttonType="columnFilter"
      selectionType="select"
      updateFilter={onChange}
    >
      Work Mode
    </CheckboxFilterMenu>
  );
}

export class DirectionCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDirectionMenu: false
    };
  }

  changeDirection = (e, { _original: { agentId, sessionId } }, direction) =>
    this.props.setAgentDirection(agentId, sessionId, direction) && e.stopPropagation();

  showDirectionMenu = (e, show = true) => {
    e.stopPropagation();
    if (show) {
      this.props.setAgentSelected(this.props.currentAgentId, 'direction');
    } else {
      this.props.removeAgentSelected();
    }
    this.setState({ showDirectionMenu: show });
  };

  render() {
    let content = [
      { direction: 'inbound', label: 'Inbound' },
      { direction: 'outbound', label: 'Outbound' },
      { direction: 'agent-initiated', label: 'DND' }
    ].map(({ direction, label }) => (
      <DirectionRow
        key={direction}
        direction={direction}
        label={label}
        onSelect={e => this.changeDirection(e, this.props.row, direction)}
        isSelectedDirection={direction === this.props.currentDirection}
      />
    ));
    return (
      <DirectionContainer>
        <CenterWrapper>
          <DirectionIconSVG
            directionIconType="primary"
            directionMode={this.props.currentDirection}
            size={25}
            onClick={e => this.showDirectionMenu(e, !this.state.showDirectionMenu)}
          />
        </CenterWrapper>
        <PopoverMenu
          id="changeDirectionMenu"
          widthPx={200}
          arrowLeftOffsetPx={69}
          hide={e => this.showDirectionMenu(e, false)}
          // TODO:
          // when using condition of agent selected
          // for visible prop, it removes selected from
          // state twice.
          // isVisible={this.state.showDirectionMenu}
          isVisible={this.props.currentAgentId === this.props.agentSelected && this.props.menuOpen === 'direction'}
        >
          <FormattedTitle messageTitle="Change Work Mode" />
          {this.props.isUpdating && (
            <CenterWrapper>
              <LoadingSpinnerSVG size={28} color="white" />
            </CenterWrapper>
          )}
          {!this.props.isUpdating && content}
        </PopoverMenu>
      </DirectionContainer>
    );
  }
}

DirectionCell.propTypes = {
  currentAgentId: PropTypes.string,
  currentDirection: PropTypes.string,
  row: PropTypes.any,
  setAgentDirection: PropTypes.func,
  setAgentSelected: PropTypes.func,
  removeAgentSelected: PropTypes.func,
  agentSelected: PropTypes.string,
  menuOpen: PropTypes.string,
  isUpdating: PropTypes.bool
};
