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
import { RadioGroupField, Toggle, ToggleField, SelectField, ConfirmationWrapper, AutoCompleteField } from 'cx-ui-components';

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
    this.state = {
      visibleFields: {
        status: false,
        noPassword: false,
        defaultIdentityProvider: false,
        region: false,
        addGroup: false,
        removeGroup: false,
        addSkill: false,
        removeSkill: false,
      }
    };
  }

  toggleField = e => {
    this.setState({
      visibleFields: {
        ...this.state.visibleFields,
        status: !this.state.visibleFields.status
      }
    });
  };
  toggleFormField = name => {
    this.setState({
      visibleFields: {
        ...this.state.visibleFields,
        [name]: !this.state.visibleFields[name]
      }
    });
  };

  togglePlatformAuthentication = e => {
    this.setState({
      visibleFields: {
        ...this.state.visibleFields,
        noPassword: !this.state.visibleFields.noPassword
      }
    });
  };

  toggleDefaultIdentityProvider = e => {
    this.setState({
      visibleFields: {
        ...this.state.visibleFields,
        defaultIdentityProvider: !this.state.visibleFields.defaultIdentityProvider
      }
    });
  };
  toggleRegion = e => {
    this.setState({
      visibleFields: {
        ...this.state.visibleFields,
        region: !this.state.visibleFields.region
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <Container>
          <ToggleList>
            <span>Enable/Disable Users</span>
            <StyledToggle onChange={this.toggleField} />
          </ToggleList>
          {this.state.visibleFields.status && (
            <BulkActions>
              <RadioGroupField
                name="status"
                label="Status"
                disabled={this.props.isSaving || this.props.inherited}
                options={[
                  {
                    label: 'Enabled',
                    value: 'accepted'
                  },
                  {
                    label: 'Disabled',
                    value: 'disabled'
                  }
                ]}
                automation="usersBulkActionsFormFieldStatus"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Send Invitation</span>
            <ConfirmationWrapper
              confirmBtnCallback={!this.props.inviteNowIsChecked ? this.props.toggleInviteNow : undefined}
              mainText={`This will send an email invitation to all users selected`}
              secondaryText={'Are you sure you want to continue?'}
            >
              <StyledToggleField
                name="inviteNow"
                disabled={this.props.isSaving || this.props.inherited}
                automation="usersBulkActionsFormFieldInviteNow"
              />
            </ConfirmationWrapper>
          </ToggleList>
        </Container>
        <Container>
          <ToggleList>
            <span>Resend Invitation</span>
            <ConfirmationWrapper
              confirmBtnCallback={!this.props.resendInvitationIsChecked ? this.props.toggleResendInvitation : undefined}
              mainText={`This will resend an email invitation to all users selected`}
              secondaryText={'Are you sure you want to continue?'}
            >
              <StyledToggleField
                name="resendInvitation"
                disabled={this.props.isSaving || this.props.inherited}
                automation="usersBulkActionsFormFieldResendInvitation"
              />
            </ConfirmationWrapper>
          </ToggleList>
        </Container>
        <Container>
          <ToggleList>
            <span>Cancel Invitation</span>
            <ConfirmationWrapper
              confirmBtnCallback={!this.props.cancelInvitationIsChecked ? this.props.toggleCancelInvitation : undefined}
              mainText={`This will prevent all selected users from accepting the invitation.`}
              secondaryText={'Are you sure you want to continue?'}
            >
              <StyledToggleField
                name="cancelInvitation"
                disabled={this.props.isSaving || this.props.inherited}
                automation="usersBulkActionsFormFieldCancelInvitation"
              />
            </ConfirmationWrapper>
          </ToggleList>
        </Container>
        { this.props.isUserPlatformAdmin && <Container>
          <ToggleList>
            <span>Reset Password</span>
            <ConfirmationWrapper
              confirmBtnCallback={!this.props.passwordResetIsChecked ? this.props.togglePasswordReset : undefined}
              mainText={`This will send a password reset email to all users selected`}
              secondaryText={'Are you sure you want to continue?'}
            >
              <StyledToggleField
                name="passwordReset"
                disabled={this.props.isSaving || this.props.inherited}
                automation="usersBulkActionsFormFieldPasswordReset"
              />
            </ConfirmationWrapper>
          </ToggleList>
        </Container>}
        <Container>
          <ToggleList>
            <span>Set Platform Authentication</span>
            <StyledToggle onChange={this.togglePlatformAuthentication} />
          </ToggleList>
          {this.state.visibleFields.noPassword && (
            <BulkActions>
              <SelectField
                name="noPassword"
                label="Platform Authentication"
                disabled={this.props.isSaving || this.props.inherited}
                options={[
                  {
                    label: 'Use Tenant Default',
                    value: 'null'
                  },
                  {
                    label: 'Enabled',
                    value: false
                  },
                  {
                    label: 'Disabled',
                    value: true
                  }
                ]}
                required
                automation="usersBulkActionsFormFieldNoPassword"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Set Default Identity Provider</span>
            <StyledToggle onChange={this.toggleDefaultIdentityProvider} />
          </ToggleList>
          {this.state.visibleFields.defaultIdentityProvider && (
            <BulkActions>
              <SelectField
                name="defaultIdentityProvider"
                label="Single Sign On Identitiy Provider"
                disabled={this.props.isSaving || this.props.inherited}
                options={this.props.identityProviders}
                required
                automation="usersBulkActionsFormFieldDefaultIdentityProvider"
              />
            </BulkActions>
          )}
        </Container>
        {/* <Container>
          <ToggleList>
            <span>Set Twilio Regions </span>
            <StyledToggle onChange={this.toggleRegion} />
          </ToggleList>
          {this.state.visibleFields.region && (
            <BulkActions>
              <SelectField
                name="region"
                label="Twilio Region"
                disabled={this.props.isSaving || this.props.inherited}
                options={[{
                  value: 'default',
                  label: 'Use Tenant Default'
                }, {
                  value: 'gll',
                  label: 'Global Low Latency'
                }, {
                  value: 'au1',
                  label: 'Australia'
                }, {
                  value: 'br1',
                  label: 'Brazil'
                }, {
                  value: 'ie1',
                  label: 'Ireland'
                }, {
                  value: 'jp1',
                  label: 'Japan'
                }, {
                  value: 'sg1',
                  label: 'Singapore'
                }, {
                  value: 'us1',
                  label: 'US East Coast (Virginia)'
                }, {
                  value: 'us1-tnx',
                  label: 'Virginia Interconnect'
                }, {
                  value: 'us2-tnx',
                  label: 'Oregon Interconnect'
                }, {
                  value: 'de1',
                  label: 'Germany Interconnect'
                }, {
                  value: 'ie1-tnx',
                  label: 'Ireland Interconnect'
                }]}
                automation="usersBulkActionsFormFieldRegion"
              />
            </BulkActions>
          )}
        </Container> */}
        <Container>
          <ToggleList>
            <span>Add Group</span>
            <StyledToggle onChange={() => this.toggleFormField('addGroup')} />
          </ToggleList>
          {this.state.visibleFields.addGroup && (
            <BulkActions>
              <AutoCompleteField
                name="addGroup"
                label="Group"
                placeholder="Search..."
                suggestions={this.props.groups.toJS().reduce((acc, group) => {             
                  if (group.name !== 'everyone') {
                    acc.push(group.name);
                  }
                  return acc;
                }, [])}
                automation="usersBulkActionsAddGroup"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Remove Group</span>
            <StyledToggle onChange={() => this.toggleFormField('removeGroup')} />
          </ToggleList>
          {this.state.visibleFields.removeGroup && (
            <BulkActions>
             <AutoCompleteField
                name="removeGroup"
                label="Group"
                placeholder="Search..."
                suggestions={this.props.groups.toJS().reduce((acc, group) => {             
                  if (group.name !== 'everyone') {
                    acc.push(group.name);
                  }
                  return acc;
                }, [])}
                automation="usersBulkActionsRemoveGroup"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Add Skill</span>
            <StyledToggle onChange={() => this.toggleFormField('addSkill')} />
          </ToggleList>
          {this.state.visibleFields.addSkill && (
            <BulkActions>
              <AutoCompleteField
                name="addSkill"
                label="Skill"
                placeholder="Search..."
                suggestions={this.props.skills.toJS().map(skill => skill.name)}
                automation="usersBulkActionsAddSkill"
              />
            </BulkActions>
          )}
        </Container>
        <Container>
          <ToggleList>
            <span>Remove Skill</span>
            <StyledToggle onChange={() => this.toggleFormField('removeSkill')} />
          </ToggleList>
          {this.state.visibleFields.removeSkill && (
            <BulkActions>
            <AutoCompleteField
                name="removeSkill"
                label="Skill"
                placeholder="Search..."
                suggestions={this.props.skills.toJS().map(skill => skill.name)}
                automation="usersBulkActionsRemoveSkill"
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
      value: PropTypes.string.isRequired
    })
  ),
  inviteNowIsChecked: PropTypes.bool,
  toggleInviteNow: PropTypes.func,
  resendInvitationIsChecked: PropTypes.bool,
  toggleResendInvitation: PropTypes.func,
  cancelInvitationIsChecked: PropTypes.bool,
  toggleCancelInvitation: PropTypes.func,
  passwordResetIsChecked: PropTypes.bool,
  togglePasswordReset: PropTypes.func,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};
