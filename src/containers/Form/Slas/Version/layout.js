/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * InitialVersionLayout
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SidePanelActions } from 'cx-ui-components';
import styled from 'styled-components';
import InitialVersionForm from './form';

const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
  display: inline-block;
`;

export default function InitialVersionLayout(props) {
  return (
    <form onSubmit={props.handleSubmit} key={props.key}>
      <Fragment>
        <Header>{`${props.viewOnly ? 'Viewing Published Version' : 'Creating new Version'}`}</Header>
      </Fragment>

      <InitialVersionForm
        isSaving={props.isSaving}
        key={props.key}
        initialValues={props.initialValues}
        slaAbandonType={props.slaAbandonType}
        viewOnly={props.viewOnly}
      />

      <SidePanelActions
        onCancel={props.onCancel}
        isSaving={props.isSaving}
        pristine={props.pristine}
        invalid={props.invalid}
      />
    </form>
  );
}

InitialVersionLayout.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  isSaving: PropTypes.bool,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  slaAbandonType: PropTypes.string,
  viewOnly: PropTypes.bool
};
