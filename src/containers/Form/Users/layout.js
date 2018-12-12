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
import { DetailHeader, InputField, SelectField, ExtensionListField } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';

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
  status,
  scenario,
  tenantIdentityProviders,
  isSaving,
  userHasUpdatePermission,
  capacityRules,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Platform Details" />
          <InputField
            name="firstName"
            label="First Name"
            id="frm-users-first-name"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <InputField
            name="lastName"
            label="Last Name"
            id="frm-users-last-name"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <InputField
            name="externalId"
            label="External ID"
            id="frm-users-external-id"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Tenant Details" />
          <InputField
            name="workStationId"
            label="Workstation ID"
            id="frm-users-work-station-id"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <SelectField
            name="roleId"
            label="Tenant Role"
            id="frm-users-role-id"
            disabled={isSaving || !userHasUpdatePermission}
            options={tenantRoles}
          />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Login Details" />
          <InputField name="email" label="Email" id="frm-users-email" componentType="input" inputType="text" disabled />
          <InputField
            name="platformStatus"
            label="Platform Status"
            id="frm-users-platform-status"
            componentType="input"
            inputType="text"
            disabled
          />
          <SelectField
            name="noPassword"
            label="Platform Authentication"
            id="frm-users-no-password-id"
            disabled={isSaving || !userHasUpdatePermission}
            options={[
              { label: 'Use Tenant Default: Enabled', value: 'null' },
              { label: 'Enabled', value: true },
              { label: 'Disabled', value: false }
            ]}
            required
          />
          <SelectField
            name="defaultIdentityProvider"
            label="Single Sign On Identitiy Provider"
            id="frm-users-default-identity-provider-id"
            disabled={isSaving || !userHasUpdatePermission}
            options={tenantIdentityProviders}
            required
          />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Extensions" />
          <ExtensionListField className="users-extensions" name="extensions" label="Inputs" />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Capacity" />
          <SelectField
            name="effectiveCapacityRule"
            label="Capacity Rule"
            id="frm-users-capacity-rule"
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
  scenario: PropTypes.string
};
