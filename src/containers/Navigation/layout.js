import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cxSetTenant } from '../../utils/cxSdk';
import { isInIframe } from 'serenova-js-utils/browser';
import { Typeahead, SettingIconSVG } from 'cx-ui-components';
import { CONFIRM_SET_ENTITY_WHEN_FORM_IS_DIRTY } from '../ConfirmationDialog/constants';
import { FormattedMessage } from 'react-intl';

const NavBar = styled.div`
  background: #00487e;
  ${(props) => props.theme.navbar && `background: ${props.theme.navbar};`} height: 50px;
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
  ${(props) => props.theme.navbarText && `color: ${props.theme.navbarText};`} display: inline-block;
  margin-left: 30px;
  cursor: pointer;
  font-size: 12pt;
`;

const Settings = styled.div`
  display: inline-block;
  float: right;
  padding: 14px;
  cursor: pointer;
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
  ${(props) => props.right && `right: ${props.right}`};
  ${(props) => props.left && `left: ${props.left}`};
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

const Welcome = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  border-left: 5px solid #fff;
  color: #656565;
  display: block;
  background: #ffffff;
  padding: 10px 6px 10px 5px;
`;

export default class Navigation extends Component {
  constructor(props) {
    super();
    this.state = {
      visibleMenu: 'none',
    };
  }

  setVisibleMenu = (menuName) =>
    this.setState(({ visibleMenu }) => ({
      visibleMenu: visibleMenu === menuName ? 'none' : menuName,
    }));

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
            options={this.props.tenants.filter((tenant) => tenant.tenantActive).map(({ tenantName, tenantId }) => ({
              label: tenantName,
              value: tenantId,
            }))}
            listWidth={200}
            listHeight={250}
            noSuggestionsMessage="No Options"
            onSelectedOptionChange={({ value }) => {
              if (value !== this.props.currentTenantId) {
                cxSetTenant(value, (response) => {
                  this.props.switchTenant(response.tenantId);
                });
              }
            }}
            selectedOption={{
              label: this.props.currentTenantName,
              value: this.props.currentTenantId,
            }}
            noBackground={true}
          />

          <Divider />

