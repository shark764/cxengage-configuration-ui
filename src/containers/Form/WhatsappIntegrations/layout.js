/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

/**
 *
 * WhatsappIntegrationsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Detail, DetailHeader, DetailsPanelMessage, InputField, SelectField } from 'cx-ui-components';

export default function WhatsappIntegrationsForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  initialValues,
  whatsappApps,
  whatsappAppsFetching,
  app,
}) {
  const isDisabled = isSaving || inherited || !userHasUpdatePermission;
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        placeholder="Please enter a name..."
        data-automation="nameInput"
        disabled={isDisabled}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        placeholder="Please enter a description..."
        data-automation="descriptionInput"
        disabled={isDisabled}
      />
      {initialValues.get('id') === undefined ? (
        <SelectField
          name="whatsappId"
          label="WhatsApp Integration *"
          data-automation="whatsappIdList"
          options={!whatsappAppsFetching ? whatsappApps : undefined}
          disabled={isDisabled}
        />
      ) : (
        <>
          <Detail label="WhatsApp Integration Id" value={initialValues.get('id')} />
          <Detail label="Digital Channels App" value={app && app.get('name')} />
          <Detail label="Digital Channels App Id" value={app && app.get('id')} />
        </>
      )}
      <InputField
        name="clientDisconnectMinutes"
        label="Disconnect Time"
        data-automation="clientDisconnectMinutesInput"
        labelHelpText="(minutes)"
        inputType="text"
        disabled={isDisabled}
        componentType="input"
        dataType="number"
      />

      <DetailsPanelMessage
        text={`If Disconnect Time is left blank, the client disconnection checker will not be applied.`}
        type="info"
      />
    </form>
  );
}

WhatsappIntegrationsForm.propTypes = {
  key: PropTypes.string,
  initialValues: PropTypes.object,
  whatsappAppsFetching: PropTypes.bool,
  whatsappApps: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
      })
    ),
    PropTypes.object,
  ]),
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  app: PropTypes.object,
};
