import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
background-color: #FFFFFF;
border: 1px solid #CCCCCC;
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
background: #FFFFFF;
padding: 10px 6px 10px 5px;
text-decoration: none;
`;

const ClickMask = styled.div`
position: fixed;
top: 0px;
width: 100%;
height: 100%
`;


class Navigation extends Component {

  constructor(props) {
    super();
    this.state = {
      visibleMenu: 'none',
      clickMask: false,
    };
  }

  setVisibleMenu = e =>
    this.setState({
      visibleMenu: e.currentTarget.textContent,
      clickMask: true,
    });

  closeAllMenus = e =>
    this.setState({
      visibleMenu: 'none',
      clickMask: false,
    });

  render() {
    return this.props.authenticatedAndBrandingReady && (
      <NavBar>
        <Selector value={this.props.currentTenantId} onChange={e => {
          cxSetTenant(e.target.value, response => {
            this.props.switchTenant(response.tenantId)
          });
        }}>
          {this.props.tenants.filter(tenant => tenant.tenantActive).map(tenant =>
            (<StyledOption value={tenant.tenantId} key={tenant.tenantId}>{tenant.tenantName}</StyledOption>)
          )}
        </Selector>

        <Divider />


        <NavbarMenu onClick={this.setVisibleMenu} >
          User Management
          {this.state.visibleMenu === 'User Management' &&
            <SubMenu>
              <StyledLink automation="navigation-link-users" to="/configuration/users">Users</StyledLink>
              <StyledLink automation="navigation-link-groups" to="/configuration/groups">Groups</StyledLink>
              <StyledLink automation="navigation-link-skills" to="/configuration/skills">Skills</StyledLink>
              <StyledLink automation="navigation-link-roles" to="/configuration/roles">Roles</StyledLink>
            </SubMenu>
          }
        </NavbarMenu>

        <NavbarMenu onClick={this.setVisibleMenu} >
          Configuration
          {this.state.visibleMenu === 'Configuration' &&
            <SubMenu>
              <StyledLink automation="navigation-link-lists" to="/configuration/lists">Lists</StyledLink>
              <StyledLink automation="navigation-link-customMetrics" to="/configuration/customMetrics">Statistics</StyledLink>
              <StyledLink automation="navigation-link-emailTemplates" to="/configuration/emailTemplates">User Management Emails</StyledLink>
              <StyledLink automation="navigation-link-outboundIdentifiers" to="/configuration/outboundIdentifiers">Outbound Identifiers</StyledLink>
              <StyledLink automation="navigation-link-outboundIdentifierLists" to="/configuration/outboundIdentifierLists">Outbound Identifier Lists</StyledLink>
              <StyledLink automation="navigation-link-chatWidgets" to="/configuration/chatWidgets">Chat Widgets</StyledLink>
            </SubMenu>
          }
        </NavbarMenu>

        <NavbarMenu onClick={this.setVisibleMenu} >
          Flows
          {this.state.visibleMenu === 'Flows' &&
            <SubMenu>
              <StyledLink automation="navigation-link-flows" to="/configuration/flows">Flows</StyledLink>
              <StyledLink automation="navigation-link-dispatchMappings" to="/configuration/dispatchMappings">Dispatch Mappings</StyledLink>
            </SubMenu>
          }
        </NavbarMenu>

        <NavbarMenu onClick={this.setVisibleMenu} >
          Reporting
          {this.state.visibleMenu === 'Reporting' &&
            <SubMenu>
              <StyledLink automation="navigation-link-dataAccessReports" to="/configuration/dataAccessReports">Access Controlled Reports</StyledLink>
              <StyledLink automation="navigation-link-interactionMonitoring" to="/interactionMonitoring">Interaction Monitoring</StyledLink>
            </SubMenu>
          }
        </NavbarMenu>

        {this.state.clickMask &&
          <ClickMask onClick={this.closeAllMenus}/>
        }
      </NavBar>
    );
  }
}

export default Navigation;