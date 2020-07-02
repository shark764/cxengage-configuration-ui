/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ApiKeysForm
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DetailHeader, InputField, SelectField, Confirmation, EyeIconSVG, ConfirmationWrapper } from 'cx-ui-components';

const ButtonShowHide = styled.button`
  position: absolute !important;
  font-size: 14px;
  padding: 7px 15px;
  border: 0px #cccccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  color: black;
  background-color: white;
`;

const ButtonDeleteKey = styled.button`
  position: absolute;
  margin-left: 30%;
  font-size: 14px;
  padding: 7px 15px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  color: #07487a;
  background-color: white;
`;

const Title = styled.h3`
  text-align: left;
`;

const TextSecret = styled.p`
  text-align: left;
`;

const TextWarning = styled.p`
  color: red;
  text-align: justify;
`;

export default class ApiKeysForm extends Component {
  constructor() {
    super();
    this.state = {
      typeInput: 'password',
      icon: 'close'
    };
    this.ShowPassword = this.ShowPassword.bind(this);
  }

  ShowPassword() {
    if (this.state) {
      if (this.state.typeInput === 'password') {
        this.setState({ typeInput: 'string', icon: 'open' });
      } else {
        this.setState({ typeInput: 'password', icon: 'close' });
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key} id="frm-apikey">
        <DetailHeader text="Details" />
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          placeholder=""
          data-automation="nameInput"
          disabled={this.props.isSaving || this.props.inherited ||
            !this.props.userHasUpdatePermission}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          data-automation="descriptionInput"
          disabled={this.props.isSaving || this.props.inherited ||
            !this.props.userHasUpdatePermission}
        />
        <SelectField
          name="roleId"
          label="Role *"
          placeholder="Select a role..."
          disabled={this.props.isSaving || this.props.inherited ||
            !this.props.userHasUpdatePermission}
          options={this.props.roles}
          data-automation="roleList"
          required
        />
        {this.props.update &&
          this.props.initialValues.get('secret') && (
            <Confirmation cancelBtnCallback={this.props.removeSecretApiKey} openPopupBox cancelBtnText="OK">
              <Fragment>
                <Fragment>
                  <Title>API Key</Title>
                  <TextSecret>{this.props.initialValues.get('id')}</TextSecret>
                </Fragment>
                <Fragment>
                  <Title>API Key Secret</Title>
                  <TextSecret>{this.props.initialValues.get('secret')}</TextSecret>
                </Fragment>
                <TextWarning>
                  {
                    ' Retain this secret in a safe place and do not share it. You cannot request/view this secret again.'
                  }
                </TextWarning>
              </Fragment>
            </Confirmation>
          )}

        {this.props.update && (
          <Fragment>
            <DetailHeader text="API Key" />
            <ButtonShowHide
              id="btnShowHide"
              type="button"
              onClick={this.ShowPassword}
              data-automation="showPasswordButton"
            >
              <EyeIconSVG alt="help" title="Help" size={20} icon={this.state.icon} /> Key SID
            </ButtonShowHide>

            <InputField
              name="id"
              componentType="input"
              inputType="text"
              label=""
              dataType={this.state.typeInput}
              disabled={true}
              data-automation="keyIdInput"
            />
            <ConfirmationWrapper
              confirmBtnCallback={this.props.deleteApiKey}
              mainText={'Deleting this API Key will revoke API access for any application using it.'}
              secondaryText={'Do you want to continue?'}
              data-automation="deleteKeyConfirmationWrapper"
            >
              {this.props.userHasUpdatePermission &&
              <ButtonDeleteKey id="btnDeletekey" type="button" data-automation="deleteKeyButton">
                Delete Key
              </ButtonDeleteKey>}
            </ConfirmationWrapper>
          </Fragment>
        )}
      </form>
    );
  }
}

ApiKeysForm.propTypes = {
  key: PropTypes.string,
  status: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  update: PropTypes.bool,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  removeSecretApiKey: PropTypes.func,
  deleteApiKey: PropTypes.func,
  initialValues: PropTypes.object,
  userHasUpdatePermission: PropTypes.bool
};

ApiKeysForm.defaultProps = {
  update: false,
  status: 'enabled'
};
