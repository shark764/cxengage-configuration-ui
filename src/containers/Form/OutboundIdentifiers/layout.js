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
import { InputField, SelectField } from 'cx-ui-components';

export default function OutboundIdentifiersForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  channelType,
  flowIds,
  flowsFetching,
  initialValues,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <div>
        <InputField
          name="name"
          label="Name *"
          data-automation="nameInput"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
        <SelectField
          name="channelType"
          label="Channel Type *"
          data-automation="channelList"
          options={[
            { value: 'voice', label: 'Voice' },
            { value: 'sms', label: 'Sms' },
            { value: 'email', label: 'Email' }
          ]}
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
        {channelType && (
          <InputField
            name="value"
            label="Value *"
            componentType="input"
            data-automation="valueInput"
            inputType="text"
            placeholder={`Enter${channelType === 'email' ? ' an email address' : ' a e.164 formatted number'}`}
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
        )}
        <SelectField
          name="flowId"
          label="Flow Id *"
          required={initialValues.get('id') !== undefined}
          data-automation="flowList"
          options={!flowsFetching ? flowIds : undefined}
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          data-automation="descriptionInput"
          automation="outboundIdentifiersFormFieldDescription"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
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
  userHasUpdatePermission: PropTypes.bool,
  initialValues: PropTypes.object,
  flowsFetching: PropTypes.bool,
  flowIds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.object
  ]),
  channelType: PropTypes.string
};

OutboundIdentifiersForm.defaultProps = {
  flowIds: []
};
