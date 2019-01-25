/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FlowsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader } from 'cx-ui-components';
import { InputField } from 'cx-ui-components';
import { SelectField } from 'cx-ui-components';

export default function FlowsForm({ handleSubmit, isSaving, userHasUpdatePermission, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField name="name" label="Name *" componentType="input" inputType="text" disabled={isSaving || !userHasUpdatePermission} />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || !userHasUpdatePermission}
      />
      <DetailHeader text="Properties" />
      <SelectField
        name="type"
        label="Type *"
        disabled={isSaving || !userHasUpdatePermission}
        options={[
          {
            label: 'customer',
            value: 'customer'
          },
          {
            label: 'resource',
            value: 'resource'
          },
          {
            label: 'reusable',
            value: 'reusable'
          }
        ]}
        required
      />
    </form>
  );
}

FlowsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
};
