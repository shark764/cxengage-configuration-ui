/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * OutboundIdentifierListsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'cx-ui-components';

export default function OutboundIdentifierListsForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasCurrentFormPermission,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        data-automation="nameInput"
        inputType="text"
        disabled={isSaving || inherited || !userHasCurrentFormPermission}
      />
      <InputField
        name="description"
        label="Description"
        data-automation="descriptionInput"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited || !userHasCurrentFormPermission}
      />
    </form>
  );
}

OutboundIdentifierListsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasCurrentFormPermission: PropTypes.bool
};
