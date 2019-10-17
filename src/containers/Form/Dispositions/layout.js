/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DispositionsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';

export default function DispositionsForm({ handleSubmit, isSaving, inherited, userHasUpdatePermission, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        placeholder="Please enter a name.."
        data-automation="nameInput"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="externalid"
        label="External ID"
        componentType="input"
        data-automation="externalIdInput"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="descriptionInput"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <ToggleField
        name="shared"
        label="Shared"
        id="frm-lists-shared"
        data-automation="sharedToggle"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </form>
  );
}

DispositionsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
