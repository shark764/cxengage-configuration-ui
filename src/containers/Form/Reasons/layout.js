/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ReasonsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, DetailsPanelAlert, InputField, ToggleField, ConfirmationWrapper } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function ReasonsForm({
  handleSubmit,
  isSaving,
  inherited,
  key,
  disableShared,
  sharedFormValue,
  userHasUpdatePermission,
  userHasSharePermission,
  toggleShared
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {inherited && <DetailsPanelAlert text="This Presence Reason is inherited and cannot be edited" />}
      {sharedFormValue &&
        !disableShared &&
        !inherited && (
          <DetailsPanelAlert text="You have set shared to 'enabled' for this Presence Reason. Once a Presence Reason is enabled and saved, it cannot be reverted." />
        )}
      <Wrapper>
        <DetailWrapper open data-automation="reasonsDetailsSVG">
          <WrappedDetailHeader text="Details" />
          <InputField
            id="frm-reason-name"
            name="name"
            label="Name *"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="nameInput"
          />
          <InputField
            id="frm-reason-description"
            name="description"
            label="Description"
            componentType="textarea"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="descriptionInput"
          />
          <InputField
            id="frm-reason-external-id"
            name="externalId"
            label="External Id"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="externalIdInput"
          />
          <ConfirmationWrapper
            confirmBtnCallback={!disableShared && !sharedFormValue && userHasSharePermission ? toggleShared : undefined}
            mainText={
              "Setting shared to 'enabled' for this Presence Reason. Once a Presence Reason is enabled and saved, it cannot be reverted."
            }
            secondaryText={'Are you sure you want to continue?'}
          >
            <ToggleField
              id="frm-reason-shared"
              name="shared"
              label="Shared"
              title={
                disableShared
                  ? "You cannot update 'Shared' once it's set to true"
                  : 'Change "Shared" state for this Presence Reason'
              }
              disabled={isSaving || inherited || disableShared || !userHasUpdatePermission || !userHasSharePermission}
              data-automation="sharedToggle"
            />
          </ConfirmationWrapper>
        </DetailWrapper>
      </Wrapper>
    </form>
  );
}

ReasonsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  disableShared: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  toggleShared: PropTypes.func
};
