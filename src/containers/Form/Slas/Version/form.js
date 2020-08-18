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
import { FormSection } from 'redux-form/immutable';
import { InputField, RadioGroupField } from 'cx-ui-components';

export default class InitialVersionForm extends FormSection {
  render() {
    const { isSaving, viewOnly, slaAbandonType } = this.props;
    return (
      <Fragment>
        <InputField
          name="versionName"
          label="Name *"
          data-automation="subEntityFormNameInput"
          componentType="input"
          inputType="text"
          disabled={isSaving || viewOnly}
        />
        <InputField
          name="versionDescription"
          label="Description"
          data-automation="subEntityFormDescriptionInput"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || viewOnly}
        />
        <InputField
          name="slaThreshold"
          label="SLA Threshold"
          data-automation="thresholdInput"
          labelHelpText="(seconds)"
          inputType="text"
          disabled={isSaving || viewOnly}
          componentType="input"
          dataType="number"
        />
        <RadioGroupField
          name="abandonType"
          label="SLA Abandon Type"
          data-automation="abandonTypeRadio"
          disabled={isSaving || viewOnly}
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
        {slaAbandonType === 'ignore-abandons' && (
          <InputField
            name="abandonThreshold"
            label="Abandon Threshold"
            data-automation="abandonThresholdInput"
            labelHelpText="(seconds)"
            inputType="text"
            disabled={isSaving || viewOnly}
            componentType="input"
            dataType="number"
          />
        )}
      </Fragment>
    );
  }
}

InitialVersionForm.propTypes = {
  name: PropTypes.string,
  isSaving: PropTypes.bool,
  slaAbandonType: PropTypes.string,
  viewOnly: PropTypes.bool
};

InitialVersionForm.defaultProps = {
  name: 'initialVersion'
};
