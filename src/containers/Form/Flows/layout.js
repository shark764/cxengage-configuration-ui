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
import { DetailHeader, InputField, SelectField, DetailsPanelAlert } from 'cx-ui-components';

export default function FlowsForm({ handleSubmit, initialValues, isSaving, userHasUpdatePermission, versions, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {initialValues.get('id') !== undefined &&
        versions.length === 0 && <DetailsPanelAlert text="Must have an active version before a flow can be enabled" />}
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        automation="flowsFormFieldName"
        disabled={isSaving || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        automation="flowsFormFieldDescription"
        disabled={isSaving || !userHasUpdatePermission}
      />
      <DetailHeader text="Properties" />
      <SelectField
        name="type"
        label="Type *"
        placeholder="Select a type..."
        disabled={isSaving || !userHasUpdatePermission}
        automation="flowsFormFieldType"
        options={[
          {
            label: 'Customer',
            value: 'customer'
          },
          {
            label: 'Resource',
            value: 'resource'
          },
          {
            label: 'Reusable',
            value: 'reusable'
          }
        ]}
        required
      />
      {initialValues.get('id') !== undefined && (
        <SelectField
          name="activeVersion"
          label="Active Version *"
          placeholder="Select a version..."
          options={versions}
          automation="flowsFormFieldActiveVersion"
          disabled={isSaving || versions.length === 0 || !userHasUpdatePermission}
          required
        />
      )}
    </form>
  );
}

FlowsForm.propTypes = {
  key: PropTypes.string,
  initialValues: PropTypes.object,
  versions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};

FlowsForm.defaultProps = {
  versions: []
};
