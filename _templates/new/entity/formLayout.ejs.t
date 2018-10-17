---
to: src/containers/Form/<%= name %>/layout.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * <%= name %>Form
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader } from 'cx-ui-components';
import { InputField } from 'cx-ui-components';
import { SelectField } from 'cx-ui-components';

export default function <%= name %>Form({
  handleSubmit,
  isSaving,
  inherited,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <Fragment>
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || inherited}
        />
        <SelectField
          name="type"
          label="Type *"
          disabled={isSaving || inherited}
          options={[
            {
              label: 'custom label',
              value: 'custom value'
            }
          ]}
          required
        />
      </Fragment>
    </form>
  );
}

<%= name %>Form.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};
