/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DefaultForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'cx-ui-components';

export default function DefaultForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  return (
    <Fragment>
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        placeholder="Please enter a name.."
        data-automation="integrationsName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="integrationsDescription"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </Fragment>
  );
}

DefaultForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
