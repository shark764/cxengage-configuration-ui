/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * UsersForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DetailHeader, InputField, SelectField, ToggleField, DetailsPanelAlert } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function UsersForm({
  handleSubmit,
  platformRoles,
  tenantRoles,
  tenantIdentityProviders,
  isSaving,
  userHasUpdatePermission,
  key,
  checkPlatformUser
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        {checkPlatformUser && (
          <DetailsPanelAlert text="This user already exists on the platform and it will be added to the tenant upon clicking “Submit”" />
        )}

        <DetailWrapper open={true} data-automation="loginDetailsSVG">
          <WrappedDetailHeader text="Login Details" />
          <InputField
            name="email"
            data-automation="emailInput"
            label="Email *"
            id="frm-users-email"
            componentType="input"
            inputType="text"
          />
          <SelectField
            name="platformRoleId"
            label="Platform Role *"
            id="frm-users-platform-role-id"
            data-automation="roleList"
            disabled={isSaving || !userHasUpdatePermission || checkPlatformUser}
            options={platformRoles}
          />
          <SelectField
            name="noPassword"
            label="Platform Authentication"
            id="frm-users-no-password-id"
            data-automation="authenticationList"
            disabled={isSaving || !userHasUpdatePermission}
            options={[
              { label: 'Use Tenant Default', value: 'null' },
              { label: 'Enabled', value: true },
              { label: 'Disabled', value: false }
            ]}
            required
          />
          <SelectField
            name="defaultIdentityProvider"
            label="Single Sign On Identitiy Provider"
            id="frm-users-default-identity-provider-id"
            data-automation="identityProviderList"
            disabled={isSaving || !userHasUpdatePermission}
            options={tenantIdentityProviders}
            required
          />
        </DetailWrapper>

        <DetailWrapper open={true} data-automation="tenantDetailsSVG">
          <WrappedDetailHeader text="Tenant Details" />
          <InputField
            name="workStationId"
            label="Workstation ID"
            id="frm-users-work-station-id"
            data-automation="workstationIdInput"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <SelectField
            name="roleId"
            label="Tenant Role *"
            id="frm-users-role-id"
            data-automation="tenantList"
            disabled={isSaving || !userHasUpdatePermission}
            options={tenantRoles}
          />
          <ToggleField
            name="inviteNow"
            label="Invite Now"
            id="frm-users-invite-now"
            data-automation="inviteToggle"
            disabled={isSaving || !userHasUpdatePermission}
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
  userHasUpdatePermission: PropTypes.bool,
  checkPlatformUser: PropTypes.bool,
  platformRoles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  tenantIdentityProviders: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  tenantRoles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  )
};
