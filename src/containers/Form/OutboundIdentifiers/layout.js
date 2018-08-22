/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * OutboundIdentifiersForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'cx-ui-components';
import { SelectField } from 'cx-ui-components';

export default function OutboundIdentifiersForm({ handleSubmit, isSaving, inherited, flowIds, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <div>
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited}
        />
        <InputField
          name="value"
          label="Value *"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited}
        />
        <SelectField name="flowId" label="Flow Id *" options={flowIds} disabled={isSaving || inherited} />
        <SelectField
          name="channelType"
          label="Channel Type *"
          options={[
            { value: 'voice', label: 'Voice' },
            { value: 'sms', label: 'Sms' },
            { value: 'email', label: 'Email' }
          ]}
          disabled={isSaving || inherited}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || inherited}
        />
      </div>
    </form>
  );
}

OutboundIdentifiersForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  flowIds: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  )
};

OutboundIdentifiersForm.defaultProps = {
  flowIds: []
};
