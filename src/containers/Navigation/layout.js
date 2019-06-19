import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cxSetTenant } from '../../utils/cxSdk';
import { isInIframe } from 'serenova-js-utils/browser';
import { Typeahead } from 'cx-ui-components';

const NavBar = styled.div`
  background: #00487e;
  ${props => props.theme.navbar && `background: ${props.theme.navbar};`} height: 50px;
`;
const Selector = styled(Typeahead)`
  height: 40px;
  margin-left: 30px;
  display: inline-block;
  position: relative;
  bottom: 9px;
`;
const Divider = styled.div`
  display: inline-block;
  position: relative;
  top: 10px;
  width: 2px;
  height: 30px;
  background-color: #ccc;
  margin-left: 30px;
`;

const NavbarMenu = styled.div`
  color: #ccc;
  ${props => props.theme.navbarText && `color: ${props.theme.navbarText};`} display: inline-block;
  margin-left: 30px;
  cursor: pointer;
  font-size: 12pt;
`;

const SubMenu = styled.div`
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-top: none;
  font-weight: normal;
  overflow-y: auto;
  position: absolute;
  padding: 6px 0;
  min-width: 200px;
  z-index: 1;
`;

const StyledLink = styled(Link)`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  border-left: 5px solid #fff;
  color: #656565;
  display: block;
  background: #ffffff;
  padding: 10px 6px 10px 5px;
  text-decoration: none;
`;

export default class Navigation extends Component {
  constructor(props) {
    super();
    this.state = {
      visibleMenu: 'none'
    };
  }

  setVisibleMenu = e =>
    this.setState({
      visibleMenu: e.currentTarget.textContent
    });

  render() {
    return (
      this.props.authenticatedAndBrandingReady &&
      isInIframe() && (
        <NavBar theme={this.props.theme}>
          <Selector
            placeholder="Select a tenant"
            options={this.props.tenants.filter(tenant => tenant.tenantActive).map(({ tenantName, tenantId }) => ({
              label: tenantName,
              value: tenantId
            }))}
            listWidth={200}
            listHeight={250}
            noSuggestionsMessage="No Options"
            onSelectedOptionChange={({ value }) => {
              if (value !== this.props.currentTenantId) {
                cxSetTenant(value, response => {
                  this.props.switchTenant(response.tenantId);
                });
              }
            }}
            selectedOption={{
              label: this.props.currentTenantName,
              value: this.props.currentTenantId
            }}
            noBackground={true}
          />

          <Divider />

          <NavbarMenu theme={this.props.theme} onClick={this.setVisibleMenu}>
            User Management
            {this.state.visibleMenu === 'User Management' && (
              <SubMenu>
                <StyledLink data-automation="navigation-link-users" to="/configuration/users">
                  Users
                </StyledLink>
                <StyledLink data-automation="navigation-link-groups" to="/configuration/groups">
                  Groups
                </StyledLink>
                <StyledLink data-automation="navigation-link-skills" to="/configuration/skills">
                  Skills
                </StyledLink>
                <StyledLink data-automation="navigation-link-roles" to="/configuration/roles">
                  Roles
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} onClick={this.setVisibleMenu}>
            Configuration
            {this.state.visibleMenu === 'Configuration' && (
              <SubMenu>
                <StyledLink data-automation="navigation-link-lists" to="/configuration/lists">
                  Lists
                </StyledLink>
                <StyledLink data-automation="navigation-link-slas" to="/configuration/slas">
                  Statistics
                </StyledLink>
                <StyledLink data-automation="navigation-link-emailTemplates" to="/configuration/emailTemplates">
                  User Management Emails
                </StyledLink>
                <StyledLink
                  data-automation="navigation-link-outboundIdentifiers"
                  to="/configuration/outboundIdentifiers"
                >
                  Outbound Identifiers
                </StyledLink>
                <StyledLink
                  data-automation="navigation-link-outboundIdentifierLists"
                  to="/configuration/outboundIdentifierLists"
                >
                  Outbound Identifier Lists
                </StyledLink>
                <StyledLink data-automation="navigation-link-chatWidgets" to="/configuration/chatWidgets">
                  Chat Widgets
                </StyledLink>
                <StyledLink data-automation="navigation-link-transferLists" to="/configuration/transferLists">
                  Transfer Lists
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} onClick={this.setVisibleMenu}>
            Flows
            {this.state.visibleMenu === 'Flows' && (
              <SubMenu>
                <StyledLink data-automation="navigation-link-flows" to="/configuration/flows">
                  Flows
                </StyledLink>
                <StyledLink data-automation="navigation-link-dispatchMappings" to="/configuration/dispatchMappings">
                  Dispatch Mappings
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} onClick={this.setVisibleMenu}>
            Reporting
            {this.state.visibleMenu === 'Reporting' && (
              <SubMenu>
                <StyledLink data-automation="navigation-link-dataAccessReports" to="/configuration/dataAccessReports">
                  Access Controlled Reports
                </StyledLink>
                <StyledLink data-automation="navigation-link-interactionMonitoring" to="/interactionMonitoring">
                  Interaction Monitoring
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>
        </NavBar>
      )
    );
  }
}

Navigation.propTypes = {
  authenticatedAndBrandingReady: PropTypes.bool.isRequired,
  currentTenantId: PropTypes.string.isRequired,
  currentTenantName: PropTypes.string.isRequired,
  switchTenant: PropTypes.func.isRequired,
  tenants: PropTypes.array.isRequired,
  theme: PropTypes.object
};
