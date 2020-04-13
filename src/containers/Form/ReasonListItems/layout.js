/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { InputField, SelectField, SidePanelActions, ToggleField, AutoCompleteField } from 'cx-ui-components';

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
const ReasonListItem = styled.h3`
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

export default class ReasonListItemsForm extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.dirty) {
      if (
        this.props.isUserCreatingNewCategory !== nextProps.isUserCreatingNewCategory ||
        this.props.isUncategorized !== nextProps.isUncategorized
      ) {
        nextProps.clearFields('reasonListItems:create', false, false, 'hierarchy');
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
                {this.props.selectedSubEntityId === 'create' ? 'Creating' : 'Updating'} Reason List Item for :
              </Header>
              <ReasonListItem title={this.props.reasonListName}>{this.props.reasonListName}</ReasonListItem>
            </HeaderContainer>
            {this.props.selectedSubEntityId === 'create' &&
              this.props.existingCategories &&
              this.props.existingCategories[0] && (
                // Creating new reason list
                <ToggleFieldDiv
                  name="newCategory"
                  label="Create new category"
                  labelMargin={'0px'}
                  data-automation="newCategoryToggle"
                  disabled={this.props.isSaving}
                />
              )}
            <ToggleFieldDiv
              name="isUncategorized"
              label="Uncategorized?"
              labelMargin={'0px'}
              data-automation="uncategorizedToggle"
              disabled={this.props.isSaving}
            />
            {!this.props.isUncategorized &&
              (!this.props.existingCategories ||
              !this.props.existingCategories[0] ||
              this.props.isUserCreatingNewCategory ? (
                // change reason list name
                <InputField
                  name="hierarchy"
                  label="Category Name"
                  componentType="input"
                  inputType="text"
                  data-automation="categoryNameInput"
                  disabled={this.props.isSaving}
                />
              ) : (
                // Add new reason list item
                <AutoCompleteField
                  name="hierarchy"
                  label="Category Name"
                  placeholder="Select a Category..."
                  suggestedDropDownWidth="100%"
                  suggestions={this.props.existingCategories}
                  data-automation="categoryNameAutoComplete"
                  suggestedDropdownStyle={{ width: '100%', overflowX: 'hidden', whiteSpace: 'nowrap' }}
                  disabled={this.props.isSaving}
                  required
                />
              ))}
            {
              <SelectField
                name="reason"
                label="Reason *"
                data-automation="reasonList"
                options={[{ label: '-- Please select a reason --', value: 'selectReason' }].concat(this.props.reasons)}
                disabled={this.props.isSaving}
                required
              />
            }
          </Fragment>
        )}
        {this.props.selectedSubEntityId.includes('updateCategoryHeader') && (
          <Fragment>
            <HeaderContainer>
              <Header>Updating category name for :</Header>
              <ReasonListItem title={this.props.reasonListName}>{this.props.reasonListName}</ReasonListItem>
            </HeaderContainer>
            <InputField
              name="hierarchy"
              label="Category Name"
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

ReasonListItemsForm.propTypes = {
  isUserCreatingNewCategory: PropTypes.bool,
  isUncategorized: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  key: PropTypes.string,
  selectedSubEntityId: PropTypes.string.isRequired,
  reasonListName: PropTypes.string,
  existingCategories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isSaving: PropTypes.bool,
  reasons: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onCancel: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  selectedEntityId: PropTypes.string
};
