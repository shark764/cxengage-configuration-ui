/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * InitialVersionForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputField, RadioGroupField } from 'cx-ui-components';

export default function InitialVersionForm(props) {
  return (
    <Fragment>
      <InputField
        name="versionName"
        label="Name *"
        data-automation="nameInput"
        componentType="input"
        inputType="text"
        disabled={props.isSaving || props.viewOnly}
      />
      <InputField
        name="versionDescription"
        label="Description"
        data-automation="descriptionInput"
        componentType="textarea"
        inputType="text"
        disabled={props.isSaving || props.viewOnly}
      />
      <InputField
        name="slaThreshold"
        label="SLA Threshold"
        data-automation="thresholdInput"
        labelHelpText="(seconds)"
        inputType="text"
        disabled={props.isSaving || props.viewOnly}
        componentType="input"
        dataType="number"
      />
      <RadioGroupField
        name="abandonType"
        label="SLA Abandon Type"
        data-automation="abandonTypeChoose"
        disabled={props.isSaving || props.viewOnly}
        options={[
          {
            label: 'Ignore Abandons',
            value: 'ignore-abandons',
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
      {props.slaAbandonType === 'ignore-abandons' && (
        <InputField
          name="abandonThreshold"
          label="Abandon Threshold"
          data-automation="abandonThresholdInput"
          labelHelpText="(seconds)"
          inputType="text"
          disabled={props.isSaving || props.viewOnly}
          componentType="input"
          dataType="number"
        />
      )}
    </Fragment>
  );
}

InitialVersionForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  slaAbandonType: PropTypes.string,
  viewOnly: PropTypes.bool
};
