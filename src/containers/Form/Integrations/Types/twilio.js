/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TwilioForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, SelectField, InputField, ToggleField } from 'cx-ui-components';
import styled from 'styled-components';
import DetailWrapper from '../../../../components/DetailWrapper';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const InlineWrapper = styled.div`
  display: inline-flex;
`;

const GlobalDialSettingsContainer = styled.div`
  display: flex;
`;

const Label = styled.label`
  display: inline-block;
  font-size: 13px;
  margin-top: 10px;
`;

export default function TwilioForm({
  isSaving,
  inherited,
  userHasUpdatePermission,
  regions,
  sidePanelUpdatePermissions
}) {
  return (
    <DetailWrapper open data-automation="twilioPropertiesSVG">
      <WrappedDetailHeader text="Properties" />
      <InputField
        name="properties.accountSid"
        label="Account SID *"
        componentType="input"
        inputType="text"
        data-automation="integrationsAccountSid"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.authToken"
        label="Auth Token *"
        componentType="input"
        inputType="text"
        data-automation="integrationsAuthToken"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
      />
      <InlineWrapper>
        <SelectField
          name="properties.region"
          label="Default Region *"
          disabled={isSaving || inherited || !userHasUpdatePermission}
          options={regions}
          data-automation="integrationsRegion"
          required
        />
        <ToggleField
          name="properties.forceRegion"
          label="Forced"
          data-automation="integrationsForceRegion"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      </InlineWrapper>
      <ToggleField
        name="properties.webRtc"
        label="WebRTC"
        data-automation="integrationsWebRtc"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <DetailHeader text="Global Dial Settings" />
      <GlobalDialSettingsContainer>
        <InputField
          name="properties.extensionPrefix"
          label="Extension Prefix"
          labelWidth="auto"
          componentType="input"
          inputType="text"
          data-automation="integrationsExtensionPrefix"
          disabled={
            isSaving || inherited || !userHasUpdatePermission || !sidePanelUpdatePermissions.twilioGlobalDialParams
          }
        />
        <Label>example: 12345#+15551234567</Label>
      </GlobalDialSettingsContainer>
    </DetailWrapper>
  );
}

TwilioForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  sidePanelUpdatePermissions: PropTypes.object
};
