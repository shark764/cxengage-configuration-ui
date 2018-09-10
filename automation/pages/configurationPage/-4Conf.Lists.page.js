const Page = require('../../../resources/classes/pageObject').Element,
	Brow = new Page();

const ListsPage = {
	iframe: new Page('iframe[src="https://qe-config2.cxengagelabs.net/#/lists"]'),
	createButton: new Page('.//button[text()="Create"]'),
	linkToListsDocs: new Page('a[href="https://docs.cxengage.net/Help/Content/Configuring%20CxEngage/Lists/Lists.htm"]'),
	newListNameInpt: new Page('input[name="name"]'),
	selectListTypeDrpDown: new Page('select[name="listTypeId"]'),

	createAnewList: function() {
		this.iframe.switchToFrame();
		this.createButton.waitAndClick();
		this.newListNameInpt.waitForVisible();
		this.newListNameInpt.setValue(listName);
	}
};
module.exports = ListsPage;

