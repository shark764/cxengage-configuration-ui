const Page = require('../../../resources/classes/pageObject').Element,
	Brow = new Page(),
	urls = require('../-8urls/uiUrls.js');

const uiMainPage = {
	tenantSelectionDropDown: new Page(),
	userManagementDropDown: new Page(),
	flowsDropDown: new Page(),
	reportingDropDown: new Page(),
	userSettingDropDown: new Page(),

	// Configuration Tab
	configurationDropDown: new Page('.//span[text()="Configuration"]'),
	linkToListsPage: new Page('li[id="lists-configuration-link"]'),

	navigateToListsPage: function() {
		this.configurationDropDown.moveToObject();
		this.linkToListsPage.waitAndClick();
		expect(Brow.getUrl()).toEqual(urls.listsPage);
	}
};
module.exports = uiMainPage;
