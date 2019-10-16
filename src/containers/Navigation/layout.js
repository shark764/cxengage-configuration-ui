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

          <NavbarMenu theme={this.props.theme} data-automation="userManagementMenu" onClick={this.setVisibleMenu}>
            User Management
            {this.state.visibleMenu === 'User Management' && (
              <SubMenu>
                <StyledLink data-automation="navigationLinkUsers" to="/configuration/users">
                  Users
                </StyledLink>
                <StyledLink data-automation="navigationLinkGroups" to="/configuration/groups">
                  Groups
                </StyledLink>
                <StyledLink data-automation="navigationLinkSkills" to="/configuration/skills">
                  Skills
                </StyledLink>
                <StyledLink data-automation="navigationLinkRoles" to="/configuration/roles">
                  Roles
                </StyledLink>
                <StyledLink data-automation="navigationLinkReasons" to="/configuration/reasons">
                  Presence Reasons
                </StyledLink>
                <StyledLink data-automation="navigationLinkReasonsList" to="/configuration/reasonLists">
                  Presence Reasons Lists
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>
          <NavbarMenu theme={this.props.theme} data-automation="configurationMenu" onClick={this.setVisibleMenu}>
            Configuration
            {this.state.visibleMenu === 'Configuration' && (
              <SubMenu>
                <StyledLink data-automation="navigationLinkTenants" to="/configuration/tenants">
                  Tenants
                </StyledLink>
                <StyledLink data-automation="navigationLinkLists" to="/configuration/lists">
                  Lists
                </StyledLink>
                <StyledLink data-automation="navigationLinkSlas" to="/configuration/slas">
                  Statistics
                </StyledLink>
                <StyledLink data-automation="navigationLinkEmailTemplates" to="/configuration/emailTemplates">
                  User Management Emails
                </StyledLink>
                <StyledLink data-automation="navigationLinkOutboundIdentifiers" to="/configuration/outboundIdentifiers">
                  Outbound Identifiers
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkOutboundIdentifierLists"
                  to="/configuration/outboundIdentifierLists"
                >
                  Outbound Identifier Lists
                </StyledLink>
                <StyledLink data-automation="navigationLinkChatWidgets" to="/configuration/chatWidgets">
                  Chat Widgets
                </StyledLink>
                <StyledLink data-automation="navigationLinkTransferLists" to="/configuration/transferLists">
                  Transfer Lists
                </StyledLink>
                <StyledLink data-automation="navigationLinkApiKeys" to="/configuration/apiKeys">
                  Api Keys
                </StyledLink>
                <StyledLink data-automation="navigationLinkMessageTemplates" to="/configuration/messageTemplates">
                  Message Templates
                </StyledLink>
                <StyledLink data-automation="navigationLinkBusinessHours" to="/configuration/businessHours">
                  Business Hours
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} data-automation="flowsMenu" onClick={this.setVisibleMenu}>
            Flows
            {this.state.visibleMenu === 'Flows' && (
              <SubMenu>
                <StyledLink data-automation="navigationLinkFlows" to="/configuration/flows">
                  Flows
                </StyledLink>
                <StyledLink data-automation="navigationLinkFlowDebugger" to="/flowDebugLogs">
                  Flow Debug Logs
                </StyledLink>
                <StyledLink data-automation="navigationLinkDispatchMappings" to="/configuration/dispatchMappings">
                  Dispatch Mappings
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} data-automation="reportingMenu" onClick={this.setVisibleMenu}>
            Reporting
            {this.state.visibleMenu === 'Reporting' && (
              <SubMenu>
                <StyledLink data-automation="navigationLinkDataAccessReports" to="/configuration/dataAccessReports">
                  Access Controlled Reports
                </StyledLink>
                <StyledLink data-automation="navigationLinkInteractionMonitoring" to="/interactionMonitoring">
                  Interaction Monitoring
                </StyledLink>
                <StyledLink data-automation="navigationLinkAgentStateMonitoring" to="/agentStateMonitoring">
                  Agent State Monitoring
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
