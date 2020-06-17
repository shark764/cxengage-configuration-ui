/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * RestForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';

export default function RestForm({ isSaving, inherited, userHasUpdatePermission, initialValues, authType }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      <SelectField
        name="authType"
        label="Authentication Method. *"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        options={[
          { value: 'basic', label: 'Basic Authentication' },
          { value: 'token', label: 'Token Authentication' },
          { value: 'noAuth', label: 'No Authentication' }
        ]}
        data-automation="integrationsAuthType"
        required
      />
      <InputField
        name="properties.endpointPrefix"
        label="API URI *"
        componentType="input"
        inputType="text"
        data-automation="integrationsEndpointPrefix"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {authType === 'basic' && (
        <Fragment>
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
            maskValue
          />
        </Fragment>
      )}
      {authType === 'token' && (
        <InputField
          name="properties.token"
          label="Token *"
          componentType="input"
          inputType="text"
          data-automation="integrationsToken"
          disabled={isSaving || inherited || !userHasUpdatePermission}
          maskValue
        />
      )}
    </Fragment>
  );
}

RestForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  authType: PropTypes.string
};

RestForm.defaultProps = {
  authType: 'noAuth'
};
