/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * MonetForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';

export default function MonetForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      <InputField
        name="properties.monetUrl"
        label="URL *"
        componentType="input"
        inputType="text"
        data-automation="integrationsMonetUrl"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
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
        dataType="password"
      />
      <ToggleField
        name="properties.usernameAsAgentId"
        label="Username as Agent ID"
        data-automation="integrationsUsernameAsAgentId"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </Fragment>
  );
}

MonetForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
