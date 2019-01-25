---
to: src/containers/Form/<%= Name %>/layout.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * <%= Name %>Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';

export default function <%= Name %>Form({ handleSubmit, isSaving, inherited, userHasUpdatePermission, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        placeholder="You are using Hygen!"
        className="frm-<%= kebabName %>-name"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        className="frm-<%= kebabName %>-description"
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
        className="frm-<%= kebabName %>-type"
        required
      />
    </form>
  );
}

<%= Name %>Form.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
