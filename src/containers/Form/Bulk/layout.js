/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * GenericBulkActionsForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RadioGroupField, Toggle } from 'cx-ui-components';

const Container = styled.div`
  border: 1px solid #e0cdcd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 0px;
  margin-left: 0px;
`;

const ToggleList = styled.span`
  display: flex;
  justify-content: space-between;
`;

const StyledToggle = styled(Toggle)`
  width: 15px;
  height: 15px;
  margin-right: 25px;
`;

const Options = styled.div`
  margin-top: 10px;
  margin-bottom: -10px;
  margin-left: 10px;
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
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <Container>
          <ToggleList>
            <span>Active</span>
            <StyledToggle
              onChange={this.toggleField}
              value={this.state.visibleFields.active}
              data-automation="bulkActiveToggle"
            />
          </ToggleList>
          {this.state.visibleFields.active && (
            <Options>
              <RadioGroupField
                name="active"
                label="Active"
                disabled={this.props.isSaving || this.props.isBulkUpdating}
                options={[{ label: 'Enabled', value: true }, { label: 'Disabled', value: false }]}
                data-automation="bulkActiveChoose"
              />
            </Options>
          )}
        </Container>
      </form>
    );
  }
}

GenericBulkActionsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  isBulkUpdating: PropTypes.bool
};
