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
import { DetailHeader, InputField, ToggleField, ConfirmationWrapper } from 'cx-ui-components';

export default function RolesForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  disableShared,
  sharedFormValue,
  toggleShared,
  isSystemRole
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        id="frm-roles-name"
        data-automation="nameInput"
        componentType="input"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission || isSystemRole}
      />
      <InputField
        name="description"
        label="Description"
        id="frm-roles-description"
        data-automation="descriptionInput"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission || isSystemRole}
      />

      <ConfirmationWrapper
        confirmBtnCallback={!inherited && !isSystemRole && disableShared && sharedFormValue ? toggleShared : undefined}
        mainText={
          'If you unshare this role it will become unavailable for all child tenants and any users with this role assigned to them may lose permissions granted by this role and may lose the ability to access the platform or specific features granted by this role.'
        }
        secondaryText={'Are you sure you want to continue?'}
      >
        <ToggleField
          name="shared"
          label="Shared"
          data-automation="sharedToggle"
          title="Change &quot;Shared&quot; state for this Role"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      </ConfirmationWrapper>
    </form>
  );
}

RolesForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  disableShared: PropTypes.bool,
  toggleShared: PropTypes.func,
  isSystemRole: PropTypes.bool
};
