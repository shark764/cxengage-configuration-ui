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
  userHasSharePermission,
  userHasViewPermission,
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
        disabled={isSaving || inherited || !userHasUpdatePermission || isSystemRole || (!userHasUpdatePermission && userHasViewPermission)}
      />
      <InputField
        name="description"
        label="Description"
        id="frm-roles-description"
        data-automation="descriptionInput"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission || isSystemRole || (!userHasUpdatePermission && userHasViewPermission)}
      />

      <ConfirmationWrapper
        confirmBtnCallback={
          !inherited && !isSystemRole && disableShared && sharedFormValue && userHasSharePermission
            ? toggleShared
            : undefined
        }
        mainText={
          'If you unshare this role it will become unavailable for all child tenants and any users with this role assigned to them may lose permissions granted by this role and may lose the ability to access the platform or specific features granted by this role.'
        }
        secondaryText={'Are you sure you want to continue?'}
        data-automation="toggleSharedConfirmationWrapper"
      >
        <ToggleField
          name="shared"
          label="Shared"
          data-automation="sharedToggle"
          title="Change &quot;Shared&quot; state for this Role"
          disabled={isSaving || inherited || !userHasUpdatePermission || !userHasSharePermission || isSystemRole || (!userHasUpdatePermission && userHasViewPermission)
          }
        />
      </ConfirmationWrapper>
    </form>
  );
}

RolesForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  disableShared: PropTypes.bool,
  toggleShared: PropTypes.func,
  isSystemRole: PropTypes.bool
};
