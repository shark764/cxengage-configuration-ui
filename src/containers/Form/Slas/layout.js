/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SlasForm
 *
 */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  DetailHeader,
  InputField,
  SelectField,
  ToggleField,
  ConfirmationWrapper,
  DetailsPanelAlert,
  Button
} from 'cx-ui-components';
import styled from 'styled-components';
import InitialVersionForm from './Version/form';

const CancelInitialVersionButton = styled(Button)`
  margin: 10px 10px 10px 160px;
`;

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 20px;
`;

export default class SlasForm extends Component {
  constructor() {
    super();
    this.state = {
      addInitialVersion: false
    };
  }

  addInitialVersion = open => {
    this.setState({
      addInitialVersion: open
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        {this.props.initialValues.get('id') !== undefined &&
          !this.props.inherited &&
          (this.props.versions.length === 0 || this.props.versions.size === 0) && (
            <DetailsPanelAlert text="Must have an active version before a SLA can be enabled" />
          )}
        {this.props.isSlaTenantDefault && (
          <DetailsPanelAlert text="This SLA has been configured as the default for this Tenant" />
        )}
        <DetailHeader text="Details" />
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          automation="slasFormFieldName"
          disabled={this.props.isSaving || this.props.inherited || !this.props.userHasUpdatePermission}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          automation="slasFormFieldDescription"
          disabled={this.props.isSaving || this.props.inherited || !this.props.userHasUpdatePermission}
        />
        {this.props.initialValues.get('id') !== undefined && (
          <SelectField
            name="activeVersion"
            label="Active Version *"
            placeholder="Select a version..."
            options={this.props.versions}
            automation="slasFormFieldActiveVersion"
            disabled={
              this.props.isSaving ||
              this.props.inherited ||
              this.props.versions.length === 0 ||
              this.props.versions.size === 0 ||
              !this.props.userHasUpdatePermission
            }
          />
        )}
        <ConfirmationWrapper
          confirmBtnCallback={
            !this.props.disableShared && !this.props.sharedFormValue ? this.props.toggleShared : undefined
          }
          mainText={`Setting shared to "enabled" for this SLA. Once an SLA is shared and saved, it cannot be reverted.`}
          secondaryText={'Are you sure you want to continue?'}
        >
          <ToggleField
            name="shared"
            label="Shared"
            title={
              this.props.disableShared
                ? `You cannot update "Shared" once it's set to true`
                : `Change "Shared" state for this SLA`
            }
            onChange={() => {}}
            automation="slasFormFieldShared"
            disabled={
              this.props.isSaving ||
              this.props.inherited ||
              !this.props.userHasUpdatePermission ||
              this.props.disableShared
            }
          />
        </ConfirmationWrapper>
        {this.props.initialValues.get('id') === undefined && (
          <Fragment>
            <DetailHeader
              userHasUpdatePermission={!this.state.addInitialVersion}
              text={'Initial Version'}
              onActionButtonClick={() => this.addInitialVersion(true)}
              open
            />
            {this.state.addInitialVersion && (
              <Wrapper>
                <InitialVersionForm
                  isSaving={this.props.isSaving}
                  key="create"
                  slaAbandonType={this.props.slaAbandonType}
                  viewOnly={false}
                />
                <CancelInitialVersionButton
                  type="button"
                  buttonType="secondary"
                  automation="slasFormFieldAddInitialVersion"
                  onClick={() => this.addInitialVersion(false)}
                >
                  Cancel
                </CancelInitialVersionButton>
              </Wrapper>
            )}
          </Fragment>
        )}
      </form>
    );
  }
}

SlasForm.propTypes = {
  key: PropTypes.string,
  initialValues: PropTypes.object,
  versions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.object
  ]),
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  slaAbandonType: PropTypes.string,
  isSlaTenantDefault: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  disableShared: PropTypes.bool,
  toggleShared: PropTypes.func
};

SlasForm.defaultProps = {
  versions: []
};
