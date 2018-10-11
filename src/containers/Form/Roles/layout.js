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
import { DetailHeader, InputField } from 'cx-ui-components';

export default function RolesForm({ handleSubmit, isSaving, inherited, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        id="frm-roles-name"
        componentType="input"
        inputType="text"
        disabled={isSaving || inherited}
      />
      <InputField
        name="description"
        label="Description"
        id="frm-roles-description"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited}
      />
    </form>
  );
}

RolesForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};
