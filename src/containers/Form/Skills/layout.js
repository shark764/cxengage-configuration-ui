/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SkillsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, ToggleField, ConfirmationWrapper } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

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
      <Wrapper>
        <DetailWrapper open data-automation="skillsDetailsSVG">
          <WrappedDetailHeader text="Details" />
          <InputField
            name="name"
            label="Name *"
            id="frm-skills-name"
            data-automation="nameInput"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="description"
            label="Description"
            id="frm-skills-description"
            data-automation="descriptionInput"
            componentType="textarea"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <ConfirmationWrapper
            confirmBtnCallback={!disableProficiency && !hasProficiency ? toggleProficiency : undefined}
            mainText={`You cannot update 'Has Proficiency' once it's set to true.`}
            secondaryText={'Are you sure you want to continue?'}
            data-automation="hasProficiencyConfirmationWrapper"
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
              data-automation="hasProficiencyToggle"
            />
          </ConfirmationWrapper>
        </DetailWrapper>
      </Wrapper>
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
