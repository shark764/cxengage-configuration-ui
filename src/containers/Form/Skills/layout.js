/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SkillsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader } from 'cx-ui-components';
import { InputField } from 'cx-ui-components';
import { ToggleField } from 'cx-ui-components';

export default function SkillsForm({ handleSubmit, isSaving, inherited, key }) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <Fragment>
        <InputField
          name="name"
          label="Name *"
          id="frm-skills-name"
          componentType="input"
          inputType="text"
          disabled={isSaving || inherited}
        />
        <InputField
          name="description"
          label="Description"
          id="frm-skills-description"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || inherited}
        />
        <ToggleField
          name="hasProficiency"
          label="Has Proficiency"
          id="frm-skills-has-proficiency"
          disabled={isSaving || inherited}
        />
      </Fragment>
    </form>
  );
}

SkillsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};
