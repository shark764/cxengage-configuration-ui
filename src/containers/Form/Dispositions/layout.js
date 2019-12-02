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
import { DetailHeader, InputField, ToggleField, ConfirmationWrapper, DetailsPanelAlert } from 'cx-ui-components';

export default function DispositionsForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  userHasSharePermission,
  key,
  disableShared,
  sharedFormValue,
  change
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {inherited && <DetailsPanelAlert text="This Disposition is inherited and cannot be edited" />}
      {sharedFormValue && !disableShared && !inherited && (
        <DetailsPanelAlert text="You have set shared to 'enabled' for this Disposition. Once a Disposition is enabled and saved, it cannot be reverted." />
      )}
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
      <ConfirmationWrapper
        confirmBtnCallback={
          !disableShared && !sharedFormValue && userHasSharePermission
            ? () => change('shared', !sharedFormValue)
            : undefined
        }
        mainText={
          "Setting shared to 'enabled' for this Disposition. Once a Disposition is enabled and saved, it cannot be reverted."
        }
        secondaryText={'Are you sure you want to continue?'}
      >
        <ToggleField
          name="shared"
          label="Shared"
          title={
            disableShared
              ? "You cannot update 'Shared' once it's set to true"
              : 'Change "Shared" state for this Disposition'
          }
          disabled={isSaving || inherited || disableShared || !userHasUpdatePermission || !userHasSharePermission}
          data-automation="sharedToggle"
        />
      </ConfirmationWrapper>
    </form>
  );
}

DispositionsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  disableShared: PropTypes.bool,
  change: PropTypes.func
};
