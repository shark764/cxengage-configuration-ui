/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * RestForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import styled from 'styled-components';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function RestForm({ isSaving, inherited, userHasUpdatePermission, authType }) {
  return (
    <DetailWrapper open data-automation="restPropertiesSVG">
      <WrappedDetailHeader text="Properties" />
      <SelectField
        name="authType"
        label="Authentication Method. *"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        options={[
          { value: 'basic', label: 'Basic Authentication' },
          { value: 'token', label: 'Token Authentication' },
          { value: 'noAuth', label: 'No Authentication' }
        ]}
        data-automation="integrationsAuthType"
        required
      />
      <InputField
        name="properties.endpointPrefix"
        label="API URI *"
        componentType="input"
        inputType="text"
        data-automation="integrationsEndpointPrefix"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {authType === 'basic' && (
        <React.Fragment>
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
        </React.Fragment>
      )}
      {authType === 'token' && (
        <InputField
          name="properties.token"
          label="Token *"
          componentType="input"
          inputType="text"
          data-automation="integrationsToken"
          disabled={isSaving || inherited || !userHasUpdatePermission}
          type="password"
          autoComplete={'new-password'}
        />
      )}
    </DetailWrapper>
  );
}

RestForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  authType: PropTypes.string
};

RestForm.defaultProps = {
  authType: 'noAuth'
};
