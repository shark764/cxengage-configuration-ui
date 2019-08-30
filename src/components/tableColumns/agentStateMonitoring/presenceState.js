/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { capitalizeFirstLetter } from 'serenova-js-utils/strings';
import {
  PopoverDialog,
  FormattedTitle,
  PresenceStateRow,
  Collapsible,
  MenuRow,
  LoadingSpinnerSVG,
  PresenceStateIconSVG,
  Confirmation
} from 'cx-ui-components';
import CheckboxFilterMenu from '../../../containers/CheckboxFilterMenu';

const PresenceStateContainer = styled.div`
  position: relative;
  order: 0;
  flex: 0 1 52px;
  align-self: auto;
`;
const PresenceStateLink = styled.span`
  cursor: pointer;
  color: #07487a;

  &:not([disabled]):hover {
    text-decoration: underline;
    color: #053962;
  }
`;
const PopoverMenu = styled(PopoverDialog)`
  padding-bottom: 15px;
  margin-top: ${props => (props.isPendingAway ? '10px' : '18px')};
  ${props => props.reasonsMenuVisible && `max-width: 300px;`};
`;
const NarrowDivider = styled.div`
  border-bottom: 1px solid #e1e1e1;
  margin: 5px 24px;
`;
const CollapsibleMenu = styled(Collapsible)`
  ${props => props.classParentString === 'CollapsibleReasonBold' && `font-weight: bold;`};
`;
const NotReadyState = styled.div`
  display: block;
  padding-top: 4px;
  line-height: 1.25;
  ${props =>
    props.statusLoading &&
    css`
      cursor: default;
      color: #979797;
    `};
`;
const ListTitle = styled.div`
  color: #979797;
  padding: 10px 24px 0 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const helperFunctions = {
  presenceStateFilter: (onChange, tableType) => presenceStateFilter(onChange, tableType),
  filterMethod: ({ value = 'All', id }, row) => {
    if (value === 'Idle') {
      return row[id] === 'idle';
    } else if (value === 'Busy') {
      return row[id] === 'busy';
    } else if (value === 'Away') {
      return row[id] === 'away';
    } else if (value === 'Offline') {
      return row[id] === 'offline';
    } else {
      return true;
    }
  }
};

export default function(
  presenceState,
  tableType,
  setAgentPresenceState,
  setAgentPendingAway,
  forceLogoutAgent,
  setAgentSelected,
  removeAgentSelected,
  getAgentReasonLists,
  selectedAgentReasonLists,
  agentSelected,
  menuOpen,
  isUpdating,
  supervisorHasUpdatePermission
) {
  const presenceStateColumn = {
    Header: 'Presence State',
    show: presenceState,
    id: 'presenceState',
    accessor: 'state',
    width: 140,
    resizable: false,
    Cell: ({ value, row }) =>
      supervisorHasUpdatePermission ? (
        <PresenceStateCell
          row={row}
          currentState={value}
          currentPresence={row._original.presence}
          currentReason={row._original.reasonId}
          currentAgentId={row._original.agentId}
          setAgentPresenceState={setAgentPresenceState}
          setAgentPendingAway={setAgentPendingAway}
          forceLogoutAgent={forceLogoutAgent}
          setAgentSelected={setAgentSelected}
          removeAgentSelected={removeAgentSelected}
          getAgentReasonLists={getAgentReasonLists}
          selectedAgentReasonLists={selectedAgentReasonLists}
          agentSelected={agentSelected}
          menuOpen={menuOpen}
          isUpdating={isUpdating}
        />
      ) : (
        <Fragment>
          <PresenceStateIconSVG
            presenceStateIconType={row._original.presence.replace('-', '')}
            presenceStateMode={row._original.presence.replace('-', '')}
            size={25}
          />
          {` ${capitalizeFirstLetter(value)}`}
        </Fragment>
      ),
    filterMethod: (filter, row) => helperFunctions.filterMethod(filter, row),
    Filter: ({ onChange }) => helperFunctions.presenceStateFilter(onChange, tableType),
    getProps: (state, rowInfo) => {
      return {
        style: {
          overflow: 'visible',
          background:
            menuOpen === 'state' && rowInfo && rowInfo.row._original.agentId === agentSelected
              ? 'rgba(253, 255, 50, 0.11)'
              : null
        }
      };
    }
  };

  presenceStateColumn.Cell.propTypes = { value: PropTypes.any, row: PropTypes.any };
  presenceStateColumn.Filter.propTypes = { onChange: PropTypes.func };

  return presenceStateColumn;
}

function presenceStateFilter(onChange, tableType) {
  return (
    <CheckboxFilterMenu
      menuType="PresenceState"
      tableType={tableType}
      className="presenceState"
      buttonType="columnFilter"
      selectionType="select"
      updateFilter={onChange}
    >
      State
    </CheckboxFilterMenu>
  );
}

export class PresenceStateCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showReasons: false,
      showConfirmation: false,
      expandedMenu: ''
    };
  }

  changePresenceState = (
    e,
    { _original: { agentId, sessionId } },
    presenceState,
    reason = null,
    reasonId = null,
    reasonListId = null
  ) =>
    (this.props.currentState === 'busy' && presenceState !== 'ready'
      ? this.props.setAgentPendingAway(agentId, sessionId, presenceState, reason, reasonId, reasonListId)
      : this.props.setAgentPresenceState(agentId, sessionId, presenceState, reason, reasonId, reasonListId)) &&
    e.stopPropagation();

  // We force agent to logout under xtreme
  // circunstances, like being stuck in a failed call
  forceLogout = (e, { _original: { agentId, sessionId } }) => {
    e.stopPropagation();
    this.props.forceLogoutAgent(agentId, sessionId);
  };

  showForceLogoutConfirmation = (e, show = true) => {
    e.stopPropagation();
    this.setState({ showConfirmation: show });
  };

  showPresenceStateMenu = (e, show = true) => {
    e.stopPropagation();
    if (show) {
      this.props.setAgentSelected(this.props.currentAgentId, 'state');
      this.setState({ showMenu: show });
    } else {
      this.props.removeAgentSelected();
      this.setState({ showMenu: show, showReasons: false, expandedMenu: '' });
    }
  };

  showPresenceReasonMenu = (e, show = true) => {
    e.stopPropagation();
    if (show) {
      this.props.getAgentReasonLists(this.props.currentAgentId);
    }
    this.setState({ showReasons: show });
  };

  setCollapsibleMenus = menuId => {
    if (this.state.expandedMenu === '' || this.state.expandedMenu !== menuId) {
      this.setState({ expandedMenu: menuId });
    } else {
      this.setState({ expandedMenu: '' });
    }
  };

  renderReason = (reason, listId, includeSectionName) => {
    const { reasonId, reasonListId } = this.props.row._original;
    const isSelected = reasonId === reason.reasonId && reasonListId === listId;
    const selectReason = e => {
      this.changePresenceState(e, this.props.row, 'notready', reason.name, reason.reasonId, listId);
      this.setCollapsibleMenus();
    };
    return (
      <MenuRow
        id={`reason-${reason.reasonId}-${listId}`}
        key={listId + reason.reasonId + this.state.clearHoverInt}
        rowText={includeSectionName === true ? `${reason.hierarchy[0]} - ${reason.name}` : reason.name}
        isSelected={isSelected}
        onSelect={selectReason}
        disabled={this.state.statusLoading}
      />
    );
  };

  renderCategory = (category, listId, categoryIndex) => {
    if (category.reasons.length === 1) {
      return this.renderReason(category.reasons[0], listId, true);
    }
    const { reasonId, reasonListId } = this.props.row._original;
    const containsSelected =
      category.reasons.findIndex(reason => reasonId === reason.reasonId && reasonListId === listId) > -1;
    const elementId = `${listId}-${categoryIndex}`;
    return (
      <CollapsibleMenu
        id={elementId}
        key={elementId}
        trigger={category.name}
        classParentString={containsSelected ? 'CollapsibleReasonBold' : 'CollapsibleReason'}
        open={this.state.expandedMenu === elementId}
        handleTriggerClick={() => this.setCollapsibleMenus(elementId)}
      >
        {category.reasons.map(reason => this.renderReason(reason, listId), this)}
      </CollapsibleMenu>
    );
  };

  renderList = reasonList => [
    <ListTitle
      id={`notReadyStateTitle-${reasonList.id}`}
      key={`notReadyStateTitle-${reasonList.id}`}
      title={reasonList.name}
    >
      {reasonList.name}
    </ListTitle>,
    <NarrowDivider key={`reasonListTitleBottom-${reasonList.id}`} />,
    <div key={`reasonListBody-${reasonList.id}`}>
      {reasonList.reasons.map((reasonData, index) => {
        if (reasonData.type === 'category') {
          return this.renderCategory(reasonData, reasonList.id, index);
        } else {
          return this.renderReason(reasonData, reasonList.id);
        }
      })}
    </div>
  ];

  render() {
    let content = [
      { presenceState: 'ready', label: 'Ready' },
      { presenceState: 'notready', label: 'Away' },
      { presenceState: 'offline', label: 'Logout' }
    ].map(({ presenceState, label }) => (
      <PresenceStateRow
        key={presenceState}
        presenceState={presenceState}
        label={label}
        onSelect={e =>
          presenceState === 'notready'
            ? this.showPresenceReasonMenu(e, !this.state.showReasons)
            : this.changePresenceState(e, this.props.row, presenceState)
        }
        // Presence state can be only "ready", "notready" and "offline"
        // Resources capacity statistics uses "not-ready"
        isSelectedPresenceState={presenceState === this.props.currentPresence.replace('-', '')}
      />
    ));
    // //////////////////////////
    // TODO:
    // //////////////////////////
    // We add a new option, "Force Logout",
    // will help to disconnect the agent no matter
    // the current presence or state
    // if (this.props.currentState === 'busy') {
    //   content = [
    //     ...content,
    //     <PresenceStateRow
    //       key={'force-offline'}
    //       presenceState="offline"
    //       label="Force Logout"
    //       onSelect={e => this.showForceLogoutConfirmation(e, !this.state.showConfirmation)}
    //     />
    //   ];
    // }
    return (
      <PresenceStateContainer>
        <PresenceStateLink onClick={e => this.showPresenceStateMenu(e, !this.state.showMenu)}>
          {this.props.row._original.pendingAway ? (
            <Fragment>
              <PresenceStateIconSVG presenceStateIconType="notready" presenceStateMode="notready" size={25} />
              {` Away (pending)`}
            </Fragment>
          ) : (
            capitalizeFirstLetter(this.props.currentState)
          )}
        </PresenceStateLink>
        <PopoverMenu
          id="changePresenceStateMenu"
          widthPx={this.state.showReasons ? 268 : 200}
          arrowLeftOffsetPx={40}
          hide={e => this.showPresenceStateMenu(e, false)}
          // TODO:
          // when using condition of agent selected
          // for visible prop, it removes selected from
          // state twice.
          // isVisible={this.state.showMenu}
          isVisible={this.props.currentAgentId === this.props.agentSelected && this.props.menuOpen === 'state'}
          reasonsMenuVisible={this.state.showReasons}
          isPendingAway={this.props.row._original.pendingAway}
        >
          <FormattedTitle
            messageTitle="Change State"
            messageTitleBack="Agent Reasons"
            hasPrevious={this.state.showReasons}
            onClick={e => this.showPresenceReasonMenu(e, !this.state.showReasons)}
          />
          {this.props.isUpdating ? (
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinnerSVG size={28} color="white" />
            </div>
          ) : (
            <Fragment>
              {!this.state.showReasons && content}
              {this.state.showReasons && (
                <NotReadyState id="agentNotReadyState" statusLoading={this.state.statusLoading}>
                  {this.props.selectedAgentReasonLists.length === 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <LoadingSpinnerSVG size={28} color="white" />
                    </div>
                  )}
                  {this.props.selectedAgentReasonLists.map(this.renderList, this)}
                </NotReadyState>
              )}
            </Fragment>
          )}
        </PopoverMenu>
        {this.state.showConfirmation && (
          <Confirmation
            confirmBtnCallback={e => this.forceLogout(e, this.props.row)}
            cancelBtnCallback={e => this.showForceLogoutConfirmation(e, false)}
            mainText={`This will force the disconnection of the agent session while busy.`}
            secondaryText={'Are you sure you want to continue?'}
            onMaskClick={e => this.showForceLogoutConfirmation(e, false)}
          />
        )}
      </PresenceStateContainer>
    );
  }
}

PresenceStateCell.propTypes = {
  currentAgentId: PropTypes.string,
  currentState: PropTypes.string,
  currentPresence: PropTypes.string,
  row: PropTypes.any,
  setAgentPresenceState: PropTypes.func,
  setAgentPendingAway: PropTypes.func,
  forceLogoutAgent: PropTypes.func,
  setAgentSelected: PropTypes.func,
  removeAgentSelected: PropTypes.func,
  getAgentReasonLists: PropTypes.func,
  selectedAgentReasonLists: PropTypes.array,
  agentSelected: PropTypes.string,
  menuOpen: PropTypes.string,
  isUpdating: PropTypes.bool
};
