/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ReasonListsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailHeader,
  DetailsPanelAlert,
  InputField,
  ToggleField,
  ConfirmationWrapper,
  NestedListField
} from 'cx-ui-components';
import styled from 'styled-components';
import DetailWrapper from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const ReasonListContainer = styled.div`
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export default function ReasonListsForm({
  handleSubmit,
  isSaving,
  inherited,
  key,
  disableShared,
  sharedFormValue,
  userHasUpdatePermission,
  userHasSharePermission,
  toggleShared,
  selectedEntityId,
  reasonHeaders,
  removeReasonListItem,
  removeCategoryItems,
  setSelectedSubEntityId
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        {inherited && <DetailsPanelAlert text="This Presence Reason List is inherited and cannot be edited" />}
        {sharedFormValue &&
          !disableShared &&
          !inherited && (
            <DetailsPanelAlert text="You have set shared to 'enabled' for this Presence Reason List. Once a Presence Reason List is enabled and saved, it cannot be reverted." />
          )}

        <DetailWrapper open data-automation="reasonListsDetailsSVG">
          <WrappedDetailHeader text="Details" />
          <InputField
            id="frm-reason-list-name"
            name="name"
            label="Name *"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="nameInput"
          />
          <InputField
            id="frm-reason-list-external-id"
            name="externalId"
            label="External Id"
            componentType="input"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="externalIdInput"
          />
          <InputField
            id="frm-reason-list-description"
            name="description"
            label="Description"
            componentType="textarea"
            inputType="text"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="descriptionInput"
          />
          <ConfirmationWrapper
            confirmBtnCallback={!disableShared && !sharedFormValue && userHasSharePermission ? toggleShared : undefined}
            mainText={
              "Setting shared to 'enabled' for this Presence Reason List. Once a Presence Reason List is enabled and saved, it cannot be reverted."
            }
            secondaryText={'Are you sure you want to continue?'}
            data-automation="toggleSharedConfirmationWrapper"
          >
            <ToggleField
              id="frm-reason-list-shared"
              name="shared"
              label="Shared"
              title={
                disableShared
                  ? "You cannot update 'Shared' once it's set to true"
                  : 'Change "Shared" state for this Presence Reason List'
              }
              disabled={isSaving || inherited || disableShared || !userHasUpdatePermission || !userHasSharePermission}
              data-automation="sharedToggle"
            />
          </ConfirmationWrapper>
          <ToggleField
            id="frm-reason-list-is-default"
            name="isDefault"
            label="Tenant Default?"
            title="Assigns list to all users on tenant"
            onChange={() => {}}
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="isDefaultToggle"
          />
        </DetailWrapper>

        <DetailWrapper open data-automation="reasonListsReasonsSVG">
          <WrappedDetailHeader
            userHasUpdatePermission={userHasUpdatePermission && !inherited}
            text="Reasons"
            onActionButtonClick={() => setSelectedSubEntityId('create')}
            open
          />
          <ReasonListContainer>
            <NestedListField
              className="reason-list"
              name="reasons"
              reasonHeaders={reasonHeaders}
              selectedEntityId={selectedEntityId}
              setSelectedSubEntityId={setSelectedSubEntityId}
              userHasUpdatePermission={userHasUpdatePermission && !inherited}
              removeReasonListItem={removeReasonListItem}
              removeCategoryItems={removeCategoryItems}
              data-automation="reasonListNestedList"
            />
          </ReasonListContainer>
        </DetailWrapper>
      </Wrapper>
    </form>
  );
}

ReasonListsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  disableShared: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  toggleShared: PropTypes.func,
  reasonHeaders: PropTypes.object,
  selectedEntityId: PropTypes.string,
  removeReasonListItem: PropTypes.func.isRequired,
  removeCategoryItems: PropTypes.func.isRequired,
  setSelectedSubEntityId: PropTypes.func.isRequired
};
