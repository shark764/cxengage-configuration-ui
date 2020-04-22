/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * VerintForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';

export default function VerintForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  return (
    <Fragment>
      <DetailHeader text="(S)FTP" />
      <InputField
        name="properties.sftpPort"
        label="IP/Port *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSftpPort"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="number"
      />
      <InputField
        name="properties.sftpHost"
        label="(S)FTP Address *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSftpHost"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.sftpUsername"
        label="(S)FTP Username *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSftpUsername"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.sftpPassword"
        label="(S)FTP Password *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSftpPassword"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        dataType="password"
      />
      <DetailHeader text="User Sync" />
      <InputField
        name="properties.orgName"
        label="Verint Organization Name *"
        componentType="input"
        inputType="text"
        data-automation="integrationsOrgName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <ToggleField
        name="properties.multipleTenants"
        label="Sync Platform User ID?"
        data-automation="integrationsMultipleTenants"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.dataSourceName"
        label="Data Source Name *"
        componentType="input"
        inputType="text"
        data-automation="integrationsDataSourceName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <DetailHeader text="WFM" />
      <ToggleField
        name="properties.scorecardsEnabled"
        label="Enable Scorecards"
        data-automation="integrationsScorecardsEnabled"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <ToggleField
        name="properties.historicalEnabled"
        label="Enable Historical WFM Data?"
        data-automation="integrationsHistoricalEnabled"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </Fragment>
  );
}

VerintForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
