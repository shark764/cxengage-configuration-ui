/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TeleoptiForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField, ToggleField } from 'cx-ui-components';

export default function TeleoptiForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
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
        inputType="text"
        data-automation="integrationsFtpPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        maskValue
      />
      <InputField
        name="properties.authKey"
        label="Auth Key"
        componentType="input"
        inputType="text"
        data-automation="integrationsAuthKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        maskValue
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
    </Fragment>
  );
}

TeleoptiForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
