/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
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
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="description"
        label="Description"
        id="chat-widget-description"
        componentType="textarea"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="contactPoint"
        label="Contact Point *"
        id="chat-widget-contact-point"
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      {chatWidgetId === 'create'
        ? <SelectField
            name="appId"
            label="App *"
            options={!digitalChannelsAppsFetching ? digitalChannelsAppIds : undefined}
            disabled={disabled}
          />
        : <Fragment>
            <Detail label="App" value={app && app.get('name')} />
            <Detail label="App Id" value={app && app.get('id')} />
          </Fragment>
      }

      <DetailHeader text="Branding" />

      <RadioGroupField
        className="chat-widget-display-style"
        name="displayStyle"
        label="Display Style"
        disabled={disabled}
        options={[
          {
            label: 'Button',
            value: 'button'
          },
          {
            label: 'Tab',
            value: 'tab'
          }
        ]}
        required
      />
      {displayStyleIsButton && (
        <Fragment>
          <InputField
            name="buttonIconUrl"
            label="Button Icon URL"
            id="chat-widget-button-icon-url"
            componentType="input"
            inputType="text"
            disabled={disabled}
          />
          <InputField
            name="buttonWidth"
            label="Button Width"
            id="chat-widget-button-width"
            componentType="input"
            inputType="text"
            disabled={disabled}
          />
          <InputField
            name="buttonHeight"
            label="Button Height"
            id="chat-widget-button-height"
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
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="businessIconUrl"
        label="Business Icon URL"
        id="chat-widget-business-icon-url"
        componentType="input"
        inputType="text"
        disabled={disabled}
      />
      <InputField
        name="backgroundImageUrl"
        label="Background Image URL"
        id="chat-widget-background-image-url"
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
        disabled={disabled}
      />
      <RadioGroupField
        className="chat-widget-prechat-capture"
        name="prechatCapture"
        label="Prechat Capture"
        disabled={disabled}
        options={[
          {
            label: 'Name',
            value: 'name'
          },
          {
            label: 'Email',
            value: 'email'
          }
        ]}
        required
      />

      <DetailHeader text="Origin Whitelist" />
      <ListField name="whitelistedUrls" label="Whitelisted URLs" className="chat-widget-whitelisted-urls" />
    </form>
  );
}

ChatWidgetsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  chatWidgetId: PropTypes.string,
  digitalChannelsAppsFetching: PropTypes.bool,
  digitalChannelsAppIds: PropTypes.array,
  app: PropTypes.object,
  displayStyleIsButton: PropTypes.bool
};
