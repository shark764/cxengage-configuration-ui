/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SerenovaVoiceForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import styled from 'styled-components';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function SerenovaVoiceForm({ isSaving, inherited, userHasUpdatePermission }) {
  return (
    <DetailWrapper open data-automation="serenovaVoicePropertiesSVG">
      <WrappedDetailHeader text="Properties" />
      <InputField
        name="properties.accountSid"
        label="Account SID *"
        componentType="input"
        inputType="text"
        data-automation="integrationsAccountSid"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="properties.apiKey"
        label="API Key *"
        componentType="input"
        inputType="text"
        data-automation="integrationsApiKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        maskValue
      />
    </DetailWrapper>
  );
}

SerenovaVoiceForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
