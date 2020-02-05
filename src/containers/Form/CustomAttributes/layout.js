/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField, ToggleField } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const StyledInputField = styled(InputField)`
  ${props =>
    !props.isCreatingNewAtrribute && (props.fieldVal === 'nil' || props.fieldVal === '') && 'color: rgba(0,0,0,0.6);'};
`;

const StyledToggleField = styled(ToggleField)`
  margin-bottom: 15px;
`;

export default function CustomAttributesForm({
  key,
  isSaving,
  inherited,
  handleSubmit,
  userHasUpdatePermission,
  isCreatingNewAtrribute,
  initialValueFieldVal
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <DetailWrapper open={true} data-automation="detailsSVG">
          <WrappedDetailHeader text="Details" />
          <InputField
            name="identifier"
            label="Attribute Identifier *"
            componentType="input"
            inputType="text"
            data-automation="attributeIdentifierInput"
            disabled={isSaving || inherited || !userHasUpdatePermission || !isCreatingNewAtrribute}
          />
          <InputField
            name="name"
            label="Attribute Name *"
            componentType="input"
            inputType="text"
            data-automation="attributeNameInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="description"
            label="Description"
            componentType="input"
            inputType="text"
            data-automation="descriptionInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <SelectField
            name="dataType"
            label="Data Type"
            options={[{ label: 'Text', value: 'text' }]}
            data-automation="dataTypeList"
            disabled={true}
            required
          />
        </DetailWrapper>

        <DetailWrapper open={true} data-automation="textOptionsSVG">
          <WrappedDetailHeader text="Text Options" />
          <StyledInputField
            name="initialValue"
            label="Initial Value"
            componentType="input"
            inputType="text"
            data-automation="initialValueInput"
            fieldVal={initialValueFieldVal}
            isCreatingNewAtrribute={isCreatingNewAtrribute}
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="defaultValue"
            label="Default Value"
            componentType="input"
            inputType="text"
            data-automation="defaultValueInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
        </DetailWrapper>

        <DetailWrapper open={true} data-automation="availabilitySVG">
          <WrappedDetailHeader text="Availability" />
          <StyledToggleField
            name="realtime"
            label="Available for Realtime Reporting"
            labelWidth="250px"
            labelMargin="0px"
            data-automation="realtimeToggle"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <StyledToggleField
            name="historical"
            label="Available for Historical Reporting"
            labelWidth="250px"
            labelMargin="0px"
            data-automation="historicalToggle"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
        </DetailWrapper>
      </Wrapper>
    </form>
  );
}

CustomAttributesForm.propTypes = {
  key: PropTypes.string,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  isCreatingNewAtrribute: PropTypes.bool,
  initialValueFieldVal: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
