/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ReasonsBulkActionsForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RadioGroupField, Toggle, ConfirmationWrapper, ToggleField } from 'cx-ui-components';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';

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
const StyledToggleField = styled(ToggleField)`
  width: 15px;
  height: 15px;
  margin-right: 15px;
`;
const Options = styled.div`
  margin: 10px;
`;
const Message = styled.p`
  color: #656565;
  font-style: italic;
  font-size: 14px;
  width: 100%;
`;

export default class ReasonsBulkActionsForm extends Component {
  constructor() {
    super();
    const visibleFields = {
      active: false,
      shared: false
    };
    this.state = {
      visibleFields,
      initialVisibleFields: visibleFields
    };
  }

  toggleFormField = name => {
    this.props.change('shared', name === 'shared');
    this.setState({
      visibleFields: {
        ...this.state.initialVisibleFields,
        [name]: !this.state.visibleFields[name]
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <Container>
          <ToggleList>
            <span>Enable/Disable {camelCaseToRegularForm(this.props.entityName)}</span>
            <StyledToggle onChange={() => this.toggleFormField('active')} value={this.state.visibleFields.active} />
          </ToggleList>
          {this.state.visibleFields.active && (
            <Options>
              <RadioGroupField
                name="active"
                label="Active"
                disabled={this.props.isSaving || this.props.inherited}
                options={[{ label: 'Enabled', value: 'enabled' }, { label: 'Disabled', value: 'disabled' }]}
                data-automation="activeChoose"
              />
            </Options>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Share {camelCaseToRegularForm(this.props.entityName)}</span>
            <ConfirmationWrapper
              confirmBtnCallback={
                !this.props.sharedIsChecked && this.props.userHasSharePermission
                  ? () => this.toggleFormField('shared')
                  : undefined
              }
              mainText={`Setting shared to 'enabled' cannot be reverted.`}
              secondaryText={'Are you sure you want to continue?'}
              data-automation="toggleSharedConfirmationWrapper"
            >
              <StyledToggleField
                name="shared"
                label=""
                disabled={this.props.isSaving || this.props.inherited || !this.props.userHasSharePermission}
                data-automation="sharedToggle"
              />
            </ConfirmationWrapper>
          </ToggleList>
          <Message>
            <strong>Note:</strong> This action cannot be undone.
          </Message>
        </Container>
      </form>
    );
  }
}

ReasonsBulkActionsForm.propTypes = {
  key: PropTypes.string,
  entityName: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  sharedIsChecked: PropTypes.bool,
  userHasSharePermission: PropTypes.bool
};

ReasonsBulkActionsForm.defaultProps = {
  sharedIsChecked: false
};
