/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ListsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InputField, SelectField, ToggleField } from 'cx-ui-components';

export default function ListsForm(props) {
  return (
    <form onSubmit={props.handleSubmit} key={props.key} id="frm-lists">
      <InputField
        name="name"
        label="Name *"
        id="frm-lists-name"
        componentType="input"
        inputType="text"
        disabled={props.isSaving || props.inherited}
      />
      <ToggleField name="shared" label="Shared *" id="frm-lists-shared" disabled={props.isSaving || props.inherited} />
      {!props.update && (
        <SelectField
          name="listTypeId"
          label="List Type *"
          id="frm-lists-list-type-id"
          options={props.listTypes}
          disabled={props.isSaving}
        />
      )}
    </form>
  );
}

ListsForm.propTypes = {
  key: PropTypes.string,
  listTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  handleSubmit: PropTypes.func.isRequired,
  update: PropTypes.bool,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};

ListsForm.defaultProps = {
  update: false
};
