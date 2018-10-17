/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CustomMetricsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader } from 'cx-ui-components';
import { InputField } from 'cx-ui-components';
import { RadioGroupField } from 'cx-ui-components';

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
      <DetailHeader text="Details" />
      <Fragment>
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      </Fragment>
      <DetailHeader text="Properties" />
      <Fragment>
        <InputField
          name="slaThreshold"
          label="SLA Threshold"
          labelHelpText="(seconds)"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
          componentType="input"
          dataType="number"
        />
        <RadioGroupField
          name="slaAbandonType"
          label="SLA Abandon Type"
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
            labelHelpText="(seconds)"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            componentType="input"
            dataType="number"
          />
        )}
      </Fragment>
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
