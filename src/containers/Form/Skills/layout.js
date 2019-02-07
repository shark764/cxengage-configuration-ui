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
import { DetailHeader, InputField, ToggleField, ConfirmationWrapper } from 'cx-ui-components';

export default function SkillsForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  disableProficiency,
  toggleProficiency,
  hasProficiency
}) {
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
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
        <InputField
          name="description"
          label="Description"
          id="frm-skills-description"
          componentType="textarea"
          inputType="text"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
        <ConfirmationWrapper
          confirmBtnCallback={!disableProficiency && !hasProficiency ? toggleProficiency : undefined}
          mainText={`You cannot update 'Has Proficiency' once it's set to true.`}
          secondaryText={'Are you sure you want to continue?'}
        >
          <ToggleField
            name="hasProficiency"
            label="Has Proficiency"
            id="frm-skills-has-proficiency"
            title={
              disableProficiency
                ? `You cannot update 'Has Proficiency' once it's set to true`
                : 'Controls whether the skill needs a value specified'
            }
            disabled={isSaving || inherited || !userHasUpdatePermission || disableProficiency}
          />
        </ConfirmationWrapper>
      </Fragment>
    </form>
  );
}

SkillsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  disableProficiency: PropTypes.bool,
  toggleProficiency: PropTypes.func,
  hasProficiency: PropTypes.bool
};
