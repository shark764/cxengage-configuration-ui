/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { validatePhoneNumber, validateSip } from 'serenova-js-utils/validation';
import {
  InputField,
  SelectField,
  SidePanelActions,
  ToggleField,
  AutoCompleteField,
  CheckboxField
} from 'cx-ui-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;
const Header = styled.h3`
  font-size: 28px;
  color: #474747;
  font-weight: 700;
`;
const TransferListItem = styled.h3`
  color: #474747;
  font-size: 28px;
  max-width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: initial;
  margin-left: 10px;
  padding-right: 10px;
  flex: 1;
`;
const ToggleFieldDiv = styled(ToggleField)`
  margin-bottom: 15px;
`;

export default class TransferListItemsForm extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.dirty) {
      if (this.props.isUserCreatingNewCategory !== nextProps.isUserCreatingNewCategory) {
        nextProps.clearFields('transferListItems:create', false, false, 'hierarchy');
      }
      if (this.props.selectedContactType !== nextProps.selectedContactType) {
        if (Boolean(validatePhoneNumber(this.props.endpointFieldValue)) && nextProps.selectedContactType === 'PSTN') {
          return true;
        } else if (Boolean(validateSip(this.props.endpointFieldValue)) && nextProps.selectedContactType === 'SIP') {
          return true;
        } else {
          if (nextProps.selectedContactType === 'queue') {
            nextProps.change('transferType', 'internal');
          }
          if (nextProps.selectedContactType !== 'queue') {
            nextProps.clearFields('transferListItems:create', false, false, 'transferType');
          }
          nextProps.clearFields('transferListItems:create', false, false, 'endpoint');
        }
      }
    }
    return true;
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        {!this.props.selectedSubEntityId.includes('updateCategoryHeader') && (
          <Fragment>
            <HeaderContainer>
              <Header>
                {this.props.selectedSubEntityId === 'create' ? 'Creating' : 'Updating'} Transfer List Item for :
              </Header>
              <TransferListItem title={this.props.transferListName}>{this.props.transferListName}</TransferListItem>
            </HeaderContainer>
            {this.props.selectedSubEntityId === 'create' &&
              this.props.existingCategories && (
                <ToggleFieldDiv
                  name="newCategory"
                  label="Create new category"
                  labelMargin={'0px'}
                  data-automation="newCategoryToggle"
                  disabled={this.props.isSaving}
                />
              )}
            {(!this.props.existingCategories || this.props.isUserCreatingNewCategory) && (
              <InputField
                name="hierarchy"
                label="Category Name *"
                componentType="input"
                inputType="text"
                data-automation="categoryNameInput"
                disabled={this.props.isSaving}
              />
            )}
            {this.props.existingCategories &&
              !this.props.isUserCreatingNewCategory && (
                <AutoCompleteField
                  name="hierarchy"
                  label="Category Name *"
                  placeholder="Select a Category..."
                  suggestedDropDownWidth="100%"
                  suggestions={this.props.existingCategories}
                  data-automation="categoryNameAutoComplete"
                  suggestedDropdownStyle={{ width: '100%', overflowX: 'hidden', whiteSpace: 'nowrap' }}
                  disabled={this.props.isSaving}
                  required
                />
              )}
            <InputField
              name="name"
              label="Contact Name *"
              componentType="input"
              inputType="text"
              data-automation="contactNameInput"
              disabled={this.props.isSaving}
            />
            <SelectField
              name="contactType"
              label="Contact Type *"
              data-automation="contactTypeList"
              disabled={this.props.isSaving}
              options={[
                { label: 'Select a contact type...', value: 'selectContactType' },
                { label: 'Queue', value: 'queue' },
                { label: 'PSTN', value: 'PSTN' },
                { label: 'SIP', value: 'SIP' }
              ]}
              required
            />
            <SelectField
              name="transferType"
              label="Transfer Type *"
              data-automation="transferTypeList"
              options={[
                { label: 'Select a transfer type...', value: 'selectTransferType' },
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' }
              ]}
              disabled={this.props.selectedContactType !== 'queue' ? this.props.isSaving : true}
              required
            />
            <CheckboxField
              name="warmColdTransfer"
              label="Warm/Cold Transfer *"
              dropDownText="Select warm/cold transfer..."
              data-automation="warmColdTransferCheckbox"
              items={[
                { name: 'warmTransfer', label: 'Warm Transfer' },
                { name: 'coldTransfer', label: 'Cold Transfer' }
              ]}
            />
            {this.props.selectedContactType === 'queue' ? (
              <AutoCompleteField
                name="endpoint"
                label="Endpoint *"
                placeholder="Select a queue..."
                suggestedDropDownWidth="100%"
                suggestions={this.props.selectActiveQueueNames}
                data-automation="endpointAutoComplete"
                suggestedDropdownStyle={{ width: '100%', overflowX: 'hidden', whiteSpace: 'nowrap' }}
                disabled={this.props.isSaving}
              />
            ) : (
              <InputField
                name="endpoint"
                label="Endpoint *"
                componentType="input"
                inputType="text"
                data-automation="endpointInput"
                disabled={this.props.isSaving}
              />
            )}
          </Fragment>
        )}
        {this.props.selectedSubEntityId.includes('updateCategoryHeader') && (
          <Fragment>
            <HeaderContainer>
              <Header>Updating category name for :</Header>
              <TransferListItem title={this.props.transferListName}>{this.props.transferListName}</TransferListItem>
            </HeaderContainer>
            <InputField
              name="hierarchy"
              label="Category Name *"
              componentType="input"
              inputType="text"
              data-automation="categoryNameInput"
              disabled={this.props.isSaving}
            />
          </Fragment>
        )}
        <SidePanelActions
          onCancel={this.props.onCancel}
          isSaving={this.props.isSaving}
          pristine={this.props.pristine}
          invalid={this.props.invalid}
          save={this.props.selectedEntityId === 'create' ? true : false}
        />
      </form>
    );
  }
}

TransferListItemsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  key: PropTypes.string,
  dirty: PropTypes.bool,
  isSaving: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  isUserCreatingNewCategory: PropTypes.bool,
  transferListName: PropTypes.string,
  existingCategories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  selectedContactType: PropTypes.string,
  change: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired,
  selectedSubEntityId: PropTypes.string.isRequired,
  selectedEntityId: PropTypes.string,
  selectActiveQueueNames: PropTypes.array,
  endpointFieldValue: PropTypes.string
};
