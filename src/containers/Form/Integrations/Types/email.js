/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * EmailForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import styled from 'styled-components';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function EmailForm({ isSaving, inherited, userHasUpdatePermission }) {
  return (
    <DetailWrapper open data-automation="emailPropertiesSVG">
      <WrappedDetailHeader text="Properties" />
      <InputField
        name="properties.incomingType"
        label="Incoming Protocol *"
        componentType="input"
        inputType="text"
        data-automation="integrationsIncomingType"
        disabled
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
        data-automation="integrationsSmtpPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
        autoComplete={'new-password'}
      />
    </DetailWrapper>
  );
}

EmailForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
