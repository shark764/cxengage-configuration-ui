/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * LambdaForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';

export default function LambdaForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      <InputField
        name="properties.accessKey"
        label="Access Key *"
        componentType="input"
        inputType="text"
        data-automation="integrationsAccessKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        maskValue
      />
      <InputField
        name="properties.secretKey"
        label="Secret Key *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSecretKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        maskValue
      />
    </Fragment>
  );
}

LambdaForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
