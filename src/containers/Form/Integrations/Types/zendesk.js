/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ZendeskForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';

export default function ZendeskForm({ isSaving, inherited, userHasUpdatePermission, initialValues, workItems }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      <InputField
        name="properties.username"
        label="Username *"
        componentType="input"
        inputType="text"
        data-automation="integrationsUsername"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.password"
        label="Password *"
        componentType="input"
        inputType="text"
        data-automation="integrationsPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        maskValue
      />
      <InputField
        name="properties.endpointPrefix"
        label="API URI *"
        componentType="input"
        inputType="text"
        data-automation="integrationsEndpointPrefix"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <ToggleField
        name="properties.workItems"
        label="Work Items"
        data-automation="integrationsWorkItems"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {workItems && (
        <InputField
          name="properties.interactionFieldId"
          label="Zendesk Interaction Field ID *"
          componentType="input"
          inputType="text"
          data-automation="integrationsInteractionFieldId"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}
    </Fragment>
  );
}

ZendeskForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  workItems: PropTypes.bool
};

ZendeskForm.defaultProps = {
  workItems: false
};
