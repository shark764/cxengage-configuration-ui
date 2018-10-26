/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CustomMetricsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DetailHeader, InputField, RadioGroupField } from 'cx-ui-components';

import { DetailWrapper } from '../../../components/DetailWrapper';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function CustomMetricsForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  slaAbandonType,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailWrapper open={true}>
        <WrappedDetailHeader text="Details" />
        <InputField
          name="name"
          label="Name *"
          id="frm-Custom-metrics-name"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
        <InputField
          name="description"
          label="Description"
          id="frm-Custom-metrics-description"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      </DetailWrapper>
      <DetailWrapper open={true}>
        <WrappedDetailHeader text="Properties" />
        <InputField
          name="slaThreshold"
          label="SLA Threshold"
          id="frm-Custom-metrics-sla-threshold"
          labelHelpText="(seconds)"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
          componentType="input"
          dataType="number"
        />
        <RadioGroupField
          name="slaAbandonType"
          label="SLA Abandon Type"
          id="frm-Custom-metrics-sla-abandon-type"
          disabled={isSaving || inherited || !userHasUpdatePermission}
          options={[
            {
              label: 'Ignore Abandons',
              value: 'ignored-abandoned-calls',
              helpText: '(Filter Out / Exclude Short Abandons)'
            },
            {
              label: 'Count Against SLA',
              value: 'count-against-sla',
              helpText: '(Include short abandons against/in SLA)'
            }
          ]}
          required
        />
        {slaAbandonType === 'ignored-abandoned-calls' && (
          <InputField
            name="slaAbandonThreshold"
            label="Abandon Threshold"
            id="frm-Custom-metrics-sla-abandon-threshold"
            labelHelpText="(seconds)"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            componentType="input"
            dataType="number"
          />
        )}
      </DetailWrapper>
    </form>
  );
}

CustomMetricsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  slaAbandonType: PropTypes.string
};
