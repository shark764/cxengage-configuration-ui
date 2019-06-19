/**
 * Page Objects for logging into config 2 directly
 */
const { Element, Brow } = require('cx-automation-utils/pageObject');
const Elem = require('..');

//const CreateBehavior = require('../create');
const create = require('../create/index.js');
//const createButton = new Element('button[id="sdpanel-create"]')
const tableRow = new Element('div[tablerowselect="0"]');
const createAction = new Element('svg[viewBox="0 0 154.21 88.74"]');

const commonBehavior = {
  login: function(username, password) {
    Brow.url(`${process.env.URL}`);
    Elem.username.waitForVisible(60000);
    Elem.username.setValue(username);
    Elem.password.waitForVisible(40000);
    Elem.password.setValue(password);
    Elem.signInButton.waitAndClick();
    // Elem.chooseTenantButton.waitForVisible(60000);
    // Elem.chooseTenantButton.waitAndClick();
    Brow.pause(2000);
  },

  navigationMainBar: function(firstChoice, secondChoice) {
    switch (secondChoice) {
      //All the these cases are reletad to the ##User Management## tab
      case 'navigationLinkUsers':
        Elem.userManagementMenu.waitAndClick();
        Elem.navigationLinkUsers.waitAndClick();
        break;
      case 'navigationLinkGroups':
        Elem.userManagementMenu.waitAndClick();
        Elem.navigationLinkGroups.waitAndClick();
        break;
      case 'navigationLinkSkills':
        Elem.userManagementMenu.waitAndClick();
        Elem.navigationLinkSkills.waitAndClick();
        break;
      case 'navigationLinkRoles':
        Elem.userManagementMenu.waitAndClick();
        Elem.navigationLinkRoles.waitAndClick();
        break;

      //All the these cases are reletad to the ##Configuration## tab
      case 'navigationLinkLists':
        Elem.configurationtMenu.waitAndClick();
        Elem.navigationLinkLists.waitAndClick();
        break;
      //=>SHARON - The name is not align to the tab - "User Management Emails"
      case 'navigationLinkEmailTemplates':
        Elem.configurationtMenu.waitAndClick();
        Elem.navigationLinkEmailTemplates.waitAndClick();
        break;
      case 'navigationLinkOutboundIdentifierLists':
        Elem.configurationtMenu.waitAndClick();
        Elem.navigationLinkOutboundIdentifierLists.waitAndClick();
        break;
      case 'navigationLinkOutboundIdentifiers':
        Elem.configurationtMenu.waitAndClick();
        Elem.navigationLinkOutboundIdentifiers.waitAndClick();
        break;
      case 'navigationLinkStatistics':
        Elem.configurationtMenu.waitAndClick();
        Elem.navigationLinkStatistics.waitAndClick();
        break;
      case 'navigationLinkChatWidgets':
        Elem.configurationtMenu.waitAndClick();
        Elem.navigationLinkChatWidgets.waitAndClick();
        break;

      //All the these cases are reletad to the ##Flows## tab
      case 'navigationLinkFlows':
        Elem.flowsMenu.waitAndClick();
        Elem.navigationLinkFlows.waitAndClick();
        break;
      case 'navigationLinkDispatchMappings':
        Elem.flowsMenu.waitAndClick();
        Elem.navigationLinkDispatchMappings.waitAndClick();
        break;

      //All the these cases are reletad to the ##Reporting## tab
      //=>SHARON - The name is not align to the tab - "reporting"
      case 'navigationLinkDataAccessReports':
        Elem.reportingMenu.waitAndClick();
        Elem.navigationLinkDataAccessReports.waitAndClick();
        break;
      case 'navigationLinkInteractionMonitoring':
        Elem.reportingMenu.waitAndClick();
        Elem.navigationLinkInteractionMonitoring.waitAndClick();
        break;
      default:
        console.error('Incorrect param passed to navigationMainBar function');
    }
    Brow.pause(2000);
  },

  CreateNewLine: function(name, description) {
    Elem.entityCreateButton.waitAndClick();
    //CreateBehavior.updateJson(name,description,email);
    // createButton.waitAndClick();
    Brow.pause(6000);
  },

  clickActionButton: function() {
    Elem.actionsButton.waitAndClick();
    Brow.pause(6000);
  },

  SearchByNameAndClick: function(name) {
    Elem.searchNameColumn.setValue(name);
    tableRow.waitAndClick();
  }
};

module.exports = commonBehavior;
