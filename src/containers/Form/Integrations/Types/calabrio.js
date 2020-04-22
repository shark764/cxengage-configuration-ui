/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CalabrioForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';

export default function CalabrioForm({
  isSaving,
  inherited,
  userHasUpdatePermission,
  initialValues,
  ctiEnabled,
  rtaEnabled
}) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
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
      <DetailHeader text="QM" />
      <ToggleField
        name="properties.ctiEnabled"
        label="Enable CTI"
        data-automation="integrationsCtiEnabled"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {ctiEnabled && (
        <InputField
          name="properties.ctiEndpoint"
          label="CTI Endpoint"
          componentType="input"
          inputType="text"
          data-automation="integrationsCtiEndpoint"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}
      <DetailHeader text="WFM" />
      <ToggleField
        name="properties.rtaEnabled"
        label="RTA"
        data-automation="integrationsRtaEnabled"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {rtaEnabled && (
        <InputField
          name="properties.rtaUrl"
          label="API URL"
          componentType="input"
          inputType="text"
          data-automation="integrationsRtaUrl"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}
    </Fragment>
  );
}

CalabrioForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  ctiEnabled: PropTypes.bool,
  rtaEnabled: PropTypes.bool
};

CalabrioForm.defaultProps = {
  ctiEnabled: false,
  rtaEnabled: false
};
