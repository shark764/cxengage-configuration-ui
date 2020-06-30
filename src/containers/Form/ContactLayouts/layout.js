/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';

export default function ContactLayoutsForm({ key, handleSubmit, isSaving, userHasUpdatePermission }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        inputType="text"
        label="Name *"
        componentType="input"
        data-automation="nameInput"
        disabled={isSaving || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        inputType="text"
        label="Description"
        componentType="textarea"
        data-automation="descriptionInput"
        disabled={isSaving || !userHasUpdatePermission}
      />
    </form>
  );
}

ContactLayoutsForm.propTypes = {
  key: PropTypes.string,
  isSaving: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool
};
