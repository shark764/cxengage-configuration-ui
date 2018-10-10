/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * RolesForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'cx-ui-components';

export function RolesFormLayout({ handleSubmit, isSaving, inherited, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <InputField name="name" label="Name *" componentType="input" inputType="text" disabled={isSaving || inherited} />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited}
      />
    </form>
  );
}

RolesFormLayout.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};
