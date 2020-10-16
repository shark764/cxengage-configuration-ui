/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ZendeskForm
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

export default function ZendeskForm({ isSaving, inherited, userHasUpdatePermission, workItems }) {
  return (
    <DetailWrapper open data-automation="zendeskPropertiesSVG">
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
    </DetailWrapper>
  );
}

ZendeskForm.propTypes = {
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  workItems: PropTypes.bool
};

ZendeskForm.defaultProps = {
  workItems: false
};
