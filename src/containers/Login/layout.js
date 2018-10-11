import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isInIframe } from 'serenova-js-utils/browser';
import styled from 'styled-components';
import { LoadingSpinnerSVG } from 'cx-ui-components';

import { cxSetTenant, cxLogin, cxInit } from '../../utils/cxSdk';
import { updateUserPermissions } from '../../redux/modules/userData';

const Loading = styled(LoadingSpinnerSVG)`
  position: absolute;
  top: calc(50% - ${props => props.size / 2}px);
  left: calc(50% - ${props => props.size / 2}px);
`;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      initalAuth: false,
      username: '',
      password: '',
      tenants: [],
      selectedTenant: ''
    };
  }
  componentDidMount() {
    if (isInIframe()) {
      cxInit();
    } else {
      this.props.fetchBranding();
    }
  }

  login = () =>
    cxLogin(this.state.username, this.state.password, response => {
      const { userId, defaultTenant } = response;
      const { tenantId, tenantPermissions, tenantName } = response.tenants.filter(
        tenant => tenant.tenantId === response.defaultTenant
      )[0];
      updateUserPermissions({ tenantId, tenantName, tenantPermissions, userId });

      cxSetTenant(defaultTenant, () => {
        this.props.toggleUserAuthed();
        this.props.fetchBranding();
      });

      this.setState({
        initalAuth: true,
        tenants: response.tenants.map(x => ({
          tenantId: x.tenantId,
          tenantName: x.tenantName
        }))
      });
    });

  chooseTenant = () =>
    cxSetTenant(this.state.selectedTenant, () => {
      this.props.toggleUserAuthed();
      this.props.fetchBranding();
    });

  setUsername = e =>
    this.setState({
      username: e.target.value
    });
  setPassword = e =>
    this.setState({
      password: e.target.value
    });
  setTenant = e =>
    this.setState({
      selectedTenant: e.target.value
    });

  render() {
    if (isInIframe() && !this.props.hasStarted) {
      return (
        <Fragment>
          <input placeholder="Username" type="email" onChange={this.setUsername} value={this.state.username} />
          <br />
          <input placeholder="Password" type="password" onChange={this.setPassword} value={this.state.password} />
          <br />
          <button onClick={this.login}>Sign In</button>
          <br />
          <select
            onChange={this.setTenant}
            defaultValue={this.state.tenants.length > 0 ? this.state.tenants[0].tenantId : null}
          >
            {this.state.tenants.map(({ tenantName, tenantId }) => (
              <option label={tenantName} value={tenantId} key={tenantId} />
            ))}
          </select>
          <br />
          <button disabled={this.state.selectedTenant === ''} onClick={this.chooseTenant}>
            Choose Tenant
          </button>
        </Fragment>
      );
    } else {
      return this.props.hasStarted ? this.props.children : <Loading size={120} />;
    }
  }
}

Login.propTypes = {
  toggleUserAuthed: PropTypes.func.isRequired,
  fetchBranding: PropTypes.func.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  children: PropTypes.any
};
