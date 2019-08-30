/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ApiKeysForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';

export default function ApiKeysForm({ handleSubmit, isSaving, inherited, userHasUpdatePermission, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        placeholder="You are using Hygen!"
        data-automation="ApiKeysFormFieldName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="ApiKeysFormFieldDescription"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <DetailHeader text="Properties" />
      <SelectField
        name="type"
        label="Type *"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        options={[
          {
            label: 'custom label',
            value: 'custom value'
          }
        ]}
        data-automation="ApiKeysFormFieldType"
        required
      />
    </form>
  );
}

ApiKeysForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
