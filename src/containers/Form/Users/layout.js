/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * UsersForm
 *
 */

import React, { Fragment } from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  DetailHeader,
  InputField,
  SelectField,
  ExtensionListField,
  Button,
  ConfirmationWrapper,
  Detail
} from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import store from '../../../redux/store';
import { generateUUID } from 'serenova-js-utils/uuid';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const InviteButtons = styled(Button)`
  margin: 10px;
`;

const platformStatus = value => {
  switch (value) {
    case 'pending':
      return 'Pending Invite';
    case 'invited':
      return 'Invited';
    case 'expired':
      return 'Expired';
    case 'enabled':
      return 'Enabled';
    case 'disabled':
      return 'Disabled';
    case 'sso-only':
      return 'SSO Only';
    default:
      break;
  }
};

export default function UsersForm({
  handleSubmit,
  tenantRoles,
  status,
  initialValues,
  tenantIdentityProviders,
  isSaving,
  userHasUpdatePermission,
  capacityRules,
  key,
  currentAgentId,
  changeUserInviteStatus,
  displayResetPassword,
  usersFetching,
  userHasNameSet
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <DetailWrapper open={true} data-automation="platformDetailsSVG">
          <WrappedDetailHeader text="Platform Details" />
          <InputField
            className="frm-users-firstname"
            name="firstName"
            label="First Name"
            data-automation="firstNameInput"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
            required
          />
          <InputField
            className="frm-users-lastname"
            name="lastName"
            label="Last Name"
            data-automation="lastNameInput"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
            required
          />
          <InputField
            className="frm-users-external-id"
            name="externalId"
            label="External ID"
            componentType="input"
            data-automation="externalIdInput"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
        </DetailWrapper>

        <DetailWrapper open={true} data-automation="loginDetailsSVG">
          <WrappedDetailHeader text="Login Details" />
          <Detail label="Email" value={initialValues.get('email')} />
          <Detail label="Platform Status" value={platformStatus(initialValues.get('platformStatus'))} />
          <SelectField
            className="frm-users-platform-authentication"
            name="noPassword"
            label="Platform Authentication"
            data-automation="authenticationList"
            disabled={isSaving || !userHasUpdatePermission || currentAgentId === initialValues.get('id')}
            options={[
              { label: 'Use Tenant Default', value: 'null' },
              { label: 'Enabled', value: false },
              { label: 'Disabled', value: true }
            ].filter(val => (currentAgentId === initialValues.get('id') ? val.value !== 'null' : val))}
            required
          />
          <SelectField
            className="frm-users-default-sso-provider"
            name="defaultIdentityProvider"
            data-automation="identityProviderList"
            label="Single Sign on Identity Provider"
            disabled={isSaving || !userHasUpdatePermission}
            options={tenantIdentityProviders}
            required
          />

          {status === 'pending' && (
            <ConfirmationWrapper
              confirmBtnCallback={() => changeUserInviteStatus('invited', initialValues.get('id'))}
              mainText={`This will send an email invitation to ${initialValues.get('email')}.`}
              data-automation="pendingConfirmationWrapper"
            >
              <InviteButtons
                type="button"
                buttonType="secondary"
                className="invite-now-button"
                data-automation="inviteButton"
              >
                Send Invitation
              </InviteButtons>
            </ConfirmationWrapper>
          )}

          {status === 'expired' && (
            <ConfirmationWrapper
              confirmBtnCallback={() => changeUserInviteStatus('invited', initialValues.get('id'))}
              mainText={`Are you sure you want to resend an email invitation to ${initialValues.get('email')}?`}
              data-automation="expiredConfirmationWrapper"
            >
              <InviteButtons
                type="button"
                buttonType="secondary"
                className="resend-invite-button"
                data-automation="resendInviteButton"
              >
                Resend Invitation
              </InviteButtons>
            </ConfirmationWrapper>
          )}

          {status === 'invited' && (
            <Fragment>
              <ConfirmationWrapper
                confirmBtnCallback={() => changeUserInviteStatus('invited', initialValues.get('id'))}
                mainText={`Are you sure you want to resend an email invitation to ${initialValues.get('email')}?`}
                data-automation="invitedConfirmationWrapper"
              >
                <InviteButtons
                  type="button"
                  buttonType="secondary"
                  className="resend-invite-button"
                  data-automation="resendInviteButton"
                >
                  Resend Invitation
                </InviteButtons>
              </ConfirmationWrapper>

              <ConfirmationWrapper
                confirmBtnCallback={() => changeUserInviteStatus('pending', initialValues.get('id'))}
                mainText={`This will prevent the user ${initialValues.get('email')} from accepting the invitation.`}
                data-automation="cancelConfirmationWrapper"
              >
                <InviteButtons
                  type="button"
                  buttonType="secondary"
                  className="cancel-invite-button"
                  data-automation="cancelInviteButton"
                >
                  Cancel Invitation
                </InviteButtons>
              </ConfirmationWrapper>
            </Fragment>
          )}

          {userHasNameSet &&
            displayResetPassword &&
            status === 'enabled' && (
              <ConfirmationWrapper
                confirmBtnCallback={() => changeUserInviteStatus('passwordReset', initialValues.get('id'))}
                mainText={`Are you sure you want to send a password reset email to ${initialValues.get('email')}?`}
                data-automation="resetPasswordConfirmationWrapper"
              >
                <InviteButtons
                  type="button"
                  buttonType="secondary"
                  className="reset-password-button"
                  data-automation="resetPasswordButton"
                >
                  Reset Password
                </InviteButtons>
              </ConfirmationWrapper>
            )}
        </DetailWrapper>

        <DetailWrapper open={true} data-automation="tenantDetailsSVG">
          <WrappedDetailHeader text="Tenant Details" />
          <InputField
            className="frm-users-workstation-id"
            name="workStationId"
            label="Workstation ID"
            data-automation="workstationIdInput"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          {tenantRoles &&
            !usersFetching && (
              <SelectField
                className="frm-users-role-id"
                name="roleId"
                label="Tenant Role"
                data-automation="roleList"
                disabled={isSaving || !userHasUpdatePermission || currentAgentId === initialValues.get('id')}
                options={tenantRoles}
              />
            )}
        </DetailWrapper>

        <DetailWrapper open={true} data-automation="extensionsSVG">
          <WrappedDetailHeader
            text="Extensions"
            userHasUpdatePermission={userHasUpdatePermission}
            onActionButtonClick={() => {
              let id = store.getState().getIn(['Entities', 'users', 'selectedEntityId']);
              let extensions = store
                .getState()
                .getIn(['form', `users:${id}`, 'values', 'extensions'])
                .push(
                  fromJS({
                    type: 'pstn',
                    value: '',
                    provider: '',
                    region: '',
                    description: '',
                    id: generateUUID(),
                    hide: false
                  })
                );
              store.dispatch({
                type: '@@redux-form/CHANGE',
                meta: {
                  form: `users:${id}`,
                  field: 'extensions',
                  touch: false,
                  persistentSubmitErrors: false
                },
                payload: extensions
              });
            }}
          />
          <ExtensionListField
            className="users-extensions"
            name="extensions"
            label="Inputs"
            data-automation="extensionsExtensionList"
          />
        </DetailWrapper>

        {userHasNameSet && (
          <DetailWrapper open={true} data-automation="capacityRuleSVG">
            <WrappedDetailHeader text="Capacity Rule" />
            <SelectField
              className="users-form-capacity-rule"
              name="effectiveCapacityRule"
              label="Current Capacity Rule"
              disabled={isSaving || !userHasUpdatePermission}
              options={capacityRules}
              data-automation="effectiveCapacityRuleList"
            />
            {/* TODO:
              Delete button for deleting current capacity rule
              <CloseIconSVG
                size={10}
                closeIconType="primary"
                disabled={!initialValues.has('effectiveCapacityRule')}
                onClick={() => console.log('DELETE API CALL')}
              /> */}
          </DetailWrapper>
        )}
      </Wrapper>
    </form>
  );
}

UsersForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  currentAgentId: PropTypes.string,
  initialValues: PropTypes.object,
  tenantIdentityProviders: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  tenantRoles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  capacityRules: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.object
  ]),
  status: PropTypes.string,
  scenario: PropTypes.string,
  changeUserInviteStatus: PropTypes.func.isRequired,
  displayResetPassword: PropTypes.bool,
  usersFetching: PropTypes.bool,
  userHasNameSet: PropTypes.bool
};
