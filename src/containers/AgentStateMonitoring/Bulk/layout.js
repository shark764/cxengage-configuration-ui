/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * AgentStateMonitoringBulkActionsForm
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Toggle,
  ConfirmationWrapper,
  Button,
  SimpleCaretIconSVG,
  Collapsible,
  MenuRow,
  LoadingSpinnerSVG,
  PresenceStateRow,
  DirectionRow,
  EditIconSVG
} from 'cx-ui-components';

const NarrowDivider = styled.div`
  border-bottom: 1px solid #e1e1e1;
  margin: 5px 24px;
`;
const CollapsibleMenu = styled(Collapsible)`
  ${props => props.classParentString === 'CollapsibleReasonBold' && `font-weight: bold;`};
  & .CollapsibleReason__trigger-container {
    & .SimpleCaretIconSVG .icon {
      fill: currentColor;
    }
    &:hover {
      background-color: #def8fe;
    }
  }
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

const Container = styled.div`
  border: 1px solid #e0cdcd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  margin-left: 0px;
`;

const ToggleList = styled.span`
  display: flex;
  justify-content: space-between;
  margin-bottom: -10px;
`;

const StyledToggle = styled(Toggle)`
  width: 15px;
  height: 15px;
  margin-right: 25px;
  margin-bottom: 15px;
`;

const BulkActions = styled.div`
  margin: 10px;
`;

const ChangeButton = styled(Button)`
  margin: 10px;
`;

const BackCaret = styled(SimpleCaretIconSVG)`
  vertical-align: top;
  margin-right: 5px;
`;

const BulkMenuRow = styled(MenuRow)`
  &:hover {
    background-color: #def8fe;
  }
`;

const BulkConfirmationWrapper = styled(ConfirmationWrapper)`
  display: block;
`;

const Wrapper = styled.div``;

const BulkDirectionRow = styled(DirectionRow)`
  & .DirectionIconSVG .icon {
    fill: ${props => props.theme.primaryColor};
  }
  &:not([disabled]):hover {
    background-color: #def8fe;
  }
`;

const BulkPresenceStateRow = styled(PresenceStateRow)`
  &:not([disabled]):hover {
    background-color: #def8fe;
  }
  & .DirectionIconSVG .icon {
    fill: ${props => props.theme.primaryColor};
  }
  & .SimpleCaretIconSVG .icon {
    fill: currentColor;
  }
