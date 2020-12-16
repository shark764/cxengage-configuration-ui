/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CapacityRulesForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';

export default function CapacityRulesForm({ handleSubmit, isSaving, inherited, userHasUpdatePermission, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        placeholder="Name"
        data-automation="CapacityRulesFormFieldName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="CapacityRulesFormFieldDescription"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </form>
  );
}

CapacityRulesForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
};
