//const Page = require('../../../resources/classes/pageObject').Element,
//	Brow = new Page(),
const {Element, Brow} = require('cx-automation-utils/pageObject'),
	urls = require('../uiUrls/uiUrls.js');

const uiMainPage = {
	tenantDropDown: new Element('dropdown[id="tenant-dropdown"]'),
	userManagementDropDown: new Element('dropdown[id="managementDropConfig"]'),
	flowsDropDown: new Element('dropdown[id="flowsDropConfig"]'),
	reportingDropDown: new Element('dropdown[id="reportingNavLinkConfig"]'),
	userSettingDropDown: new Element('dropdown[id="user-settings-dropdown"]'),

	// Configuration Tab
configurationDropDown: new Element('dropdown[id="configurationDropConfig"]'),
listsLink: new Element('li[id="lists-configuration-link"]'),

	navigateToListsPage: function() {
		this.configurationDropDown.moveToObject();
		this.linkToListsPage.waitAndClick();
		expect(Brow.getUrl()).toEqual(urls.listsPage);
	}
};
module.exports = uiMainPage;
