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

export default function ClientForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  const WrappedDetailHeader = styled(DetailHeader)`
    margin-left: 35px;
  `;

  return (
    <DetailWrapper open={true} data-automation="clientPropertiesSVG">
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
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
