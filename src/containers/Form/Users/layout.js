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
import { DetailHeader, InputField, SelectField, ToggleField } from 'cx-ui-components';
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
  isSaving,
  inherited,
  userHasUpdatePermission,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Details" />
          <InputField
            name="firstName"
            label="First Name"
            id="frm-users-first-name"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="lastName"
            label="Last Name"
            id="frm-users-last-name"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="externalId"
            label="External ID"
            id="frm-users-external-id"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="workStationId"
            label="Workstation ID"
            id="frm-users-work-station-id"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
        </DetailWrapper>

        <DetailWrapper open={true}>
          <WrappedDetailHeader text="Login" />
          <InputField name="email" label="Email" id="frm-users-email" componentType="input" inputType="text" disabled />
          <SelectField
            name="platformRoleId"
            label="Platform Role *"
            id="frm-users-platform-role-id"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            options={platformRoles}
            required
          />
          <SelectField
            name="roleId"
            label="Tenant Role *"
            id="frm-users-role-id"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            options={tenantRoles}
            required
          />
          {status !== 'invited' && (
            <ToggleField
              name="inviteNow"
              label="Invite Now"
              id="frm-users-invite-now"
              disabled={isSaving || inherited || !userHasUpdatePermission}
            />
          )}
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
  tenantRoles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  status: PropTypes.string,
  scenario: PropTypes.string
};
