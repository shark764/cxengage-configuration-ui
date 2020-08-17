/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import styled from 'styled-components';
import { FieldArray } from 'redux-form/immutable';
import { DetailHeader, InputField, SelectField, ToggleField, CloseIconSVG, DetailsPanelAlert } from 'cx-ui-components';
import { localeLanguages } from '../../../redux/modules/entities/config';

const LocalizationLanguageContainer = styled.div`
  display: flex;
`;
const LocalizationFieldsContainer = styled.div`
  flex-basis: 300px;
  margin-bottom: 10px;
`;

const LocalizationField = ({ fields, disabled, userHasUpdatePermission, inherited }) => (
  <Fragment>
    <DetailHeader
      text="Localization"
      open
      inherited={inherited}
      userHasUpdatePermission={userHasUpdatePermission}
      onActionButtonClick={() => fields.length < 18 && fields.push(fromJS({ label: '', language: '' }))}
    />
    {fields.map((label, index) => {
      const languageOptions = localeLanguages.filter(
        a =>
          a.value === fields.get(index).get('language') ||
          fields.getAll().find(label => label.get('language') === a.value) === undefined
      );
      return (
        <LocalizationLanguageContainer key={index}>
          <LocalizationFieldsContainer>
            <InputField
              name={`${label}.label`}
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
              name={`${label}.language`}
              label="Language"
              labelWidth="auto"
              disabled={disabled}
              options={languageOptions}
              data-automation="localizationLanguageList"
            />
          </LocalizationFieldsContainer>
          {!inherited && (
            <div style={{ marginLeft: '10px', position: 'relative', bottom: '-5px' }}>
              <CloseIconSVG
                onClick={() => fields.remove(index)}
                size={10}
                closeIconType={
                  fields.get(index) && (!fields.get(index).get('label') || !fields.get(index).get('language'))
                    ? 'primary'
                    : 'secondary'
                }
                data-automation="LocalizationRemoveButton"
              />
            </div>
          )}
        </LocalizationLanguageContainer>
      );
    })}
  </Fragment>
);

export default function ContactAttributesForm({
  key,
  handleSubmit,
  isSaving,
  selectedEntityId,
  userHasUpdatePermission,
  inherited
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {inherited && <DetailsPanelAlert text={`This contact attribute is inherited and cannot be edited.`} />}
      <DetailHeader text="Details" />
      <InputField
        name="objectName"
        inputType="text"
        label="Name *"
        componentType="input"
        data-automation="nameInput"
        disabled={selectedEntityId !== 'create' ? true : isSaving || !userHasUpdatePermission || inherited}
      />
      <SelectField
        name="type"
        label="Type *"
        placeholder="Select a type..."
        disabled={selectedEntityId !== 'create' ? true : isSaving || !userHasUpdatePermission || inherited}
        data-automation="typeList"
        options={[
          { label: 'Text', value: 'text' },
          { label: 'Phone', value: 'phone' },
          { label: 'Email', value: 'email' },
          { label: 'Boolean', value: 'boolean' },
          { label: 'Link', value: 'link' },
          { label: 'Number', value: 'number' }
        ]}
      />
      <InputField
        name="default"
        inputType="text"
        label="Default"
        componentType="input"
        data-automation="defaultInput"
        disabled={isSaving || !userHasUpdatePermission || inherited}
      />
      <ToggleField
        name="mandatory"
        label="Mandatory"
        data-automation="madatoryToggle"
        disabled={isSaving || !userHasUpdatePermission || inherited}
      />
      <FieldArray
        name="label"
        rerenderOnEveryChange
        component={LocalizationField}
        validate={value =>
          !value || value.size === 0 || value.find(a => !a.get('label') || !a.get('language')) !== undefined
            ? 'Invalid Label Data'
            : undefined
        }
        props={{ disabled: inherited || isSaving, userHasUpdatePermission, inherited }}
      />
    </form>
  );
}

ContactAttributesForm.propTypes = {
  key: PropTypes.string,
  isSaving: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  inherited: PropTypes.bool,
  selectedEntityId: PropTypes.string
};

LocalizationField.propTypes = {
  disabled: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
