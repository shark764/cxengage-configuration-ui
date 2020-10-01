/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  DetailHeader,
  InputField,
  LoadingSpinnerSVG,
  TransferListField as ContactLayoutsListField
} from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const ContactLayoutsContainer = styled.div`
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const AddNewContactLayoutHelpText = styled.p`
  width: 430px;
  font-size: 12px;
  font-weight: bold;
  font-style: italic;
  color: #d72727;
  margin-left: 50px;
  margin-top: -20px;
`;

const CenterWrapper = styled.div`
  text-align: center;
`;

export default function ContactLayoutsForm({
  key,
  handleSubmit,
  isSaving,
  userHasUpdatePermission,
  setSelectedSubEntityId,
  selectedEntityId,
  inherited,
  contactLayoutsHeaders,
  removeContactLayoutsListItem,
  removeCategoryItems,
  isContactAttributesFetching,
  missingMandatoryAttributesNames
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {isContactAttributesFetching ? (
        <CenterWrapper>
          <LoadingSpinnerSVG size={100} />
        </CenterWrapper>
      ) : (
        <Wrapper>
          <DetailWrapper open data-automation="contactLayoutsDetailsSVG">
            <WrappedDetailHeader text="Details" />
            <InputField
              name="name"
              inputType="text"
              label="Name *"
              componentType="input"
              data-automation="nameInput"
              disabled={isSaving || !userHasUpdatePermission || inherited}
            />
            <InputField
              name="description"
              inputType="text"
              label="Description"
              componentType="textarea"
              data-automation="descriptionInput"
              disabled={isSaving || !userHasUpdatePermission || inherited}
            />
          </DetailWrapper>
          <DetailWrapper open data-automation="contactLayoutsSVG">
            <WrappedDetailHeader
              userHasUpdatePermission={userHasUpdatePermission}
              text="Layout"
              onActionButtonClick={() => setSelectedSubEntityId('create')}
            />
            {missingMandatoryAttributesNames &&
              missingMandatoryAttributesNames.size > 0 && (
                <AddNewContactLayoutHelpText>
                  {selectedEntityId === 'create'
                    ? `Layout cannot be created without these mandatory Custom Attributes: ${missingMandatoryAttributesNames.join(
                        ', '
                      )}`
                    : `Layout cannot be updated without these mandatory Custom Attributes: ${missingMandatoryAttributesNames.join(
                        ', '
                      )}`}
                </AddNewContactLayoutHelpText>
              )}
            <ContactLayoutsContainer>
              <ContactLayoutsListField
                name="layout"
                allowUpdateItem={false}
                allowUpdateCategory={true}
                allowCreateListItem={true}
                entityName="contactsLayouts"
                selectedEntityId={selectedEntityId}
                endpointHeaders={contactLayoutsHeaders}
                removeCategoryItems={removeCategoryItems}
                data-automation="contactsLayoutNestedList"
                setSelectedSubEntityId={setSelectedSubEntityId}
                removeTransferListItem={removeContactLayoutsListItem}
                userHasUpdatePermission={userHasUpdatePermission && !inherited}
              />
            </ContactLayoutsContainer>
          </DetailWrapper>
        </Wrapper>
      )}
    </form>
  );
}

ContactLayoutsForm.propTypes = {
  key: PropTypes.string,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  selectedEntityId: PropTypes.string,
  contactLayoutsHeaders: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  removeCategoryItems: PropTypes.func.isRequired,
  removeContactLayoutsListItem: PropTypes.func.isRequired,
  setSelectedSubEntityId: PropTypes.func.isRequired,
  isContactAttributesFetching: PropTypes.bool,
  missingMandatoryAttributesNames: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
