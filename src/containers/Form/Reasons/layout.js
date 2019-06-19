/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ReasonsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, DetailsPanelAlert, InputField, ToggleField, ConfirmationWrapper } from 'cx-ui-components';

export default function ReasonsForm({
  handleSubmit,
  isSaving,
  inherited,
  key,
  disableShared,
  sharedFormValue,
  userHasUpdatePermission,
  toggleShared
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {inherited && <DetailsPanelAlert text="This Presence Reason is inherited and cannot be edited" />}
      {sharedFormValue &&
        !disableShared &&
        !inherited && (
          <DetailsPanelAlert text="You have set shared to 'enabled' for this Presence Reason. Once a Presence Reason is enabled and saved, it cannot be reverted." />
        )}
      <DetailHeader text="Details" />
      <InputField
        id="frm-reason-name"
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        id="frm-reason-external-id"
        name="externalId"
        label="External Id"
        componentType="input"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        id="frm-reason-description"
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <ConfirmationWrapper
        confirmBtnCallback={!disableShared && !sharedFormValue ? toggleShared : undefined}
        mainText={
          "Setting shared to 'enabled' for this Presence Reason. Once a Presence Reason is enabled and saved, it cannot be reverted."
        }
        secondaryText={'Are you sure you want to continue?'}
      >
        <ToggleField
          id="frm-reason-shared"
          name="shared"
          label="Shared"
          title={
            disableShared
              ? "You cannot update 'Shared' once it's set to true"
              : 'Change "Shared" state for this Presence Reason'
          }
          disabled={isSaving || inherited || disableShared || !userHasUpdatePermission}
        />
      </ConfirmationWrapper>
    </form>
  );
}

ReasonsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  disableShared: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  toggleShared: PropTypes.func
};
