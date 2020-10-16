/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CalabrioForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import styled from 'styled-components';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function CalabrioForm({ isSaving, inherited, userHasUpdatePermission, ctiEnabled, rtaEnabled }) {
  return (
    <DetailWrapper open={true} data-automation="calabrioPropertiesSVG">
      <WrappedDetailHeader text="Properties" />
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
        type="password"
        autoComplete={'new-password'}
      />
      <DetailHeader text="QM" />
      <ToggleField
        name="properties.ctiEnabled"
        label="Enable CTI"
        data-automation="integrationsCtiEnabled"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {ctiEnabled && (
        <InputField
          name="properties.ctiEndpoint"
          label="CTI Endpoint"
          componentType="input"
          inputType="text"
          data-automation="integrationsCtiEndpoint"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}
      <DetailHeader text="WFM" />
      <ToggleField
        name="properties.rtaEnabled"
        label="RTA"
        data-automation="integrationsRtaEnabled"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {rtaEnabled && (
        <InputField
          name="properties.rtaUrl"
          label="API URL"
          componentType="input"
          inputType="text"
          data-automation="integrationsRtaUrl"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}
    </DetailWrapper>
  );
}

CalabrioForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  ctiEnabled: PropTypes.bool,
  rtaEnabled: PropTypes.bool
};

CalabrioForm.defaultProps = {
  ctiEnabled: false,
  rtaEnabled: false
};
