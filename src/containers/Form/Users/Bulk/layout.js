/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * UsersBulkActionsForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  RadioGroupField,
  Toggle,
  ToggleField,
  SelectField,
  ConfirmationWrapper,
  AutoCompleteField,
  regions,
} from 'cx-ui-components';

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

const BulkActions = styled.div`
  margin: 10px;
`;

export default class UsersBulkActionsForm extends Component {
  constructor() {
    super();
    const visibleFields = {
      status: false,
      noPassword: false,
      defaultIdentityProvider: false,
      region: false,
      addGroup: false,
      removeGroup: false,
      addSkill: false,
      removeSkill: false,
    };
    this.state = {
      visibleFields,
      initialVisibleFields: visibleFields,
    };
  }

  toggleFormField = (name) => {
    const _that = this;
    for (
      let index = 0, fieldNames = ['inviteNow', 'resendInvitation', 'cancelInvitation', 'passwordReset'];
      index < fieldNames.length;
      index++
    ) {
      _that.props.change(fieldNames[index], fieldNames[index] === name);
    }
    this.setState({
      visibleFields: {
        ...this.state.initialVisibleFields,
        [name]: !this.state.visibleFields[name],
      },
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <Container>
          <ToggleList>
            <span>Enable/Disable Users</span>
            <StyledToggle
              onChange={() => this.toggleFormField('status')}
              value={this.state.visibleFields.status}
              data-automation="statusToggle"
              disabled={this.props.isSaving || this.props.isBulkUpdating}
            />
          </ToggleList>
          {this.state.visibleFields.status && (
            <BulkActions>
              <RadioGroupField
                name="status"
                label="Status"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                options={[{ label: 'Enabled', value: 'accepted' }, { label: 'Disabled', value: 'disabled' }]}
                data-automation="statusChoose"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Send Invitation</span>
            <ConfirmationWrapper
              confirmBtnCallback={!this.props.inviteNowIsChecked ? () => this.toggleFormField('inviteNow') : undefined}
              mainText={`This will send an email invitation to all users selected`}
              secondaryText={'Are you sure you want to continue?'}
              data-automation="inviteNowConfirmationWrapper">
              <StyledToggleField
                name="inviteNow"
                label=""
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                data-automation="inviteNowToggle"
              />
            </ConfirmationWrapper>
          </ToggleList>
        </Container>
        <Container>
          <ToggleList>
            <span>Resend Invitation</span>
            <ConfirmationWrapper
              confirmBtnCallback={
                !this.props.resendInvitationIsChecked ? () => this.toggleFormField('resendInvitation') : undefined
              }
              mainText={`This will resend an email invitation to all users selected`}
              secondaryText={'Are you sure you want to continue?'}
              data-automation="resendInvitationConfirmationWrapper">
              <StyledToggleField
                name="resendInvitation"
                label=""
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                data-automation="resendInvitationToggle"
              />
            </ConfirmationWrapper>
          </ToggleList>
        </Container>
        <Container>
          <ToggleList>
            <span>Cancel Invitation</span>
            <ConfirmationWrapper
              confirmBtnCallback={
                !this.props.cancelInvitationIsChecked ? () => this.toggleFormField('cancelInvitation') : undefined
              }
              mainText={`This will prevent all selected users from accepting the invitation.`}
              secondaryText={'Are you sure you want to continue?'}
              data-automation="cancelInvitationConfirmationWrapper">
              <StyledToggleField
                name="cancelInvitation"
                label=""
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                data-automation="cancelInvitationToggle"
              />
            </ConfirmationWrapper>
          </ToggleList>
        </Container>
        {this.props.displayResetPassword && (
          <Container>
            <ToggleList>
              <span>Reset Password</span>
              <ConfirmationWrapper
                confirmBtnCallback={
                  !this.props.passwordResetIsChecked ? () => this.toggleFormField('passwordReset') : undefined
                }
                mainText={`This will send a password reset email to all users selected`}
                secondaryText={'Are you sure you want to continue?'}
                data-automation="passwordResetConfirmationWrapper">
                <StyledToggleField
                  name="passwordReset"
                  label=""
                  disabled={this.props.isSaving || this.props.isBulkUpdating}
                  data-automation="passwordResetToggle"
                />
              </ConfirmationWrapper>
            </ToggleList>
          </Container>
        )}
        <Container>
          <ToggleList>
            <span>Set Platform Authentication</span>
            <StyledToggle
              onChange={() => this.toggleFormField('noPassword')}
              value={this.state.visibleFields.noPassword}
              data-automation="noPasswordToggle"
            />
          </ToggleList>
          {this.state.visibleFields.noPassword && (
            <BulkActions>
              <SelectField
                name="noPassword"
                label="Platform Authentication"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                options={[
                  { label: 'Use Tenant Default', value: 'null' },
                  { label: 'Enabled', value: false },
                  { label: 'Disabled', value: true },
                ]}
                required
                data-automation="noPasswordList"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Set Default Identity Provider</span>
            <StyledToggle
              onChange={() => this.toggleFormField('defaultIdentityProvider')}
              value={this.state.visibleFields.defaultIdentityProvider}
              data-automation="defaultIdentityProviderToggle"
            />
          </ToggleList>
          {this.state.visibleFields.defaultIdentityProvider && (
            <BulkActions>
              <SelectField
                name="defaultIdentityProvider"
                label="Single Sign On Identitiy Provider"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                options={this.props.identityProviders}
                required
                data-automation="defaultIdentityProviderList"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Set Twilio Regions </span>
            <StyledToggle
              onChange={() => this.toggleFormField('region')}
              value={this.state.visibleFields.region}
              data-automation="regionToggle"
              disabled={this.props.isSaving || this.props.isBulkUpdating}
            />
          </ToggleList>
          {this.state.visibleFields.region && (
            <BulkActions>
              <SelectField
                name="region"
                label="Twilio Region"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                options={regions}
                data-automation="regionList"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Add Group</span>
            <StyledToggle
              onChange={() => this.toggleFormField('addGroup')}
              value={this.state.visibleFields.addGroup}
              data-automation="addGroupToggle"
              disabled={this.props.isSaving || this.props.isBulkUpdating}
            />
          </ToggleList>
          {this.state.visibleFields.addGroup && (
            <BulkActions>
              <AutoCompleteField
                name="addGroup"
                label="Group"
                placeholder="Search..."
                suggestedDropDownWidth="100%"
                suggestions={this.props.groups.toJS().reduce((acc, group) => {
                  if (group.name !== 'everyone') {
                    acc.push(group.name);
                  }
                  return acc;
                }, [])}
                data-automation="addGroupAutoComplete"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Remove Group</span>
            <StyledToggle
              onChange={() => this.toggleFormField('removeGroup')}
              value={this.state.visibleFields.removeGroup}
              data-automation="removeGroupToggle"
              disabled={this.props.isSaving || this.props.isBulkUpdating}
            />
          </ToggleList>
          {this.state.visibleFields.removeGroup && (
            <BulkActions>
              <AutoCompleteField
                name="removeGroup"
                label="Group"
                placeholder="Search..."
                suggestedDropDownWidth="100%"
                suggestions={this.props.groups.toJS().reduce((acc, group) => {
                  if (group.name !== 'everyone') {
                    acc.push(group.name);
                  }
                  return acc;
                }, [])}
                data-automation="removeGroupAutoComplete"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Add Skill</span>
            <StyledToggle
              onChange={() => this.toggleFormField('addSkill')}
              value={this.state.visibleFields.addSkill}
              data-automation="addSkillToggle"
              disabled={this.props.isSaving || this.props.isBulkUpdating}
            />
          </ToggleList>
          {this.state.visibleFields.addSkill && (
            <BulkActions>
              <AutoCompleteField
                name="addSkill"
                label="Skill"
                placeholder="Search..."
                suggestedDropDownWidth="100%"
                suggestions={this.props.skills.toJS().map((skill) => skill.name)}
                data-automation="addSkillAutoComplete"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Remove Skill</span>
            <StyledToggle
              onChange={() => this.toggleFormField('removeSkill')}
              value={this.state.visibleFields.removeSkill}
              data-automation="removeSkillToggle"
              disabled={this.props.isSaving || this.props.isBulkUpdating}
            />
          </ToggleList>
          {this.state.visibleFields.removeSkill && (
            <BulkActions>
              <AutoCompleteField
                name="removeSkill"
                label="Skill"
                placeholder="Search..."
                suggestedDropDownWidth="100%"
                suggestions={this.props.skills.toJS().map((skill) => skill.name)}
                data-automation="removeSkillAutoComplete"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
              />
            </BulkActions>
          )}
        </Container>
      </form>
    );
  }
}

UsersBulkActionsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  identityProviders: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ),
  inviteNowIsChecked: PropTypes.bool,
  resendInvitationIsChecked: PropTypes.bool,
  cancelInvitationIsChecked: PropTypes.bool,
  passwordResetIsChecked: PropTypes.bool,
  displayResetPassword: PropTypes.bool,
  change: PropTypes.func,
  groups: PropTypes.object,
  skills: PropTypes.object,
  isSaving: PropTypes.bool,
  isBulkUpdating: PropTypes.bool,
};
