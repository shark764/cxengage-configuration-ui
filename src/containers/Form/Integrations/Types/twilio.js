/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TwilioForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, SelectField, InputField, ToggleField } from 'cx-ui-components';
import styled from 'styled-components';

const InlineWrapper = styled.div`
  display: inline-flex;
`;

export default function TwilioForm({ isSaving, inherited, userHasUpdatePermission, initialValues, regions }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
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
    </Fragment>
  );
}

TwilioForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  )
};
