/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DispatchMappingsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField, DetailsPanelAlert, DetailsPanelMessage } from 'cx-ui-components';
import styled from 'styled-components';

const PanelMessage = styled(DetailsPanelMessage)`
  padding-top: 0;
  & p {
    font-size: 12px;
  }
`;

export default function DispatchMappingsForm({
  mappingValue,
  flowIds,
  integrationElements,
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  flowVersions,
  flowsFetching,
  initialValues,
  flowId,
  mappingValueMessage,
  isMappingValueInvalid
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {inherited && <DetailsPanelAlert text="This Dispatch Mapping is inherited and cannot be edited" />}
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        data-automation="nameInput"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="descriptionInput"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <SelectField
        name="channelType"
        label="Interaction Type *"
        data-automation="interactionList"
        required
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
        data-automation="mappingList"
        required
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
          data-automation="integrationList"
          required
          label="Integration *"
          options={integrationElements}
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}

      {mappingValue === 'direction' && (
        <SelectField
          name="value"
          data-automation="directionList"
          label="Direction *"
          required
          options={[
            { value: 'inbound', label: 'Inbound' },
            { value: 'outbound', label: 'Outbound' },
            { value: 'agent-initiated', label: 'Agent Initiated' }
          ]}
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}

      {(mappingValue === 'customer' || mappingValue === 'contact-point') && (
        <Fragment>
          <InputField
            name="value"
            label="Mapping Value *"
            data-automation="phoneValueInput"
            componentType="input"
            inputType="text"
            className="frm-dispatch-mappings-name"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            placeholder={mappingValueMessage}
          />
          {isMappingValueInvalid && (
            <PanelMessage text={`Warning: Not a valid E.164 formatted phone number or SIP address.`} type="error" />
          )}
        </Fragment>
      )}
      <SelectField
        name="flowId"
        label="Dispatch to flow *"
        required={initialValues.get('id') !== undefined}
        data-automation="flowList"
        options={!flowsFetching ? flowIds : undefined}
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {flowId && (
        <SelectField
          name="version"
          label="Flow Version *"
          required={initialValues.get('id') !== undefined}
          data-automation="flowVersionList"
          options={!flowsFetching ? flowVersions : undefined}
          disabled={isSaving || inherited || !userHasUpdatePermission || flowsFetching || !flowId}
        />
      )}
    </form>
  );
}

DispatchMappingsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  flowIds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.object
  ]),
  integrationElements: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  flowVersions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.object
  ]),
  mappingValue: PropTypes.string,
  flowsFetching: PropTypes.bool,
  initialValues: PropTypes.object,
  flowId: PropTypes.string,
  mappingValueMessage: PropTypes.string,
  isMappingValueInvalid: PropTypes.bool
};
