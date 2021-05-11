/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FacebookIntegrationsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, DetailsPanelMessage, InputField, SelectField, Detail } from 'cx-ui-components';

export default function FacebookIntegrationsForm({
  initialValues,
  key,
  handleSubmit,
  isSaving,
  userHasUpdatePermission,
  digitalChannelsAppsFetching,
  digitalChannelsAppIds,
  app,
}) {
  const isDisabled = isSaving || !userHasUpdatePermission;
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        placeholder="Enter a name..."
        data-automation="nameInput"
        disabled={isDisabled}
        required
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        placeholder="Enter a description..."
        data-automation="descriptionInput"
        disabled={isDisabled}
      />
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

      <DetailHeader text="Properties" />
      {!initialValues ? (
        <SelectField
          name="appId"
          label="App Id *"
          data-automation="appIdList"
          options={!digitalChannelsAppsFetching ? digitalChannelsAppIds : undefined}
          disabled={isDisabled}
        />
      ) : (
        <Fragment>
          <Detail label="App" value={app && app.get('name')} />
          <Detail label="App Id" value={app && app.get('id')} />
        </Fragment>
      )}
      {!initialValues ? (
        <InputField
          name="facebookAppId"
          label="Facebook App Id *"
          componentType="input"
          inputType="text"
          placeholder="Enter the facebook app id..."
          data-automation="appIdInput"
          disabled={isDisabled}
        />
      ) : (
        <Detail label="Facebook App Id *" value={initialValues.get('facebookAppId')} />
      )}
      <InputField
        name="facebookAppSecret"
        label={!initialValues ? "Facebook App Secret *" : "Facebook App Secret" }
        componentType="input"
        inputType="text"
        placeholder="Enter the facebook app secret..."
        data-automation="appSecretInput"
        disabled={isDisabled}
      />
      {!initialValues ? (
        <InputField
          name="facebookPageId"
          label="Facebook Page Id *"
          componentType="input"
          inputType="text"
          placeholder="Enter the id of your facebook page..."
          data-automation="pageIdInput"
          disabled={isDisabled}
        />
      ) : (
        <Detail label="Facebook Page Id *" value={initialValues.get('facebookPageId')} />
      )}
      <InputField
        name="facebookUserAccessToken"
        label={!initialValues ? "Facebook User Access Token *" : "Facebook User Access Token" }
        componentType="input"
        inputType="text"
        placeholder="Enter the access token of your facebook user..."
        data-automation="userAccessTokenInput"
        disabled={isDisabled}
      />
      {initialValues &&
        <DetailsPanelMessage
          text={`Facebook App Secret is required to update the User Access Token`}
          type="warning"
        />
      }
    </form>
  );
}

FacebookIntegrationsForm.propTypes = {
  initialValues: PropTypes.object,
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  digitalChannelsAppsFetching: PropTypes.bool,
  digitalChannelsAppIds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.object
  ]),
  app: PropTypes.object,
};
