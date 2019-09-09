/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { InputField, CheckboxField, SelectField, RichTextEditorField, Confirmation } from 'cx-ui-components';

export default class MessageTemplatesForm extends React.Component {
  state = {
    isClearTemplateTxtConfirmBoxOpen: false
  };
  openClearRichTextConfirmBox = isClearTemplateTxtConfirmBoxOpen => this.setState({ isClearTemplateTxtConfirmBoxOpen });

  clearRichTextEditorField = clearRichTextEditorField => {
    if (!clearRichTextEditorField) {
      this.props.change('templateTextType', 'html');
    } else {
      this.props.change('template', '');
    }
    this.setState({ isClearTemplateTxtConfirmBoxOpen: false });
  };
  shouldComponentUpdate(nextProps) {
    if (nextProps.dirty) {
      // update channels to "email" when templateTextType is "html":
      if (
        nextProps.templateTextType === 'html' &&
        (!this.props.channels || this.props.channels.toJS().toString() !== 'email')
      ) {
        nextProps.change('channels', List(['email']));
      }
      // toggle "clear text confirmation box" when user wants to switch from richTextEidtor to plainTextEditor:
      if (
        this.props.templateText &&
        (this.props.templateTextType === 'html' && nextProps.templateTextType === 'plaintext')
      ) {
        this.openClearRichTextConfirmBox(true);
      }
    }
    return true;
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          data-automation="messageTemplateNameInput"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          data-automation="messageTemplateDescriptionInput"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
        />
        <CheckboxField
          label="Channels *"
          name="channels"
          dropDownText="Select Channel Type..."
          data-automation="msgTemplateChannelTypeDropDownBtn"
          items={[
            { name: 'sms', label: 'SMS' },
            { name: 'messaging', label: 'Messaging' },
            { name: 'email', label: 'Email' }
          ]}
          disabled={this.props.templateTextType === 'html'}
        />
        <SelectField
          name="templateTextType"
          label="Type *"
          data-automation="msgTemplateTextTypeDropDownBtn"
          options={[{ label: 'Plain Text', value: 'plaintext' }, { label: 'Rich Text', value: 'html' }]}
          disabled={
            (this.props.channels &&
              (this.props.channels.includes('sms') || this.props.channels.includes('messaging'))) ||
            this.props.isDisplayContentInHtml
          }
          required
        />
        {!this.props.templateTextType || this.props.templateTextType === 'plaintext' ? (
          <InputField
            name="template"
            label="Template *"
            componentType="textarea"
            inputType="text"
            data-automation="messageTemplateInput"
            disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
          />
        ) : (
          <RichTextEditorField
            name="template"
            label="Template *"
            templateText={this.props.templateText}
            isDisplayContentInHtml={this.props.isDisplayContentInHtml}
            toggleMessageTemplateText={isDisplayContentInHtml =>
              this.props.toggleMessageTemplateText(isDisplayContentInHtml)
            }
          />
        )}
        {this.state.isClearTemplateTxtConfirmBoxOpen && (
          <Confirmation
            onMaskClick={() => this.clearRichTextEditorField(false)}
            cancelBtnCallback={() => this.clearRichTextEditorField(false)}
            confirmBtnCallback={() => this.clearRichTextEditorField(true)}
            toggleTextContenttoggleTextContent
            mainText={
              this.props.selectedEntityId && this.props.selectedEntityId === 'create'
                ? 'You have unsaved template content that will be lost!'
                : 'You are trying to switch from RichText editor to PlainText editor, existing template content will be lost if you submit the form with the new content!'
            }
            secondaryText="Are you sure you want to continue?"
          />
        )}
      </form>
    );
  }
}

MessageTemplatesForm.propTypes = {
  key: PropTypes.string,
  isSaving: PropTypes.bool,
  templateText: PropTypes.string,
  templateTextType: PropTypes.string,
  selectedEntityId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  change: PropTypes.func,
  toggleMessageTemplateText: PropTypes.func,
  isDisplayContentInHtml: PropTypes.bool,
  channels: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};