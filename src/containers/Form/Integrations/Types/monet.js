/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * MonetForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import styled from 'styled-components';

export default function MonetForm({ isSaving, inherited, userHasUpdatePermission, initialValues }) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const WrappedDetailHeader = styled(DetailHeader)`
    margin-left: 35px;
  `;

  return (
    <Wrapper>
      <DetailWrapper open data-automation="monetPropertiesSVG">
        <WrappedDetailHeader text="Properties" />
        <InputField
          name="properties.monetUrl"
          label="URL *"
          componentType="input"
          inputType="text"
          data-automation="integrationsMonetUrl"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
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
        <ToggleField
          name="properties.usernameAsAgentId"
          label="Username as Agent ID"
          data-automation="integrationsUsernameAsAgentId"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      </DetailWrapper>
    </Wrapper>
  );
}

MonetForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};
