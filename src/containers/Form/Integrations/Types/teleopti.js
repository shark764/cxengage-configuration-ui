/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TeleoptiForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField, ToggleField } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import styled from 'styled-components';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function TeleoptiForm({ isSaving, inherited, userHasUpdatePermission }) {
  return (
    <DetailWrapper open data-automation="teleoptiPropertiesSVG">
      <WrappedDetailHeader text="Properties" />
      <SelectField
        name="properties.protocol"
        label="Protocol *"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        options={[{ value: 'none', label: 'none' }, { value: 'ftp', label: 'FTP' }]}
        data-automation="integrationsProtocol"
        required
      />
      <InputField
        name="properties.ftpUrl"
        label="FTP URL"
        componentType="input"
        inputType="text"
        data-automation="integrationsFtpUrl"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.ftpUsername"
        label="FTP User"
        componentType="input"
        inputType="text"
        data-automation="integrationsFtpUsername"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.ftpPassword"
        label="FTP Password"
        componentType="input"
        data-automation="integrationsFtpPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
        autoComplete={'new-password'}
      />
      <InputField
        name="properties.authKey"
        label="Auth Key"
        componentType="input"
        data-automation="integrationsAuthKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
        autoComplete={'new-password'}
      />
      <InputField
        name="properties.teleoptiUrl"
        label="Teleopti URL"
        componentType="input"
        inputType="text"
        data-automation="integrationsTeleoptiUrl"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.platformTypeId"
        label="Platform Type ID"
        componentType="input"
        inputType="text"
        data-automation="integrationsPlatformTypeId"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.sourceId"
        label="Source ID"
        componentType="input"
        inputType="text"
        data-automation="integrationsSourceId"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <ToggleField
        name="properties.multipleTenants"
        label="Multiple Tenants"
        data-automation="integrationsMultipleTenants"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </DetailWrapper>
  );
}

TeleoptiForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
