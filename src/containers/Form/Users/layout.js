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
import { DetailHeader, InputField, SelectField, ExtensionListField, Button } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import ConfirmationWrapper from '../../../components/ConfirmationWrapper';
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

export default function UsersForm({
  handleSubmit,
  platformRoles,
  tenantRoles,
  status,
  scenario,
  initialValues,
  tenantIdentityProviders,
  isSaving,
  userHasUpdatePermission,
  capacityRules,
  key,
  currentAgentId,
  changeUserInviteStatus,
  displayResetPassword
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Platform Details" />
          <InputField
            className="frm-users-firstname"
            name="firstName"
            label="First Name"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <InputField
            className="frm-users-lastname"
            name="lastName"
            label="Last Name"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <InputField
            className="frm-users-external-id"
            name="externalId"
            label="External ID"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Tenant Details" />
          <InputField
            className="frm-users-workstation-id"
            name="workStationId"
            label="Workstation ID"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <SelectField
            className="frm-users-role-id"
            name="roleId"
            label="Tenant Role"
            disabled={isSaving || !userHasUpdatePermission || currentAgentId === initialValues.get('id')}
            options={tenantRoles}
          />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Login Details" />
          <InputField
            name="email"
            label="Email"
            className="frm-users-email"
            componentType="input"
            inputType="text"
            disabled
          />
          <InputField
            className="frm-users-invitation-status"
            name="invitationStatus"
            label="Platform Status"
            componentType="input"
            inputType="text"
            disabled
          />
          <SelectField
            className="frm-users-platform-authentication"
            name="noPassword"
            label="Platform Authentication"
            disabled={isSaving || !userHasUpdatePermission || currentAgentId === initialValues.get('id')}
            options={[
              { label: 'Use Tenant Default: Enabled', value: 'null' },
              { label: 'Enabled', value: false },
              { label: 'Disabled', value: true }
            ].filter(val => (currentAgentId === initialValues.get('id') ? val.value !== 'null' : val))}
            required
          />
          <SelectField
            className="frm-users-default-sso-provider"
            name="defaultIdentityProvider"
            label="Single Sign On Identitiy Provider"
            disabled={isSaving || !userHasUpdatePermission}
            options={tenantIdentityProviders}
            required
          />

          {status === 'pending' && (
            <ConfirmationWrapper
              confirmBtnCallback={() => changeUserInviteStatus('invited', initialValues.get('id'))}
              mainText={`This will send an email invitation to ${initialValues.get('email')}.`}
            >
              <InviteButtons type="button" buttonType="secondary" className="invite-now-button">
                Send Invitation
              </InviteButtons>
            </ConfirmationWrapper>
          )}

          {status === 'expired' && (
            <ConfirmationWrapper
              confirmBtnCallback={() => changeUserInviteStatus('invited', initialValues.get('id'))}
              mainText={`Are you sure you want to resend an email invitation to ${initialValues.get('email')}?`}
            >
              <InviteButtons type="button" buttonType="secondary" className="resend-invite-button">
                Resend Invitation
              </InviteButtons>
            </ConfirmationWrapper>
          )}

          {status === 'invited' && (
            <Fragment>
              <ConfirmationWrapper
                confirmBtnCallback={() => changeUserInviteStatus('invited', initialValues.get('id'))}
                mainText={`Are you sure you want to resend an email invitation to ${initialValues.get('email')}?`}
              >
                <InviteButtons type="button" buttonType="secondary" className="resend-invite-button">
                  Resend Invitation
                </InviteButtons>
              </ConfirmationWrapper>

              <ConfirmationWrapper
                confirmBtnCallback={() => changeUserInviteStatus('pending', initialValues.get('id'))}
                mainText={`This will prevent the user ${initialValues.get('email')} from accepting the invitation.`}
              >
                <InviteButtons type="button" buttonType="secondary" className="cancel-invite-button">
                  Cancel Invitation
                </InviteButtons>
              </ConfirmationWrapper>
            </Fragment>
          )}

          {displayResetPassword &&
            status === 'enabled' && (
              <ConfirmationWrapper
                confirmBtnCallback={() => changeUserInviteStatus('passwordReset', initialValues.get('id'))}
                mainText={`Are you sure you want to send a password reset email to ${initialValues.get('email')}?`}
              >
                <InviteButtons type="button" buttonType="secondary" className="reset-password-button">
                  Reset Password
                </InviteButtons>
              </ConfirmationWrapper>
            )}
        </DetailWrapper>

        <DetailWrapper open={true}>
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
                    id: generateUUID()
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
          <ExtensionListField className="users-extensions" name="extensions" label="Inputs" />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Capacity" />
          <SelectField
            className="users-form-capacity-rule"
            name="effectiveCapacityRule"
            label="Capacity Rule"
            disabled={isSaving || !userHasUpdatePermission}
            options={capacityRules}
            required
          />
        </DetailWrapper>
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
  platformRoles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
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
  capacityRules: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  status: PropTypes.string,
  scenario: PropTypes.string,
  changeUserInviteStatus: PropTypes.func.isRequired,
  displayResetPassword: PropTypes.bool
};
