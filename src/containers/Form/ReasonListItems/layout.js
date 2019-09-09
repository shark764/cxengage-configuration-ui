/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { InputField, SelectField, SidePanelActions, ToggleField, AutoCompleteField } from 'cx-ui-components';

const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
  display: inline-block;
`;
const ReasonListItem = styled.h3`
  color: #474747;
  font-size: 28px;
  max-width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-weight: initial;
  margin-left: 30px;
  margin-bottom: -7px;
  padding-right: 10px;
`;
const ToggleFieldDiv = styled(ToggleField)`
  margin-bottom: 15px;
`;

export default class ReasonListItemsForm extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.dirty) {
      if (this.props.isUserCreatingNewCategory !== nextProps.isUserCreatingNewCategory) {
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
            <Header>
              {this.props.selectedSubEntityId === 'create' ? 'Creating' : 'Updating'} Reason List Item for :
            </Header>
            <ReasonListItem title={this.props.reasonListName}>{this.props.reasonListName}</ReasonListItem>
            {this.props.selectedSubEntityId === 'create' &&
              this.props.existingCategories &&
              this.props.existingCategories[0] && (
                <ToggleFieldDiv
                  name="newCategory"
                  label="Create new category"
                  labelMargin={'0px'}
                  data-automation="newCategoryToggle"
                  disabled={this.props.isSaving}
                />
              )}
            {(!this.props.existingCategories ||
              !this.props.existingCategories[0] ||
              this.props.isUserCreatingNewCategory) && (
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
              this.props.existingCategories[0] &&
              !this.props.isUserCreatingNewCategory && (
                <AutoCompleteField
                  name="hierarchy"
                  label="Category Name *"
                  placeholder="Select a Category..."
                  suggestedDropDownWidth="100%"
                  suggestions={this.props.existingCategories}
                  data-automation="categoryNameAutoSelectInput"
                  suggestedDropdownStyle={{ width: '100%', overflowX: 'hidden', whiteSpace: 'nowrap' }}
                  disabled={this.props.isSaving}
                  required
                />
              )}
            {
              <SelectField
                name="reason"
                label="Reason *"
                data-automation="reasonDropDownBtn"
                options={[{ label: 'Select a reason...', value: 'selectReason' }].concat(this.props.reasons)}
                disabled={this.props.isSaving}
                required
              />
            }
          </Fragment>
        )}
        {this.props.selectedSubEntityId.includes('updateCategoryHeader') && (
          <Fragment>
            <Header>Updating category name for :</Header>
            <ReasonListItem title={this.props.reasonListName}>{this.props.reasonListName}</ReasonListItem>
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

ReasonListItemsForm.propTypes = {
  isUserCreatingNewCategory: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  key: PropTypes.string,
  selectedSubEntityId: PropTypes.string.isRequired,
  reasonListName: PropTypes.string,
  existingCategories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isSaving: PropTypes.bool,
  reasons: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  selectedEntityId: PropTypes.string
};
