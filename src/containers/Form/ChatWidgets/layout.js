/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ChatWidgetsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  InputField,
  SelectField,
  DetailHeader,
  ToggleField,
  RadioGroupField,
  ColorField,
  ListField,
  Detail
} from 'cx-ui-components';
import styled from 'styled-components';
import { isSerializedOrigin } from 'serenova-js-utils/strings';

const Error = styled.span`
  color: red;
`;
const Suggestion = styled.span`
  color: gray;
  font-style: italic;
  font-size: 12px;
  display: block;
`;
const BoldSuggestion = styled(Suggestion)`
  font-weight: bold;
`;
const error = (
  <Fragment>
    <Error>
      {`URL entered is not following 'serialized-origin' format from `}
      <a href="https://tools.ietf.org/html/rfc6454" target="_blank" rel="noopener noreferrer">
        RFC 6454
      </a>
    </Error>
    <Suggestion>The structure should follow the pattern:</Suggestion>
    <BoldSuggestion>scheme "://" host [ ":" port ], where scheme is http or https</BoldSuggestion>
    <Suggestion>Example: http://www.example.com</Suggestion>
  </Fragment>
);

export default function ChatWidgetsForm({
  handleSubmit,
  disabled,
  digitalChannelsAppsFetching,
  digitalChannelsAppIds,
  key,
  chatWidgetId,
  app,
  displayStyleIsButton
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <InputField
        name="name"
        label="Name *"
        id="chat-widget-name"
        data-automation="nameInput"
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="description"
        label="Description"
        id="chat-widget-description"
        data-automation="descriptionInput"
        componentType="textarea"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="contactPoint"
        label="Contact Point *"
        id="chat-widget-contact-point"
        data-automation="contactPointInput"
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="clientDisconnectMinutes"
        label="Client Disconnect Minutes"
        id="client-disconnect-minutes"
        data-automation="clientDisconnectInput"
        componentType="input"
        dataType="number"
        disabled={disabled}
      />
      {chatWidgetId === 'create' ? (
        <SelectField
          name="appId"
          label="App *"
          data-automation="appIdList"
          options={!digitalChannelsAppsFetching ? digitalChannelsAppIds : undefined}
          disabled={disabled}
        />
      ) : (
        <Fragment>
          <Detail label="App" value={app && app.get('name')} />
          <Detail label="App Id" value={app && app.get('id')} />
        </Fragment>
      )}

      <DetailHeader text="Branding" />

      <RadioGroupField
        className="chat-widget-display-style"
        name="displayStyle"
        label="Display Style"
        data-automation="displayStyleRadio"
        disabled={disabled}
        options={[{ label: 'Button', value: 'button' }, { label: 'Tab', value: 'tab' }]}
        required
      />
      {displayStyleIsButton && (
        <Fragment>
          <InputField
            name="buttonIconUrl"
            label="Button Icon URL"
            id="chat-widget-button-icon-url"
            data-automation="buttonIconURLInput"
            componentType="input"
            inputType="text"
            disabled={disabled}
          />
          <InputField
            name="buttonWidth"
            label="Button Width"
            id="chat-widget-button-width"
            data-automation="buttonWidthInput"
            componentType="input"
            inputType="text"
            disabled={disabled}
          />
          <InputField
            name="buttonHeight"
            label="Button Height"
            id="chat-widget-button-height"
            data-automation="buttonHeightInput"
            componentType="input"
            inputType="text"
            disabled={disabled}
          />
        </Fragment>
      )}
      <InputField
        name="businessName"
        label="Business Name"
        id="chat-widget-business-name"
        data-automation="businessNameInput"
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="businessIconUrl"
        label="Business Icon URL"
        id="chat-widget-business-icon-url"
        data-automation="businessIconURLInput"
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="backgroundImageUrl"
        label="Background Image URL"
        id="chat-widget-background-image-url"
        data-automation="backgroundImageURLInput"
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <ColorField id="chat-widget-header-color" name="brandColor" label="Brand Color" disabled={disabled} />
      <ColorField
        className="chat-widget-conversation-color"
        name="conversationColor"
        label="Conversation Color"
        disabled={disabled}
      />
      <ColorField className="chat-widget-action-color" name="actionColor" label="Action Color" disabled={disabled} />
      <ToggleField
        id="chat-widget-fixed-intro-pane"
        name="fixedIntroPane"
        label="Fixed Intro Pane"
        data-automation="fixedIntroPaneToggle"
        disabled={disabled}
      />
      <RadioGroupField
        className="chat-widget-prechat-capture"
        name="prechatCapture"
        label="Prechat Capture"
        data-automation="prechatCaptureRadio"
        disabled={disabled}
        options={[
          { label: 'Name', value: 'name' },
          { label: 'Email', value: 'email' },
          { label: 'None', value: 'none' }
        ]}
        required
      />

      <DetailHeader text="Origin Whitelist" />
      <ListField
        name="whitelistedUrls"
        label="Whitelisted URLs"
        className="chat-widget-whitelisted-urls"
        data-automation="whiteListURLInput"
        inputValidation={isSerializedOrigin}
        inputError={error}
      />
    </form>
  );
}

ChatWidgetsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  chatWidgetId: PropTypes.string,
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
  displayStyleIsButton: PropTypes.bool
};
