/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SerenovaVoiceForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';

export default function SerenovaVoiceForm({ isSaving, inherited, userHasUpdatePermission }) {
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
        name="properties.apiKey"
        label="API Key *"
        componentType="input"
        inputType="text"
        data-automation="integrationsApiKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="password"
      />
    </Fragment>
  );
}

SerenovaVoiceForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
