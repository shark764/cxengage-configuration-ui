/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * GroupsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';

export default function GroupsForm({ handleSubmit, isSaving, inherited, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <Fragment>
        <InputField
          name="name"
          label="Name *"
          id="frm-groups-name"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited}
        />
        <InputField
          name="description"
          label="Description"
          id="frm-groups-description"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || inherited}
        />
      </Fragment>
    </form>
  );
}

GroupsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};
