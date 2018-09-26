/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * GenericBulkActionsForm
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RadioGroupField } from 'cx-ui-components';

const ToggleList = styled.span`
  display: flex;
  margin-bottom: 50px;
  justify-content: space-between;
  border: 1px solid #e0cdcd;
  border-radius: 5px;
  padding: 20px;
`;

const StyledCheckbox = styled.input`
  width: 15px;
  height: 15px;
`;

export default class GenericBulkActionsForm extends Component {
  constructor() {
    super();
    this.state = {
      visibleFields: {
        active: false
      }
    };
  }

  toggleField = e => {
    this.setState({ visibleFields: { active: !this.state.visibleFields.active } });
  };

  render() {
    return (
      <Fragment>
        <ToggleList>
          <span>Active</span>
          <StyledCheckbox type="checkbox" onChange={this.toggleField} value={this.state.visibleFields.active} />
        </ToggleList>
        <form onSubmit={this.props.handleSubmit} key={this.props.key}>
          {this.state.visibleFields.active && (
            <RadioGroupField
              name="active"
              label="Active"
              disabled={this.props.isSaving || this.props.inherited}
              options={[
                {
                  label: 'Enabled',
                  value: 'true'
                },
                {
                  label: 'Disabled',
                  value: 'false'
                }
              ]}
            />
          )}
        </form>
      </Fragment>
    );
  }
}

GenericBulkActionsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool
};
