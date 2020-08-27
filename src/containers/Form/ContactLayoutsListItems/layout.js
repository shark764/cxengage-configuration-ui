/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { FieldArray } from 'redux-form/immutable';
import { localeLanguages } from '../../../redux/modules/entities/config';

import {
  InputField,
  SelectField,
  DetailHeader,
  AutoCompleteField,
  SidePanelActions,
  CloseIconSVG
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
const ContactLayoutListItem = styled.h3`
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
const LoacalizationDetailHeader = styled(DetailHeader)`
  padding-left: 10px;
`;
const LocalizationLanguageContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;
const LocalizationFieldsContainer = styled.div`
  flex-basis: 300px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const CategoryLocalizationField = ({ fields, disabled, userHasUpdatePermission }) => (
  <Fragment>
    <LoacalizationDetailHeader
      userHasUpdatePermission={userHasUpdatePermission}
      text="Category Localization"
      onActionButtonClick={() => fields.length < 18 && fields.push(fromJS({ label: '', language: '' }))}
      open
    />
    {fields.map((category, index) => {
      const languageOptions = localeLanguages.filter(
        a =>
          a.value === fields.get(index).get('language') ||
          fields.getAll().find(label => label.get('language') === a.value) === undefined
      );
      return (
        <LocalizationLanguageContainer key={index}>
          <LocalizationFieldsContainer>
            <InputField
              name={`${category}.label`}
              label="Label"
              componentType="input"
              inputType="text"
              labelWidth="auto"
              data-automation="localizationLabelInput"
              disabled={disabled}
              onBlur={event => event.preventDefault()}
            />
          </LocalizationFieldsContainer>
          <LocalizationFieldsContainer>
            <SelectField
              name={`${category}.language`}
              label="Language"
              labelWidth="auto"
              disabled={disabled}
              options={languageOptions}
              data-automation="localizationLanguageList"
            />
          </LocalizationFieldsContainer>
          <div style={{ marginLeft: '10px', position: 'relative', bottom: '-5px' }}>
            <CloseIconSVG
              onClick={() => fields.remove(index)}
              size={10}
              closeIconType={
                fields.get(index) && (!fields.get(index).get('label') || !fields.get(index).get('language'))
                  ? 'primary'
                  : 'secondary'
              }
              data-automation="categoryLocalizationRemoveButton"
            />
          </div>
        </LocalizationLanguageContainer>
      );
    })}
  </Fragment>
);

export default class ContactLayoutsListItemsForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <HeaderContainer>
          <Header>
            {this.props.selectedSubEntityId === 'create' ? 'Creating' : 'Updating'} Contact Layout List Item for :
          </Header>
          <ContactLayoutListItem title={this.props.contactLayoutName}>
            {this.props.contactLayoutName}
          </ContactLayoutListItem>
        </HeaderContainer>
        <InputField
          name="hierarchy"
          label="Category Name *"
          componentType="input"
          inputType="text"
          data-automation="categoryNameInput"
          disabled={this.props.isSaving || this.props.selectedSubEntityId.startsWith('createListItem:')}
        />
        {!this.props.selectedSubEntityId.startsWith('createListItem:') && (
          <FieldArray
            name="label"
            rerenderOnEveryChange
            component={CategoryLocalizationField}
            props={{ disabled: this.props.isSaving, userHasUpdatePermission: this.props.userHasUpdatePermission }}
            validate={value =>
              !value || value.size === 0 || value.find(a => !a.get('label') || !a.get('language')) !== undefined
                ? 'Invalid Label Data'
                : undefined
            }
          />
        )}
        {this.props.selectedSubEntityId.startsWith('create') && (
          <AutoCompleteField
            name="name"
            label="Contact Attribute *"
            placeholder="Select a Contact Attribute..."
            suggestedDropDownWidth="100%"
            suggestions={this.props.availableContactAttributesNames}
            data-automation="contactAttributesAutoComplete"
            suggestedDropdownStyle={{ width: '100%', overflowX: 'hidden', whiteSpace: 'nowrap' }}
            disabled={this.props.isSaving}
            required
          />
        )}
        <SidePanelActions
          onCancel={this.props.onCancel}
          isSaving={this.props.isSaving}
          pristine={this.props.pristine}
          invalid={this.props.invalid}
          save
        />
      </form>
    );
  }
}
CategoryLocalizationField.propTypes = {
  disabled: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

ContactLayoutsListItemsForm.propTypes = {
  key: PropTypes.string,
  invalid: PropTypes.bool,
  isSaving: PropTypes.bool,
  pristine: PropTypes.bool,
  selectedEntityId: PropTypes.string,
  contactLayoutName: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  selectedSubEntityId: PropTypes.string.isRequired,
  availableContactAttributesNames: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
