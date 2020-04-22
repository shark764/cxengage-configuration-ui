/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * EmailForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';

export default function EmailForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      <InputField
        name="properties.incomingType"
        label="Incoming Protocol *"
        componentType="input"
        inputType="text"
        data-automation="integrationsIncomingType"
        disabled={true}
      />
      <InputField
        name="properties.imapServer"
        label="Incoming IMAP Host *"
        componentType="input"
        inputType="text"
        data-automation="integrationsImapServer"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.smtpHost"
        label="SMTP Host *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSmtpHost"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.smtpPort"
        label="SMTP Port *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSmtpPort"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="number"
      />
      <SelectField
        name="properties.smtpEncryptionType"
        label="SMTP Encryption *"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        options={[{ value: 'ssl/tls', label: 'ssl/tls' }, { value: 'starttls', label: 'starttls' }]}
        data-automation="integrationsSmtpEncryptionType"
        required
      />
      <InputField
        name="properties.smtpUser"
        label="SMTP User *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSmtpUser"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.smtpPassword"
        label="SMTP Password *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSmtpPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="password"
      />
    </Fragment>
  );
}

EmailForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
