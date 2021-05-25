/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FacebookIntegrationsForm
 *
 */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, DetailsPanelMessage, InputField, SelectField, Detail, Button } from 'cx-ui-components';
import styled from 'styled-components';

const FacebookLoginButton = styled(Button)`
  display: block;
  margin-left: 160px;
  margin-top: 5px;
  padding: 5px;
`;


export default class FacebookIntegrationsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fbLoginFailed: false
    };
  };

  //validates the format of the facebook app id with a regular expression
  isFbAppIdFormatValid = (fbAppId) => {
    if (fbAppId) {
      return /^([0-9]){15,}$/.test(fbAppId);
    }
    return false;
  };

  initFacebookSdk = (nodeEnv) => {
    // load facebook sdk script
    if (nodeEnv !== 'test') {
      (function (d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  };

  login = (e) => {
    e.preventDefault();
    // init facebook sdk with user app id in form
    window.FB.init({
      appId: this.props.fbAppId,
      cookie: true,
      xfbml: true,
      version: 'v10.0'
    });

    // login with facebook then authenticate with the API to get a user auth token
    window.FB.login(authResponse  => {
      if (authResponse && authResponse.status === 'connected') {
        this.setState({ fbLoginFailed: false });
        this.props.change('facebookUserAccessToken', authResponse.authResponse.accessToken);
      } else {
        this.setState({ fbLoginFailed: true });
      }
    }, {scope: 'pages_show_list,pages_messaging,pages_manage_metadata,public_profile'});
  };

  componentDidMount() {
    this.initFacebookSdk(process.env.NODE_ENV);
  }

  render() {
    const isDisabled = this.props.isSaving || !this.props.userHasUpdatePermission;
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <DetailHeader text="Details" />
        <InputField
          name="name"
          label="Name *"
          componentType="input"
          inputType="text"
          placeholder="Enter a name..."
          data-automation="nameInput"
          disabled={isDisabled}
          required
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          placeholder="Enter a description..."
          data-automation="descriptionInput"
          disabled={isDisabled}
        />
        <InputField
          name="clientDisconnectMinutes"
          label="Disconnect Time"
          data-automation="clientDisconnectMinutesInput"
          labelHelpText="(minutes)"
          inputType="text"
          disabled={isDisabled}
          componentType="input"
          dataType="number"
        />
        <DetailsPanelMessage
          text={`If Disconnect Time is left blank, the client disconnection checker will not be applied.`}
          type="info"
        />

        <DetailHeader text="Properties" />
        {!this.props.initialValues ? (
          <SelectField
            name="appId"
            label="App Id *"
            data-automation="appIdList"
            options={!this.props.digitalChannelsAppsFetching ? this.props.digitalChannelsAppIds : undefined}
            disabled={isDisabled}
          />
        ) : (
          <Fragment>
            <Detail label="App" value={this.props.app && this.props.app.get('name')} />
            <Detail label="App Id" value={this.props.app && this.props.app.get('id')} />
          </Fragment>
        )}
        {!this.props.initialValues ? (
          <InputField
            name="facebookAppId"
            label="Facebook App Id *"
            componentType="input"
            inputType="text"
            placeholder="Enter the facebook app id..."
            data-automation="appIdInput"
            disabled={isDisabled}
          />
        ) : (
          <Detail label="Facebook App Id *" value={this.props.initialValues.get('facebookAppId')} />
        )}
        <InputField
          name="facebookAppSecret"
          label={!this.props.initialValues ? "Facebook App Secret *" : "Facebook App Secret" }
          componentType="input"
          inputType="text"
          placeholder="Enter the facebook app secret..."
          data-automation="appSecretInput"
          disabled={isDisabled}
        />
        {!this.props.initialValues ? (
          <InputField
            name="facebookPageId"
            label="Facebook Page Id *"
            componentType="input"
            inputType="text"
            placeholder="Enter the id of your facebook page..."
            data-automation="pageIdInput"
            disabled={isDisabled}
          />
        ) : (
          <Detail label="Facebook Page Id *" value={this.props.initialValues.get('facebookPageId')} />
        )}
        <InputField
          name="facebookUserAccessToken"
          label={!this.props.initialValues ? "Facebook User Access Token *" : "Facebook User Access Token" }
          componentType="input"
          inputType="text"
          placeholder="Enter the access token of your facebook user..."
          data-automation="userAccessTokenInput"
          disabled={isDisabled}
        />
        <FacebookLoginButton
          onClick={(e) => this.login(e)}
          disabled={isDisabled || !this.isFbAppIdFormatValid(this.props.fbAppId)}
        >
          Generate access token with Facebook Login
        </FacebookLoginButton>

        <DetailsPanelMessage
          text={`You can manually generate a User Access Token or use the Facebook Login button above to auto generate one.`}
          type="info"
        />
        {this.props.initialValues &&
          <DetailsPanelMessage
            text={`Facebook App Secret is required to update the User Access Token`}
            type="warning"
          />
        }
        {this.state.fbLoginFailed &&
          <DetailsPanelMessage
            text={`Facebook Login failed. Please verify your credentials and that the App Id you have entered exists.`}
            type="error"
          />
        }
      </form>
    );
  }
}

FacebookIntegrationsForm.propTypes = {
  initialValues: PropTypes.object,
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  digitalChannelsAppsFetching: PropTypes.bool,
  digitalChannelsAppIds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.object
  ]),
  app: PropTypes.object,
  fbAppId: PropTypes.string,
  change: PropTypes.func,
};
