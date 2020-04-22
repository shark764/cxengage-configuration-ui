/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * BirstForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';

export default function BirstForm({ isSaving, inherited, userHasUpdatePermission }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      <InputField
        name="properties.birstBaseUrl"
        label="Base URL *"
        componentType="input"
        inputType="text"
        data-automation="integrationsBirstBaseUrl"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.birstAdminUsername"
        label="Admin Username *"
        componentType="input"
        inputType="text"
        data-automation="integrationsBirstAdminUsername"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.birstAdminPassword"
        label="Admin Password *"
        componentType="input"
        inputType="text"
        data-automation="integrationsBirstAdminPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="password"
      />
      <InputField
        name="properties.birstDashboardVersion"
        label="Dashboard Version *"
        componentType="input"
        inputType="text"
        data-automation="integrationsBirstDashboardVersion"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.birstSpaceId"
        label="Space ID *"
        componentType="input"
        inputType="text"
        data-automation="integrationsBirstSpaceId"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.birstSsoPassword"
        label="SSO Password *"
        componentType="input"
        inputType="text"
        data-automation="integrationsBirstSsoPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="password"
      />
    </Fragment>
  );
}

BirstForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
