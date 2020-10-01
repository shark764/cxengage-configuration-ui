/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DispositionListsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  DetailHeader,
  InputField,
  ToggleField,
  TransferListField as DispositionListField,
  ConfirmationWrapper,
  DetailsPanelAlert
} from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const DispositionListContainer = styled.div`
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export default function DispositionListsForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  userHasSharePermission,
  key,
  selectedEntityId,
  dispositionHeaders,
  removeDispositionListItem,
  removeCategoryItems,
  setSelectedSubEntityId,
  disableShared,
  sharedFormValue,
  change
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        {inherited && <DetailsPanelAlert text="This Disposition List is inherited and cannot be edited" />}
        {sharedFormValue &&
          !disableShared &&
          !inherited && (
            <DetailsPanelAlert text="You have set shared to 'enabled' for this Disposition List. Once a Disposition List is enabled and saved, it cannot be reverted." />
          )}
        <DetailWrapper open={true} data-automation="dispositionListsDetailsSVG">
          <WrappedDetailHeader text="Details" />
          <InputField
            name="name"
            label="Name *"
            componentType="input"
            inputType="text"
            placeholder="Please enter a name..."
            data-automation="nameInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="externalId"
            label="External ID"
            componentType="input"
            data-automation="externalIdInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="description"
            label="Description"
            componentType="textarea"
            inputType="text"
            data-automation="descriptionInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <ConfirmationWrapper
            confirmBtnCallback={
              !disableShared && !sharedFormValue && userHasSharePermission
                ? () => change('shared', !sharedFormValue)
                : undefined
            }
            mainText={
              "Setting shared to 'enabled' for this Disposition List. Once a Disposition List is enabled and saved, it cannot be reverted."
            }
            secondaryText={'Are you sure you want to continue?'}
          >
            <ToggleField
              name="shared"
              label="Shared"
              title={
                disableShared
                  ? "You cannot update 'Shared' once it's set to true"
                  : 'Change "Shared" state for this Disposition List'
              }
              disabled={isSaving || inherited || disableShared || !userHasUpdatePermission || !userHasSharePermission}
              data-automation="sharedToggle"
            />
          </ConfirmationWrapper>
        </DetailWrapper>

        <DetailWrapper open={true} data-automation="dispositionListsSVG">
          <WrappedDetailHeader
            userHasUpdatePermission={userHasUpdatePermission && !inherited}
            text="Dispositions"
            onActionButtonClick={() => setSelectedSubEntityId('create')}
            open
          />
          <DispositionListContainer>
            <DispositionListField
              className="disposition-lists"
              name="dispositions"
              entityName="dispositionLists"
              endpointHeaders={dispositionHeaders}
              selectedEntityId={selectedEntityId}
              removeCategoryItems={removeCategoryItems}
              setSelectedSubEntityId={setSelectedSubEntityId}
              removeTransferListItem={removeDispositionListItem}
              userHasUpdatePermission={userHasUpdatePermission && !inherited}
              allowUpdateCategory={true}
              allowUpdateItem={false}
              data-automation="dispositionListNestedList"
            />
          </DispositionListContainer>
        </DetailWrapper>
      </Wrapper>
    </form>
  );
}

DispositionListsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  dispositionHeaders: PropTypes.object,
  selectedEntityId: PropTypes.string,
  removeDispositionListItem: PropTypes.func.isRequired,
  removeCategoryItems: PropTypes.func.isRequired,
  setSelectedSubEntityId: PropTypes.func.isRequired,
  userHasSharePermission: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  disableShared: PropTypes.bool,
  change: PropTypes.func
};
