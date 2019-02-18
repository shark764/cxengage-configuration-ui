/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DispatchMappingsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';

export default function DispatchMappingsForm({
  mappingValue,
  flowIds,
  integrationElements,
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        automation="dispatchMappingsFormFieldName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        automation="dispatchMappingsFormFieldDescription"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <SelectField
        name="channelType"
        label="Interaction Type *"
        automation="dispatchMappingsFormFieldChannelType"
        required={true}
        options={[
          { value: 'any', label: 'Any' },
          { value: 'voice', label: 'Voice' },
          { value: 'sms', label: 'Sms' },
          { value: 'email', label: 'Email' },
          { value: 'messaging', label: 'Messaging' },
          { value: 'work-item', label: 'Work Item' }
        ]}
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <SelectField
        name="interactionField"
        label="Mapping *"
        automation="dispatchMappingsFormFieldInteractionField"
        required={true}
        options={[
          { value: 'customer', label: 'Customer' },
          { value: 'contact-point', label: 'Contact Point' },
          { value: 'source', label: 'Integration' },
          { value: 'direction', label: 'Direction' }
        ]}
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {mappingValue === 'source' && (
        <SelectField
          name="value"
          automation="dispatchMappingsFormFieldValue"
          required={true}
          label="Integration *"
          options={integrationElements}
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}

      {mappingValue === 'direction' && (
        <SelectField
          name="value"
          automation="dispatchMappingsFormFieldValue"
          label="Direction *"
          required={true}
          options={[
            { value: 'inbound', label: 'Inbound' },
            { value: 'outbound', label: 'Outbound' },
            { value: 'agent-initiated', label: 'Agent Initiated' }
          ]}
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}

      {(mappingValue === 'customer' || mappingValue === 'contact-point') && (
        <InputField
          name="value"
          label="Mapping Value *"
          automation="dispatchMappingsFormFieldValue"
          componentType="input"
          inputType="text"
          className="frm-dispatch-mappings-name"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}
      <SelectField
        name="flowId"
        label="Dispatch to flow *"
        required={true}
        automation="dispatchMappingsFormFieldFlowId"
        options={flowIds}
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </form>
  );
}

DispatchMappingsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  flowIds: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  integrationElements: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  mappingValue: PropTypes.string
};
