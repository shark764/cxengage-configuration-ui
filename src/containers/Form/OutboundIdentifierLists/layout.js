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
  userHasUpdatePermission,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </form>
  );
}

OutboundIdentifierListsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
