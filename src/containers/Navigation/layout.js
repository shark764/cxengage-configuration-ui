import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cxSetTenant } from '../../utils/cxSdk';
import { isInIframe } from 'serenova-js-utils/browser';
import { Typeahead } from 'cx-ui-components';
import { CONFIRM_SET_ENTITY_WHEN_FORM_IS_DIRTY } from '../ConfirmationDialog/constants';

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

  setCurrentEntityAndEntityId = (entityName, e) => {
    if (this.props.isCurrentFormDirty || this.props.areSubEntityFormsDirty) {
      e.preventDefault();
      this.props.setConfirmationDialog(CONFIRM_SET_ENTITY_WHEN_FORM_IS_DIRTY, '', entityName);
    } else {
      this.props.setSelectedEntityId('');
      this.props.setCurrentEntity(entityName);
    }
  };

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
                <StyledLink
                  data-automation="navigationLinkUsers"
                  to="/configuration/users"
                  onClick={e => this.setCurrentEntityAndEntityId('users', e)}
                >
                  Users
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkGroups"
                  to="/configuration/groups"
                  onClick={e => this.setCurrentEntityAndEntityId('groups', e)}
                >
                  Groups
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkSkills"
                  to="/configuration/skills"
                  onClick={e => this.setCurrentEntityAndEntityId('skills', e)}
                >
                  Skills
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkRoles"
                  to="/configuration/roles"
                  onClick={e => this.setCurrentEntityAndEntityId('roles', e)}
                >
                  Roles
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkReasons"
                  to="/configuration/reasons"
                  onClick={e => this.setCurrentEntityAndEntityId('reasons', e)}
                >
                  Presence Reasons
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkReasonLists"
                  to="/configuration/reasonLists"
                  onClick={e => this.setCurrentEntityAndEntityId('reasonLists', e)}
                >
                  Presence Reasons Lists
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} data-automation="configurationMenu" onClick={this.setVisibleMenu}>
            Configuration
            {this.state.visibleMenu === 'Configuration' && (
              <SubMenu>
                <StyledLink
                  data-automation="navigationLinkTenants"
                  to="/configuration/tenants"
                  onClick={e => this.setCurrentEntityAndEntityId('tenants', e)}
                >
                  Tenants
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkIntegrations"
                  to="/configuration/integrations"
                  onClick={e => this.setCurrentEntityAndEntityId('integrations', e)}
                >
                  Integrations
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkLists"
                  to="/configuration/lists"
                  onClick={e => this.setCurrentEntityAndEntityId('lists', e)}
                >
                  Lists
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkSlas"
                  to="/configuration/slas"
                  onClick={e => this.setCurrentEntityAndEntityId('slas', e)}
                >
                  Statistics
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkEmailTemplates"
                  to="/configuration/emailTemplates"
                  onClick={e => this.setCurrentEntityAndEntityId('emailTemplates', e)}
                >
                  User Management Emails
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkOutboundIdentifiers"
                  to="/configuration/outboundIdentifiers"
                  onClick={e => this.setCurrentEntityAndEntityId('outboundIdentifiers', e)}
                >
                  Outbound Identifiers
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkOutboundIdentifierLists"
                  to="/configuration/outboundIdentifierLists"
                  onClick={e => this.setCurrentEntityAndEntityId('outboundIdentifierLists', e)}
                >
                  Outbound Identifier Lists
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkChatWidgets"
                  to="/configuration/chatWidgets"
                  onClick={e => this.setCurrentEntityAndEntityId('chatWidgets', e)}
                >
                  Chat Widgets
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkTransferLists"
                  to="/configuration/transferLists"
                  onClick={e => this.setCurrentEntityAndEntityId('transferLists', e)}
                >
                  Transfer Lists
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkApiKeys"
                  to="/configuration/apiKeys"
                  onClick={e => this.setCurrentEntityAndEntityId('apiKeys', e)}
                >
                  Api Keys
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkMessageTemplates"
                  to="/configuration/messageTemplates"
                  onClick={e => this.setCurrentEntityAndEntityId('messageTemplates', e)}
                >
                  Message Templates
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkBusinessHours"
                  to="/configuration/businessHours"
                  onClick={e => this.setCurrentEntityAndEntityId('businessHours', e)}
                >
                  Business Hours
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} data-automation="flowsMenu" onClick={this.setVisibleMenu}>
            Flows
            {this.state.visibleMenu === 'Flows' && (
              <SubMenu>
                <StyledLink
                  data-automation="navigationLinkFlows"
                  to="/configuration/flows"
                  onClick={e => this.setCurrentEntityAndEntityId('flows', e)}
                >
                  Flows
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkDispositions"
                  to="/configuration/dispositions"
                  onClick={e => this.setCurrentEntityAndEntityId('dispositions', e)}
                >
                  Dispositions
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkDispositionLists"
                  to="/configuration/dispositionLists"
                  onClick={e => this.setCurrentEntityAndEntityId('dispositionLists', e)}
                >
                  Disposition Lists
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkFlowDebugger"
                  to="/flowDebugLogs"
                  onClick={e => this.setCurrentEntityAndEntityId('flowDebugLogs', e)}
                >
                  Flow Debug Logs
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkDispatchMappings"
                  to="/configuration/dispatchMappings"
                  onClick={e => this.setCurrentEntityAndEntityId('dispatchMappings', e)}
                >
                  Dispatch Mappings
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkCustomAttributes"
                  to="/configuration/customAttributes"
                  onClick={e => this.setCurrentEntityAndEntityId('customAttributes', e)}
                >
                  Custom Attributes
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} data-automation="reportingMenu" onClick={this.setVisibleMenu}>
            Reporting
            {this.state.visibleMenu === 'Reporting' && (
              <SubMenu>
                <StyledLink
                  data-automation="navigationLinkDataAccessReports"
                  to="/configuration/dataAccessReports"
                  onClick={e => this.setCurrentEntityAndEntityId('dataAccessReports', e)}
                >
                  Access Controlled Reports
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkInteractionMonitoring"
                  to="/interactionMonitoring"
                  onClick={e => this.setCurrentEntityAndEntityId('interactionMonitoring', e)}
                >
                  Interaction Monitoring
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkAgentStateMonitoring"
                  to="/agentStateMonitoring"
                  onClick={e => this.setCurrentEntityAndEntityId('agentStateMonitoring', e)}
                >
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
  theme: PropTypes.object,
  setCurrentEntity: PropTypes.func.isRequired,
  setSelectedEntityId: PropTypes.func.isRequired,
  setConfirmationDialog: PropTypes.func,
  isCurrentFormDirty: PropTypes.bool,
  areSubEntityFormsDirty: PropTypes.bool
};
