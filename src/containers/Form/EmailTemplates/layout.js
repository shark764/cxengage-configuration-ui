/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * EmailTemplatesForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SelectField, ToggleField, TemplateTextEditorField } from 'cx-ui-components';

export default function EmailTemplatesForm(props) {
  return (
    <form onSubmit={props.handleSubmit} key={props.key}>
      <SelectField
        name="email"
        label="Email"
        data-automation="emailList"
        disabled={props.isSaving || props.inherited}
        options={[{ label: 'Default Email', value: 'default' }, { label: 'Custom Email', value: 'custom' }]}
        required
      />
      {props.email === 'custom' && (
        <Fragment>
          <ToggleField
            name="shared"
            label="Shared"
            disabled={props.isSaving || props.inherited}
            data-automation="sharedToggle"
          />
          <TemplateTextEditorField
            name="subject"
            label="Subject"
            disabled={props.isSaving || props.inherited}
            templates={props.templates}
            data-automation="subjectTextEditor"
          />
          <TemplateTextEditorField
            name="body"
            label="Body"
            disabled={props.isSaving || props.inherited}
            templates={props.templates}
            data-automation="bodyTextEditor"
          />
        </Fragment>
      )}
    </form>
  );
}

EmailTemplatesForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string
};
