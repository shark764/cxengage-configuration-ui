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
import { SelectField } from 'cx-ui-components';
import { ToggleField } from 'cx-ui-components';
import { TemplateTextEditorField } from 'cx-ui-components';

export default function EmailTemplatesForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <SelectField
        name="email"
        label="Email"
        disabled={props.isSaving || props.inherited}
        options={[
          {
            label: 'Default Email',
            value: 'default'
          },
          {
            label: 'Custom Email',
            value: 'custom'
          }
        ]}
        required
      />
      {props.email === 'custom' && (
        <Fragment>
          <ToggleField
            name="shared"
            label="Shared"
            disabled={props.isSaving || props.inherited}
          />
          <TemplateTextEditorField
            name="subject"
            label="Subject"
            disabled={props.isSaving || props.inherited}
            templates={props.templates}
          />
          <TemplateTextEditorField
            name="body"
            label="Body"
            disabled={props.isSaving || props.inherited}
            templates={props.templates}
          />
        </Fragment>
      )}
    </form>
  );
}

EmailTemplatesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string
};
