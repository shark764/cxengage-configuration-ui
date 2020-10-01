/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FlowsForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField, DetailsPanelAlert, Confirmation } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default class FlowsForm extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      flowType: 'customer'
    };
  }

  handleChange = e => {
    if (
      this.props.initialValues.get('id') === undefined ||
      e.target.value === 'resource' ||
      e.target.value === this.props.initialValues.get('type')
    ) {
      this.props.change('type', e.target.value);
    } else {
      this.setState({ isModalOpen: true, flowType: e.target.value });
    }
  };

  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    const { handleSubmit, initialValues, isSaving, userHasUpdatePermission, versions, key, change } = this.props;
    return (
      <form onSubmit={handleSubmit} key={key}>
        <Wrapper>
          {initialValues.get('id') !== undefined &&
            versions.length === 0 && (
              <DetailsPanelAlert text="Must have an active version before a flow can be enabled" />
            )}
          <DetailWrapper open={true} data-automation="flowDetailsSVG">
            <WrappedDetailHeader text="Details" />
            <InputField
              name="name"
              label="Name *"
              componentType="input"
              inputType="text"
              data-automation="nameInput"
              disabled={isSaving || !userHasUpdatePermission}
            />
            <InputField
              name="description"
              label="Description"
              componentType="textarea"
              inputType="text"
              data-automation="descriptionInput"
              disabled={isSaving || !userHasUpdatePermission}
            />
          </DetailWrapper>

          <DetailWrapper open={true} data-automation="flowPropertiesSVG">
            <WrappedDetailHeader text="Properties" />
            <SelectField
              name="type"
              label="Type *"
              placeholder="Select a type..."
              disabled={isSaving || !userHasUpdatePermission}
              data-automation="typeList"
              options={[
                { label: 'Customer', value: 'customer' },
                { label: 'Resource', value: 'resource' },
                { label: 'Reusable', value: 'reusable' }
              ]}
              required
              handleChange={this.handleChange}
            />
            {this.state.isModalOpen && (
              <Confirmation
                onMaskClick={this.handleModalClose}
                cancelBtnCallback={this.handleModalClose}
                confirmBtnCallback={() => change('type', this.state.flowType) && this.handleModalClose()}
                mainText={`If you change the flow type, it may become unusable. Make sure "Flow Defaults" are provided.`}
                secondaryText="Are you sure you want to continue?"
              />
            )}
            {initialValues.get('id') !== undefined && (
              <SelectField
                name="activeVersion"
                label="Active Version *"
                placeholder="Select a version..."
                options={versions}
                data-automation="versionList"
                disabled={isSaving || versions.length === 0 || !userHasUpdatePermission}
                required
              />
            )}
          </DetailWrapper>
        </Wrapper>
      </form>
    );
  }
}

FlowsForm.propTypes = {
  key: PropTypes.string,
  initialValues: PropTypes.object,
  versions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  change: PropTypes.func
};

FlowsForm.defaultProps = {
  versions: []
};
