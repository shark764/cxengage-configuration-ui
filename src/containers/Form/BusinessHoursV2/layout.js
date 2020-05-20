/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * BusinessHoursV2Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InputField, ConfirmationWrapper, ToggleField, SelectField } from 'cx-ui-components';

export default function BusinessHoursV2Form({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  userHasSharePermission,
  initialValues,
  sharedFormValue,
  toggleShared,
  versions
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        data-automation="BusinessHoursV2FormFieldName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="BusinessHoursV2FormFieldDescription"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {initialValues.get('id') && (
        <SelectField
          name="activeVersion"
          label="Active Version"
          placeholder="Select a version..."
          options={versions}
          data-automation="businessHourV2sActiveVersion"
          disabled={
            isSaving ||
            inherited ||
            !userHasUpdatePermission ||
            !versions ||
            versions.length === 0 ||
            versions.size === 0 ||
            !userHasUpdatePermission
          }
        />
      )}
      <ConfirmationWrapper
        confirmBtnCallback={
          !inherited &&
          userHasSharePermission &&
          sharedFormValue &&
          initialValues.get('shared') &&
          initialValues.get('id')
            ? toggleShared
            : undefined
        }
        mainText={`If you unshare this Business Hour it will become unavailable for all child tenants and it flows using this business hours rule on child tenants may become unusable.`}
        secondaryText={'Are you sure you want to continue?'}
        data-automation="toggleSharedConfirmationWrapper"
      >
        <ToggleField
          name="shared"
          label="Shared"
          data-automation="sharedToggle"
          title="Change &quot;Shared&quot; state for this Businees Hour"
          disabled={isSaving || inherited || !userHasUpdatePermission || !userHasSharePermission}
        />
      </ConfirmationWrapper>
    </form>
  );
}

BusinessHoursV2Form.propTypes = {
  initialValues: PropTypes.object,
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  toggleShared: PropTypes.func,
  sharedFormValue: PropTypes.bool,
  versions: PropTypes.array
};
