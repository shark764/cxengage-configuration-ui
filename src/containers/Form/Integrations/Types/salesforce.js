/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SalesforceForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField, DetailsPanelMessage } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import styled from 'styled-components';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function SalesforceForm({ isSaving, inherited, userHasUpdatePermission }) {
  return (
    <DetailWrapper open data-automation="salesforc(S)FTPSVG">
      <WrappedDetailHeader text="(S)FTP" />
      <InputField
        name="properties.username"
        label="Username *"
        componentType="input"
        inputType="text"
        data-automation="integrationsUsername"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.password"
        label="Password *"
        componentType="input"
        inputType="text"
        data-automation="integrationsPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
      />
      <InputField
        name="properties.consumerKey"
        label="Consumer Key *"
        componentType="input"
        inputType="text"
        data-automation="integrationsConsumerKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.consumerSecret"
        label="Consumer Secret *"
        componentType="input"
        inputType="text"
        data-automation="integrationsConsumerSecret"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
        autoComplete={'new-password'}
      />
      <InputField
        name="properties.securityToken"
        label="Security Token *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSecurityToken"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
        autoComplete={'new-password'}
      />
      <InputField
        name="properties.loginUrl"
        label="Login URL"
        componentType="input"
        inputType="text"
        data-automation="integrationsLoginUrl"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <ToggleField
        name="properties.pushEnabled"
        label="Activity Records"
        data-automation="integrationsPushEnabled"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />

      <DetailsPanelMessage
        text={`If Login URL is left blank, you will be defaulted to Salesforce Production URL.`}
        type="warning"
      />
    </DetailWrapper>
  );
}

SalesforceForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
