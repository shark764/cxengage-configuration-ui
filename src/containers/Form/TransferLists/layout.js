/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TransferListsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DetailHeader, InputField, TransferListField } from 'cx-ui-components';

const TransferListContainer = styled.div`
  font-size: 14px;
  max-wdith: 700px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const TransferListHeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
  color: #656565;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
`;
const CategoryTitle = styled.div`
  flex: 100 0;
  width: 100px;
  padding: 10px;
  text-align: left;
`;
const ActionsTitle = styled.div`
  flex: 130 0;
  max-width: 130px;
  padding: 10px;
  text-align: left;
`;

export default function TransferListsForm({
  key,
  isSaving,
  handleSubmit,
  endpointHeaders,
  selectedEntityId,
  removeCategoryItems,
  removeTransferListItem,
  userHasUpdatePermission,
  setSelectedSubEntityId
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        data-automation="nameInput"
        disabled={isSaving || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="descriptionInput"
        disabled={isSaving || !userHasUpdatePermission}
      />
      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text="Contacts"
        onActionButtonClick={() => setSelectedSubEntityId('create')}
        open
      />
      <TransferListContainer>
        <TransferListHeadingWrapper>
          <CategoryTitle>Category Name</CategoryTitle>
          <CategoryTitle>Contact Name</CategoryTitle>
          <CategoryTitle>Contact Type</CategoryTitle>
          <ActionsTitle>Actions</ActionsTitle>
        </TransferListHeadingWrapper>
        <TransferListField
          className="transfer-lists"
          name="endpoints"
          endpointHeaders={endpointHeaders}
          selectedEntityId={selectedEntityId}
          removeCategoryItems={removeCategoryItems}
          setSelectedSubEntityId={setSelectedSubEntityId}
          removeTransferListItem={removeTransferListItem}
          userHasUpdatePermission={userHasUpdatePermission}
          data-automation="endpointsTransferList"
        />
      </TransferListContainer>
    </form>
  );
}

TransferListsForm.propTypes = {
  key: PropTypes.string,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  selectedEntityId: PropTypes.string,
  endpointHeaders: PropTypes.object,
  setSelectedSubEntityId: PropTypes.func.isRequired,
  removeTransferListItem: PropTypes.func.isRequired,
  removeCategoryItems: PropTypes.func.isRequired
};
