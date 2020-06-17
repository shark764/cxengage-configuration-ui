/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * IntegrationListenerForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';

export default function IntegrationListenerForm({ isSaving, integrationType }) {
  return (
    <Fragment>
      <DetailHeader text="Properties" />
      {integrationType === 'email' && (
        <Fragment>
          <InputField
            name="properties.email"
            label="Email *"
            componentType="input"
            inputType="text"
            data-automation="integrationsListenersEmail"
            disabled={isSaving}
          />
          <InputField
            name="properties.password"
            label="Password *"
            componentType="input"
            inputType="text"
            data-automation="integrationsListenersPassword"
            disabled={isSaving}
            maskValue
          />
        </Fragment>
      )}
      {integrationType === 'facebook' && (
        <Fragment>
          <InputField
            name="properties.pageToken"
            label="Page Token *"
            componentType="input"
            inputType="text"
            data-automation="integrationsListenersPageToken"
            disabled={isSaving}
          />
          <InputField
            name="properties.pageId"
            label="Page ID *"
            componentType="input"
            inputType="text"
            data-automation="integrationsListenersPageId"
            disabled={isSaving}
          />
        </Fragment>
      )}
      {integrationType === 'salesforce' && (
        <Fragment>
          <InputField
            name="properties.topic"
            label="Topic *"
            componentType="input"
            inputType="text"
            data-automation="integrationsListenersTopic"
            disabled={isSaving}
          />
          <InputField
            name="properties.type"
            label="Type *"
            componentType="input"
            inputType="text"
            data-automation="integrationsListenersType"
            disabled={isSaving}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

IntegrationListenerForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  integrationType: PropTypes.string
};
