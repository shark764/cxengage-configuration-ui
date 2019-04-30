import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { cxSetTenant } from '../../utils/cxSdk';

const NavBar = styled.div`
  background: #00487e;
  height: 50px;
`;
const Selector = styled.select`
  color: #ccc;
  font-size: 12pt;
  background: none;
  border-radius: 5px;
  height: 40px;
  width: 200px;
  margin-left: 30px;
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
const StyledOption = styled.option`
  color: #483737;
  font-weight: 12pt;
`;
const NavbarMenu = styled.div`
  color: #ccc;
  display: inline-block;
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

class Navigation extends Component {
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
      this.props.authenticatedAndBrandingReady && (
        <NavBar>
          <Selector
            value={this.props.currentTenantId}
            onChange={e => {
              cxSetTenant(e.target.value, response => {
                this.props.switchTenant(response.tenantId);
              });
            }}
          >
            {this.props.tenants.filter(tenant => tenant.tenantActive).map(tenant => (
              <StyledOption value={tenant.tenantId} key={tenant.tenantId}>
                {tenant.tenantName}
              </StyledOption>
            ))}
          </Selector>

          <Divider />

          <NavbarMenu data-automation="userManagementMenu" onClick={this.setVisibleMenu}>
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
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu data-automation="configurationtMenu" onClick={this.setVisibleMenu}>
            Configuration
            {this.state.visibleMenu === 'Configuration' && (
              <SubMenu>
                <StyledLink data-automation="navigationLinkLists" to="/configuration/lists">
                  Lists
                </StyledLink>
                <StyledLink data-automation="navigationLinkStatistics" to="/configuration/customMetrics">
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
                <StyledLink data-automation="navigationLinkChatWidgets" to="/configuration/dispositionLists">
                  dfgdfgf
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu data-automation="flowsMenu" onClick={this.setVisibleMenu}>
            Flows
            {this.state.visibleMenu === 'Flows' && (
              <SubMenu>
                <StyledLink data-automation="navigationLinkFlows" to="/configuration/flows">
                  Flows
                </StyledLink>
                <StyledLink data-automation="navigationLinkDispatchMappings" to="/configuration/dispatchMappings">
                  Dispatch Mappings
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu data-automation="reportingMenu" onClick={this.setVisibleMenu}>
            Reporting
            {this.state.visibleMenu === 'Reporting' && (
              <SubMenu>
                <StyledLink data-automation="navigationLinkDataAccessReports" to="/configuration/dataAccessReports">
                  Access Controlled Reports
                </StyledLink>
                <StyledLink data-automation="navigationLinkInteractionMonitoring" to="/interactionMonitoring">
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

export default Navigation;

Navigation.propTypes = {
  authenticatedAndBrandingReady: PropTypes.bool,
  currentTenantId: PropTypes.string,
  switchTenant: PropTypes.func,
  tenants: PropTypes.instanceOf(Array)
};
