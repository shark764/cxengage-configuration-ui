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
const DispositionListItem = styled.h3`
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

export default class DispositionListItemsForm extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.dirty) {
      if (this.props.isUserCreatingNewCategory !== nextProps.isUserCreatingNewCategory) {
        nextProps.clearFields('dispositionListItems:create', false, false, 'hierarchy');
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
              {this.props.selectedSubEntityId === 'create' ? 'Creating' : 'Updating'} Disposition List Item for :
            </Header>
            <DispositionListItem title={this.props.dispositionListName}>
              {this.props.dispositionListName}
            </DispositionListItem>
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
                  data-automation="categoryNameAutoComplete"
                  suggestedDropdownStyle={{ width: '100%', overflowX: 'hidden', whiteSpace: 'nowrap' }}
                  disabled={this.props.isSaving}
                  required
                />
              )}
            {
              <SelectField
                name="disposition"
                label="Disposition *"
                data-automation="dispositionList"
                options={[
                  { label: '-- Please select a disposition --', value: 'selectDisposition' },
                  ...this.props.dispositions
                ]}
                disabled={this.props.isSaving}
                required
              />
            }
          </Fragment>
        )}
        {this.props.selectedSubEntityId.includes('updateCategoryHeader') && (
          <Fragment>
            <Header>Updating category name for :</Header>
            <DispositionListItem title={this.props.dispositionListName}>
              {this.props.dispositionListName}
            </DispositionListItem>
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

DispositionListItemsForm.propTypes = {
  isUserCreatingNewCategory: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  key: PropTypes.string,
  selectedSubEntityId: PropTypes.string.isRequired,
  dispositionListName: PropTypes.string,
  existingCategories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isSaving: PropTypes.bool,
  dispositions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onCancel: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  selectedEntityId: PropTypes.string
};