`;

export default class AgentStateMonitoringBulkActionsForm extends Component {
  constructor() {
    super();
    const visibleFields = { direction: false, state: false };
    this.state = { visibleFields, initialVisibleFields: visibleFields, showReasons: false, expandedMenu: '' };
  }

  toggleFormField = name =>
    this.setState({
      visibleFields: { ...this.state.initialVisibleFields, [name]: !this.state.visibleFields[name] },
      showReasons: false,
      expandedMenu: ''
    });

  changeDirection = (e, direction) => this.props.setBulkAgentDirection(direction);

  changePresenceState = (e, presenceState, reason = null, reasonId = null, reasonListId = null) =>
    this.props.setBulkAgentPresenceState(presenceState, reason, reasonId, reasonListId);

  showPresenceReasonMenu = (e, show = true) => {
    e.stopPropagation();
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
    const selectReason = e => {
      this.changePresenceState(e, 'notready', reason.name, reason.reasonId, listId);
      this.setCollapsibleMenus();
    };
    return (
      <BulkConfirmationWrapper
        key={listId + reason.reasonId + this.state.clearHoverInt}
        confirmBtnCallback={selectReason}
        mainText={`This will change the current state to "Unavailable - (${reason.name})" for all selected agents`}
        secondaryText={'Are you sure you want to continue?'}
      >
        <BulkMenuRow
          id={`reason-${reason.reasonId}-${listId}`}
          rowText={includeSectionName === true ? `${reason.hierarchy[0]} - ${reason.name}` : reason.name}
          disabled={this.state.statusLoading}
        />
      </BulkConfirmationWrapper>
    );
  };

  renderCategory = (category, listId, categoryIndex) => {
    if (category.reasons.length === 1) {
      return this.renderReason(category.reasons[0], listId, true);
    }
    const elementId = `${listId}-${categoryIndex}`;
    return (
      <CollapsibleMenu
        id={elementId}
        key={elementId}
        trigger={category.name}
        classParentString={'CollapsibleReason'}
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
    return (
      <Wrapper key={this.props.key}>
        {this.props.supervisorUpdatePermissions.direction && (
          <Container>
            <ToggleList>
              <span>
                <EditIconSVG size={20} editIconType="primary" /> Change Work Mode
              </span>
              <StyledToggle
                onChange={() => this.toggleFormField('direction')}
                value={this.state.visibleFields.direction}
              />
            </ToggleList>
            {this.state.visibleFields.direction && (
              <BulkActions>
                {[
                  { direction: 'inbound', label: 'Inbound' },
                  { direction: 'outbound', label: 'Outbound' },
                  { direction: 'agent-initiated', label: 'Do Not Disturb Outbound' }
                ].map(({ direction, label }) => (
                  <BulkConfirmationWrapper
                    key={direction}
                    confirmBtnCallback={e => this.changeDirection(e, direction)}
                    mainText={`This will change the current work mode to "${label}" for all selected agents`}
                    secondaryText={'Are you sure you want to continue?'}
                  >
                    <BulkDirectionRow direction={direction} label={label} />
                  </BulkConfirmationWrapper>
                ))}
              </BulkActions>
            )}
          </Container>
        )}
        {this.props.supervisorUpdatePermissions.state && (
          <Container>
            <ToggleList>
              <span>
                <EditIconSVG size={20} editIconType="primary" /> Change State
              </span>
              <StyledToggle onChange={() => this.toggleFormField('state')} value={this.state.visibleFields.state} />
            </ToggleList>
            {this.state.visibleFields.state && (
              <BulkActions>
                {!this.state.showReasons &&
                  [
                    { presenceState: 'ready', label: 'Ready', warningMessage: 'Available' },
                    { presenceState: 'notready', label: 'Away', warningMessage: 'Unavailable' },
                    { presenceState: 'offline', label: 'Logout', warningMessage: 'Offline' }
                  ].map(
                    ({ presenceState, label, warningMessage }) =>
                      presenceState === 'notready' ? (
                        <BulkPresenceStateRow
                          key={presenceState}
                          presenceState={presenceState}
                          label={label}
                          onSelect={e => this.showPresenceReasonMenu(e, !this.state.showReasons)}
                        />
                      ) : (
                        <BulkConfirmationWrapper
                          key={presenceState}
                          confirmBtnCallback={e => this.changePresenceState(e, presenceState)}
                          mainText={
                            this.props.countBusyAgentsSelected > 0 && presenceState === 'offline'
                              ? `One or more of the selected agents are in a Busy state. Any active interactions will be disconnected and lost.`
                              : `This will change the current state to "${warningMessage}" for all selected agents`
                          }
                          secondaryText={'Are you sure you want to continue?'}
                        >
                          <BulkPresenceStateRow presenceState={presenceState} label={label} />
                        </BulkConfirmationWrapper>
                      )
                  )}
                {this.state.showReasons && (
                  <Fragment>
                    <ChangeButton
                      type="button"
                      buttonType="secondary"
                      onClick={e => this.showPresenceReasonMenu(e, !this.state.showReasons)}
                    >
                      <BackCaret direction="left" size={13.33} />
                      {` Back`}
                    </ChangeButton>
                    <NotReadyState statusLoading={this.state.statusLoading}>
                      {this.props.reasonLists.length === 0 && (
                        <div style={{ textAlign: 'center' }}>
                          <LoadingSpinnerSVG size={28} color="white" />
                        </div>
                      )}
                      {this.props.reasonLists.map(this.renderList, this)}
                    </NotReadyState>
                  </Fragment>
                )}
              </BulkActions>
            )}
          </Container>
        )}
      </Wrapper>
    );
  }
}

AgentStateMonitoringBulkActionsForm.propTypes = {
  key: PropTypes.string,
  setBulkAgentDirection: PropTypes.func,
  setBulkAgentPresenceState: PropTypes.func,
  reasonLists: PropTypes.array,
  supervisorUpdatePermissions: PropTypes.object,
  countBusyAgentsSelected: PropTypes.number
};
