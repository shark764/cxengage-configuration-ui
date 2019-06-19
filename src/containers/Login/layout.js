import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LoadingSpinnerSVG } from 'cx-ui-components';
import * as Cx from 'cx-js-sdk';
import { Logo } from 'cx-ui-components';
import { LegalCopyright, Typeahead } from 'cx-ui-components';

import { cxSetTenant, cxLogin, cxTokenLogin } from '../../utils/cxSdk';
import messages from './messages';

const Loading = styled(LoadingSpinnerSVG)`
  position: absolute;
  top: calc(50% - ${props => props.size / 2}px);
  left: calc(50% - ${props => props.size / 2}px);
`;
const TempBackground = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
  background-image: url('https://dev-config.cxengagelabs.net/assets/images/square_bg.png'),
    linear-gradient(to bottom, #0a64aa, #3498db);
  z-index: -1;
`;
const SignInTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  color: rgb(73, 73, 73);
  display: block;
  text-align: center;
  margin: 30px 0px;
`;
const LoginFormWrapper = styled.div`
  position: relative;
  top: 100px;
`;
const LoginBox = styled.div`
  width: 540px;
  height: 560px;
  margin: 0px auto;
  margin-top: calc(50vh - 270px);
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 0px 6px 0px;
  position: relative;
  z-index: 1;
`;
const LoginInput = styled.input`
  width: 282px;
  height: 44px;
  background-color: rgb(255, 255, 255);
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  color: rgb(73, 73, 73);
  outline: none;
  padding: 0px 11px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(151, 151, 151);
  margin-bottom: 10px;
  display: block;
  margin: 10px auto;
`;
const LoginButton = styled.button`
  border-radius: 8px;
  border-width: 0px;
  background-color: rgb(35, 205, 244);
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  color: rgb(255, 255, 255);
  padding: 14px 28px;
  cursor: pointer;
  outline: none;
  display: block;
  margin: 10px auto;
`;
const Selector = styled(Typeahead)`
  margin: 10px auto;
  display: block;
  height: 44px;
`;

const Prefrences = styled.div`
  display: block;
  width: 242px;
  margin: 0px auto;
`;

const Checkbox = styled.input`
  margin-left: -15px;
  margin-right: 10px;
  margin-top: 5px;
`;

const CheckboxLabel = styled.label`
  vertical-align: middle;
  color: rgb(73, 73, 73);
  font-size: 16px;
`;
const Privacy = styled.a`
  color: white;
  float: right;
  font-size: 16px;
  margin-right: 10px;
  margin-top: -15px;
  display: inline-block;
`;
const LegalPolicy = styled.div`
  margin-top: 8em;
`;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      initalAuth: false,
      username: this.rememberedEmail(),
      password: '',
      tenants: [],
      selectedTenant: null,
      token: undefined,
      platformViewOnlyCapable: false,
      loginPrefrences:
        (localStorage.getItem('loginPrefrences') && JSON.parse(localStorage.getItem('loginPrefrences'))) || {}
    };
  }
  componentDidMount() {
    if (!this.props.authenticated) {
      const token = sessionStorage.getItem('token');
      if (token) {
        this.login(token, response => this.handleLoginResponse(response));
      }
    }
  }

  rememberedEmail() {
    if (localStorage.getItem('loginPrefrences')) {
      const prefs = JSON.parse(localStorage.getItem('loginPrefrences'));
      if (prefs.remember) {
        return localStorage.getItem('email');
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  fetchAllTenants() {
    Cx.reuseToken({ token: sessionStorage.getItem('token') });
    Cx.regions().then(d =>
      Cx.allTenants(d[0].id).then(d => {
        const updatedTenantList = d.map(tenant => ({
          tenantId: tenant.id,
          tenantName: tenant.name
        }));
        this.setState({ tenants: updatedTenantList });
      })
    );
  }

  handleLoginResponse(response) {
    if (response.code && (response.code === 3002 || response.code === 3000)) {
      return alert('Wrong username or password , or logged out due to inactivity.');
    }
    let defaultTenantObject;
    const { defaultTenant, tenants, platformPermissions, userId } = response;
    // Users do not have a 'default tenant' by default
    if (defaultTenant) {
      defaultTenantObject = response.tenants.filter(tenant => tenant.tenantId === response.defaultTenant)[0];
    } else {
      defaultTenantObject = response.tenants[0];
    }
    sessionStorage.setItem('token', CxEngage.dumpState().authentication.token);
    sessionStorage.setItem('defaultTenant', defaultTenant);
    const isPlatformViewCapable = platformPermissions.includes('PLATFORM_VIEW_ALL_TENANTS');

    this.props.updateUserPermissions(
      defaultTenantObject.tenantId,
      defaultTenantObject.tenantName,
      defaultTenantObject.tenantPermissions,
      userId
    );
    this.props.updateTenantsList(tenants);
    this.props.updatePlatformPermissions(platformPermissions);

    this.setState({
      initalAuth: true,
      selectedTenant: {
        label: defaultTenantObject.tenantName,
        value: defaultTenantObject.tenantId
      },
      platformViewOnlyCapable: isPlatformViewCapable,
      tenants: response.tenants.map(x => ({
        tenantId: x.tenantId,
        tenantName: x.tenantName
      }))
    });

    if (this.state.platformViewOnlyCapable) {
      this.props.toggleUserAuthed();
    } else {
      this.props.toggleUserAuthed();
      this.chooseTenant();
    }
  }

  login = token => {
    if (token) {
      cxTokenLogin(token, response => {
        this.handleLoginResponse(response);
      });
    } else {
      if (this.state.loginPrefrences.remember) {
        localStorage.setItem('email', this.state.username);
      } else {
        localStorage.setItem('email', '');
      }
      cxLogin(this.state.username, this.state.password, response => {
        this.handleLoginResponse(response);
      });
    }
  };

  chooseTenant = () => {
    cxSetTenant(this.state.selectedTenant.value, response => {
      this.props.switchTenant(response.tenantId);
      this.props.fetchBranding();
    });
  };

  setUsername = e => {
    this.setState({
      username: e.target.value
    });
  };
  setPassword = e =>
    this.setState({
      password: e.target.value
    });
  setTenant = selectedOption =>
    this.setState({
      selectedTenant: selectedOption
    });

  lgoinPrefrences = ({ target: { name, checked } }) => {
    if (name === 'platform' && checked) {
      return this.fetchAllTenants();
    } else {
      const prefrences = {
        ...this.state.loginPrefrences,
        [name]: checked
      };
      this.setState({ loginPrefrences: prefrences });
      localStorage.setItem('loginPrefrences', JSON.stringify(prefrences));
    }
  };

  onEnterKey = ({ key }) => (key === 'Enter' ? this.login() : undefined);

  render() {
    if (!this.props.insideIframe && !this.props.hasStarted) {
      return (
        <Fragment>
          <LoginBox>
            <LoginFormWrapper>
              <Logo />
              {!this.props.authenticated && (
                <div>
                  <SignInTitle>Sign in to CxEngage</SignInTitle>
                  <LoginInput
                    data-automation="username"
                    placeholder="Username"
                    type="email"
                    onChange={this.setUsername}
                    value={this.state.username}
                  />
                  {!this.state.loginPrefrences.sso && (
                    <LoginInput
                      data-automation="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.setPassword}
                      value={this.state.password}
                      onKeyDown={this.onEnterKey}
                    />
                  )}

                  <Prefrences>
                    <Checkbox
                      type="checkbox"
                      data-automation="remember"
                      name="remember"
                      onChange={this.lgoinPrefrences}
                      value={this.state.loginPrefrences.remember}
                      checked={this.state.loginPrefrences.remember}
                    />
                    <CheckboxLabel for="remember">Remember Me</CheckboxLabel> <br />
                    <Checkbox
                      type="checkbox"
                      data-automation="sso"
                      name="sso"
                      onChange={this.lgoinPrefrences}
                      value={this.state.loginPrefrences.sso}
                      checked={this.state.loginPrefrences.sso}
                    />
                    <CheckboxLabel for="sso">Sign in with SSO</CheckboxLabel> <br />
                  </Prefrences>

                  <LoginButton data-automation="signInButton" onClick={() => this.login()}>
                    Sign In
                  </LoginButton>
                </div>
              )}

              {this.props.authenticated && (
                <div>
                  <SignInTitle>Select a tenant</SignInTitle>
                  <Selector
                    data-automation="tenantSelect"
                    placeholder="Select a tenant"
                    options={this.state.tenants.map(({ tenantName, tenantId }) => ({
                      label: tenantName,
                      value: tenantId
                    }))}
                    listWidth={282}
                    listHeight={250}
                    noSuggestionsMessage="No Options"
                    onSelectedOptionChange={this.setTenant}
                    selectedOption={this.state.selectedTenant}
                    noBackground={false}
                  />
                  <Prefrences>
                    <Checkbox
                      type="checkbox"
                      data-automation="platform"
                      name="platform"
                      onChange={this.lgoinPrefrences}
                      value={this.state.loginPrefrences.platform}
                    />
                    <CheckboxLabel for="platform">Platform admin view-only mode</CheckboxLabel> <br />
                  </Prefrences>
                  <LoginButton
                    data-automation="chooseTenantButton"
                    disabled={!this.state.selectedTenant}
                    onClick={this.chooseTenant}
                  >
                    Select
                  </LoginButton>
                </div>
              )}
            </LoginFormWrapper>
          </LoginBox>
          <LegalPolicy>
            <LegalCopyright />
          </LegalPolicy>
          <Privacy target="blank" href={messages.privacyLink.defaultMessage}>
            <a> {messages.privacy.defaultMessage} </a>
          </Privacy>
          <TempBackground />
        </Fragment>
      );
    } else if (!this.props.insideIframe && this.props.hasStarted) {
      return <Redirect to="/configuration/users" />;
    } else {
      return <Loading size={120} />;
    }
  }
}

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  toggleUserAuthed: PropTypes.func.isRequired,
  fetchBranding: PropTypes.func.isRequired,
  updateTenantsList: PropTypes.func.isRequired,
  updateUserPermissions: PropTypes.func.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  children: PropTypes.any,
  insideIframe: PropTypes.bool.isRequired,
  updatePlatformPermissions: PropTypes.func,
  switchTenant: PropTypes.func.isRequired
};
