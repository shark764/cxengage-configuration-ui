/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ChatWidgetsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  InputField,
  DetailHeader,
  ToggleField,
  RadioGroupField,
  SelectField,
  FileUpload,
  ColorField,
  ListField
} from 'cx-ui-components';

export default function ChatWidgetsForm({ handleSubmit, isSaving, inherited, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <InputField className="name-input-field" name="name" label="Name *" componentType="input" inputType="text" disabled={isSaving || inherited} />
      <ToggleField className="shared-toggle-field" name="shared" label="Shared" disabled={isSaving || inherited} />
      <DetailHeader text="Fields" />
      <ListField className="list-inputs-field-chat-widgets" name="inputs" label="Inputs" />
      <DetailHeader text="Images" />
      <RadioGroupField
        className="radio-group-field-chat-widgets"
        name="welcome"
        label="Welcome"
        disabled={isSaving || inherited}
        options={[
          {
            label: 'Hero',
            value: 'hero',
            helpText: '(Display 300 x 410)'
          },
          {
            label: 'Logo',
            value: 'logo',
            helpText: '(Display 300 x 800)'
          }
        ]}
        required
      />
      <FileUpload
        // onFileSelect={uploadCsv}
        className="file-upload-field"
        acceptedFileType=".jpg"
        disabled={isSaving}
        id="dtpanel-chat-widget-upload-csv"
      />
      <DetailHeader text="Type" />
      <SelectField
        className="font-input-select-field"
        name="fontFamily"
        label="Font Family"
        options={[{ value: 'arial', label: 'Arial' }]}
        disabled={isSaving || inherited}
      />
      <SelectField
        className="font-input-select-field"
        name="fontSize"
        label="Font Size"
        options={[{ value: '12pt', label: '12pt' }]}
        disabled={isSaving || inherited}
      />
      <DetailHeader text="Color" />
      <ColorField className="chat-widgets-header-color" name="headerColor" label="Header Color" />
      <ColorField className="chat-widgets-header-text-icons" name="headerTextIcons" label="Header Text/Icons" />
      <ColorField className="chat-widgets-chat-background" name="chatbg" label="Chat BG" />
      <ColorField className="chat-widgets-agent-header" name="agentHeader" label="Agent Header" />
      <ColorField className="chat-widgets-agent-text" name="agentText" label="Agent Text" />
      <ColorField className="chat-widgets-customer-header" name="customerHeader" label="Customer Header" />
      <ColorField className="chat-widgets-customer-text" name="customerText" label="Customer Text" />
      <ColorField className="chat-widgets-system-text" name="systemText" label="System Text" />
      <ColorField className="chat-widgets-button-text" name="buttonText" label="Button Text" />
      <ColorField className="chat-widgets-icon-color" name="iconColor" label="Icon Color" />
      <ColorField className="chat-widgets-border-color" name="borderColor" label="Border Color" />

      <DetailHeader text="Whitelist" />
      <ListField className="list-urls-field-chat-widgets" name="urls" label="Urls" />
    </form>
  );
}

ChatWidgetsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
};
