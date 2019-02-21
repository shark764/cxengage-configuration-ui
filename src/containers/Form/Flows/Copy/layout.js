/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ListItemsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputField, SidePanelActions } from 'cx-ui-components';
import styled from 'styled-components';

const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
  display: inline-block;
`;
const Item = styled.h3`
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

const Wrapper = styled.div`
  max-height: 50vh;
  overflow: auto;
  margin-bottom: 10px;
`;

export default function ListItemsForm(props) {
  return (
    <form onSubmit={props.handleSubmit} key={props.key} id="frm-copy-flow">
      <Fragment>
        <Header>{`${props.subEntityId === 'drafts' ? 'Creating new Draft for' : 'Copying Flow'}: `}</Header>
        <Item title={props.flowName}>{props.flowName}</Item>
      </Fragment>
      <Wrapper>
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          automation="flowsCopyFormFieldName"
          disabled={props.isSaving}
        />
        {!(props.subEntityId === 'drafts' && props.subEntityName === 'versions') && (
          <InputField
            name="description"
            label="Description"
            componentType="textarea"
            inputType="text"
            automation="flowsCopyFormFieldDescription"
            disabled={props.isSaving}
          />
        )}
      </Wrapper>
      <SidePanelActions
        onCancel={props.onCancel}
        isSaving={props.isSaving}
        pristine={props.pristine}
        invalid={props.invalid}
      />
    </form>
  );
}

ListItemsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  subEntityId: PropTypes.string,
  subEntityName: PropTypes.string,
  flowName: PropTypes.string,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool
};
