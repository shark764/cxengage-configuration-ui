const MainPage = require('../main/index.js');
//const Page = require('../../resources/classes/protractorObjects'),
//	Brow = require('../../resources/classes/protractorObjects').Brow;

const CommonPage = {

	async tenantSelect (tenantName) {
		MainPage.main.tenantDropDown.click();
		if (MainPage.main.selectedTenant.getText() === tenantName) return;
		else {
			const items = await MainPage.main.availableTenants.all();
			const selectedTenant = items.filter(async (val, index) => {
				const text = await val.getText();
				if (text === tenantName) { val.click(); return text; }
			});
			Brow.assert('equal', tenantName, selectedTenant[0])
		}
	},
	hoverDropDown: function(dropDownBoxName, listItem) {
		dropDownBoxName.click();
		dropDownBoxName.click();
		listItem.click();
	},
}
module.exports = CommonPage;
