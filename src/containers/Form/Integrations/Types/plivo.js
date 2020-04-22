/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * PlivoForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';

export default function PlivoForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      <InputField
        name="properties.authId"
        label="Auth ID *"
        componentType="input"
        inputType="text"
        data-automation="integrationsAuthId"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.authToken"
        label="Auth Token *"
        componentType="input"
        inputType="password"
        data-automation="integrationsAuthToken"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="password"
      />
      <ToggleField
        name="properties.webRtc"
        label="WebRTC"
        data-automation="integrationsWebRtc"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </Fragment>
  );
}

PlivoForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
