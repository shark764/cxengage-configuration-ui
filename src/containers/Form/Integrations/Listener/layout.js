/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * IntegrationListenerLayout
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputField, ToggleField, SidePanelActions } from 'cx-ui-components';
import styled from 'styled-components';
import IntegrationListenerForm from './form';

const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
  display: inline-block;
`;

const Wrapper = styled.div`
  max-height: 50vh;
  overflow: auto;
  margin-bottom: 10px;
`;

export default function IntegrationListenerLayout(props) {
  return (
    <form onSubmit={props.handleSubmit} key={props.key}>
      <Fragment>
        <Header>{`${props.initialValues.get('id') ? 'Updating Listener' : 'Creating new Listener'}`}</Header>
      </Fragment>

      <Wrapper>
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          data-automation="integrationListenersName"
          disabled={props.isSaving}
        />
        <ToggleField
          name="active"
          label="Active"
          data-automation="integrationListenersActive"
          disabled={props.isSaving}
        />

        <IntegrationListenerForm
          isSaving={props.isSaving}
          key={props.key}
          initialValues={props.initialValues}
          integrationType={props.integrationType}
        />
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

IntegrationListenerLayout.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  isSaving: PropTypes.bool,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  integrationType: PropTypes.string
};