          <NavbarMenu
            theme={this.props.theme}
            data-automation="userManagementMenu"
            onClick={() => this.setVisibleMenu('User Management')}>
            <FormattedMessage id="navigation.management" defaultMessage="User Management" />
            {this.state.visibleMenu === 'User Management' && (
              <SubMenu>
                <StyledLink
                  data-automation="navigationLinkUsers"
                  to="/configuration/users"
                  onClick={(e) => this.setCurrentEntityAndEntityId('users', e)}>
                  <FormattedMessage id="navigation.management.users" defaultMessage="Users" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkGroups"
                  to="/configuration/groups"
                  onClick={(e) => this.setCurrentEntityAndEntityId('groups', e)}>
                  <FormattedMessage id="navigation.management.groups" defaultMessage="Groups" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkSkills"
                  to="/configuration/skills"
                  onClick={(e) => this.setCurrentEntityAndEntityId('skills', e)}>
                  <FormattedMessage id="navigation.management.skills" defaultMessage="Skills" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkRoles"
                  to="/configuration/roles"
                  onClick={(e) => this.setCurrentEntityAndEntityId('roles', e)}>
                  <FormattedMessage id="navigation.management.roles" defaultMessage="Roles" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkReasons"
                  to="/configuration/reasons"
                  onClick={(e) => this.setCurrentEntityAndEntityId('reasons', e)}>
                  <FormattedMessage id="navigation.management.reasons" defaultMessage="Presence Reasons" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkReasonLists"
                  to="/configuration/reasonLists"
                  onClick={(e) => this.setCurrentEntityAndEntityId('reasonLists', e)}>
                  <FormattedMessage id="navigation.management.reasonsList" defaultMessage="Presence Reason Lists" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkCapacityRule"
                  to="/configuration/capacityRules"
                  onClick={(e) => this.setCurrentEntityAndEntityId('capacityRules', e)}>
                  <FormattedMessage id="navigation.management.capacityRules" defaultMessage="Capacity Rules" />
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu
            theme={this.props.theme}
            data-automation="configurationMenu"
            onClick={() => this.setVisibleMenu('Configuration')}>
            <FormattedMessage id="navigation.configuration" defaultMessage="Configuration" />
            {this.state.visibleMenu === 'Configuration' && (
              <SubMenu>
                <StyledLink
                  data-automation="navigationLinkTenants"
                  to="/configuration/tenants"
                  onClick={(e) => this.setCurrentEntityAndEntityId('tenants', e)}>
                  <FormattedMessage id="navigation.configuration.tenants" defaultMessage="Tenants" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkIdentityProviders"
                  to="/configuration/identityProviders"
                  onClick={(e) => this.setCurrentEntityAndEntityId('identityProviders', e)}>
                  <FormattedMessage
                    id="navigation.configuration.identityProviders"
                    defaultMessage="Identity Providers"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkIntegrations"
                  to="/configuration/integrations"
                  onClick={(e) => this.setCurrentEntityAndEntityId('integrations', e)}>
                  <FormattedMessage id="navigation.configuration.integrations" defaultMessage="Integrations" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkLists"
                  to="/configuration/lists"
                  onClick={(e) => this.setCurrentEntityAndEntityId('lists', e)}>
                  <FormattedMessage id="navigation.configuration.lists" defaultMessage="Lists" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkSlas"
                  to="/configuration/slas"
                  onClick={(e) => this.setCurrentEntityAndEntityId('slas', e)}>
                  <FormattedMessage id="navigation.configuration.slas" defaultMessage="Statistics" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkEmailTemplates"
                  to="/configuration/emailTemplates"
                  onClick={(e) => this.setCurrentEntityAndEntityId('emailTemplates', e)}>
                  <FormattedMessage
                    id="navigation.configuration.emailTemplates"
                    defaultMessage="User Management Emails"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkOutboundIdentifiers"
                  to="/configuration/outboundIdentifiers"
                  onClick={(e) => this.setCurrentEntityAndEntityId('outboundIdentifiers', e)}>
                  <FormattedMessage
                    id="navigation.configuration.outboundIdentifiers"
                    defaultMessage="Outbound Identifiers"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkOutboundIdentifierLists"
                  to="/configuration/outboundIdentifierLists"
                  onClick={(e) => this.setCurrentEntityAndEntityId('outboundIdentifierLists', e)}>
                  <FormattedMessage
                    id="navigation.configuration.outboundIdentifierLists"
                    defaultMessage="Outbound Identifier Lists"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkChatWidgets"
                  to="/configuration/chatWidgets"
                  onClick={(e) => this.setCurrentEntityAndEntityId('chatWidgets', e)}>
                  <FormattedMessage id="navigation.configuration.chatWidgets" defaultMessage="Chat Widgets" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkWhatsappIntegrations"
                  to="/configuration/whatsappIntegrations"
                  onClick={(e) => this.setCurrentEntityAndEntityId('whatsappIntegrations', e)}>
                  <FormattedMessage
                    id="navigation.configuration.whatsappIntegrations"
                    defaultMessage="Whatsapp Integrations"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkTransferLists"
                  to="/configuration/transferLists"
                  onClick={(e) => this.setCurrentEntityAndEntityId('transferLists', e)}>
                  <FormattedMessage id="navigation.configuration.transferLists" defaultMessage="Transfer Lists" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkApiKeys"
                  to="/configuration/apiKeys"
                  onClick={(e) => this.setCurrentEntityAndEntityId('apiKeys', e)}>
                  <FormattedMessage id="navigation.configuration.apiKeys" defaultMessage="API Key Management" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkMessageTemplates"
                  to="/configuration/messageTemplates"
                  onClick={(e) => this.setCurrentEntityAndEntityId('messageTemplates', e)}>
                  <FormattedMessage id="navigation.configuration.messageTemplates" defaultMessage="Message Templates" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkBusinessHours"
                  to="/configuration/businessHours"
                  onClick={(e) => this.setCurrentEntityAndEntityId('businessHours', e)}>
                  <FormattedMessage id="navigation.configuration.businessHours" defaultMessage="Business Hours" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkContactAttributes"
                  to="/configuration/contactAttributes"
                  onClick={(e) => this.setCurrentEntityAndEntityId('contactAttributes', e)}>
                  <FormattedMessage
                    id="navigation.configuration.contactAttributes"
                    defaultMessage="Contact Attributes"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkContactLayouts"
                  to="/configuration/contactLayouts"
                  onClick={(e) => this.setCurrentEntityAndEntityId('contactLayouts', e)}>
                  <FormattedMessage id="navigation.configuration.contactLayouts" defaultMessage="Contact Layouts" />
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu theme={this.props.theme} data-automation="flowsMenu" onClick={() => this.setVisibleMenu('Flows')}>
            <FormattedMessage id="navigation.flows" defaultMessage="Flows" />
            {this.state.visibleMenu === 'Flows' && (
              <SubMenu>
                <StyledLink
                  data-automation="navigationLinkFlows"
                  to="/configuration/flows"
                  onClick={(e) => this.setCurrentEntityAndEntityId('flows', e)}>
                  <FormattedMessage id="navigation.flows" defaultMessage="Flows" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkDispositions"
                  to="/configuration/dispositions"
                  onClick={(e) => this.setCurrentEntityAndEntityId('dispositions', e)}>
                  <FormattedMessage id="navigation.flows.dispositions" defaultMessage="Dispositions" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkDispositionLists"
                  to="/configuration/dispositionLists"
                  onClick={(e) => this.setCurrentEntityAndEntityId('dispositionLists', e)}>
                  <FormattedMessage id="navigation.flows.dispositionLists" defaultMessage="Disposition Lists" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkFlowDebugger"
                  to="/flowDebugLogs"
                  onClick={(e) => this.setCurrentEntityAndEntityId('flowDebugLogs', e)}>
                  <FormattedMessage id="navigation.flows.flowDebugLogs" defaultMessage="Flow Debug Logs" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkDispatchMappings"
                  to="/configuration/dispatchMappings"
                  onClick={(e) => this.setCurrentEntityAndEntityId('dispatchMappings', e)}>
                  <FormattedMessage id="navigation.flows.dispatchmappings" defaultMessage="Dispatch Mappings" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkCustomAttributes"
                  to="/configuration/customAttributes"
                  onClick={(e) => this.setCurrentEntityAndEntityId('customAttributes', e)}>
                  <FormattedMessage id="navigation.flows.customAttributes" defaultMessage="Custom Attributes" />
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>

          <NavbarMenu
            theme={this.props.theme}
            data-automation="reportingMenu"
            onClick={() => this.setVisibleMenu('Reporting')}>
            <FormattedMessage id="navigation.reports" defaultMessage="Reporting" />
            {this.state.visibleMenu === 'Reporting' && (
              <SubMenu>
                <StyledLink
                  data-automation="navigationLinkForecastDashboards"
                  to="/forecastDashboards"
                  onClick={(e) => this.setCurrentEntityAndEntityId('forecastDashboards', e)}>
                  <FormattedMessage id="navigation.reports.forecastDashboards" defaultMessage="Forecast Dashboards" />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkDataAccessReports"
                  to="/configuration/dataAccessReports"
                  onClick={(e) => this.setCurrentEntityAndEntityId('dataAccessReports', e)}>
                  <FormattedMessage
                    id="navigation.configuration.dataAccessReports"
                    defaultMessage="Access Controlled Reports"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkInteractionMonitoring"
                  to="/interactionMonitoring"
                  onClick={(e) => this.setCurrentEntityAndEntityId('interactionMonitoring', e)}>
                  <FormattedMessage
                    id="navigation.reports.interactionMonitoring"
                    defaultMessage="Interaction Monitoring"
                  />
                </StyledLink>
                <StyledLink
                  data-automation="navigationLinkAgentStateMonitoring"
                  to="/agentStateMonitoring"
                  onClick={(e) => this.setCurrentEntityAndEntityId('agentStateMonitoring', e)}>
                  <FormattedMessage
                    id="navigation.reports.agentStateMonitoring"
                    defaultMessage="Agent State Monitoring"
                  />
                </StyledLink>
              </SubMenu>
            )}
          </NavbarMenu>
          <Settings data-automation="settingsMenu" onClick={() => this.setVisibleMenu('Settings')}>
            <SettingIconSVG size={20} color="#FFF" hoverColor="#CCC" />
            {this.state.visibleMenu === 'Settings' && (
              <SubMenu right="0.5%">
                <Welcome>
                  <FormattedMessage
                    id="navigation.welcome"
                    values={{
                      displayName: this.props.currentUserName,
                    }}
                    defaultMessage="Welcome, {displayName}"
                  />
                </Welcome>
                <StyledLink
                  data-automation="navigationLinkUserProfile"
                  to="/userProfile"
                  onClick={(e) => this.setCurrentEntityAndEntityId('userProfile', e)}>
                  <FormattedMessage id="navigation.profile" defaultMessage="User Profile" />
                </StyledLink>
              </SubMenu>
            )}
          </Settings>
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
  areSubEntityFormsDirty: PropTypes.bool,
  currentUserName: PropTypes.string,
};
