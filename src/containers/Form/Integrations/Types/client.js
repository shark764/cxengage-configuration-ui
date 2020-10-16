/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ClientForm
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

export default function ClientForm({ isSaving, inherited, userHasUpdatePermission }) {
  return (
    <DetailWrapper open data-automation="clientPropertiesSVG">
      <WrappedDetailHeader text="Properties" />
      <InputField
        name="properties.accessKey"
        label="Access Key *"
        componentType="input"
        inputType="text"
        data-automation="integrationsAccessKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
      />
      <InputField
        name="properties.secretKey"
        label="Secret Key *"
        componentType="input"
        inputType="text"
        data-automation="integrationsSecretKey"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        type="password"
      />
    </DetailWrapper>
  );
}

ClientForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
