/**
 * Page Objects for logging into config 2 directly
 */
const { Element, Brow } = require('cx-automation-utils/pageObject');
const Elem = require('../..');
//const Elemt  = require('../login/');
const uiLoginPage = {
	login: function (username, password, entity) {
		Brow.url(`${process.env.URL}`);
		// Brow.pause(5000); //added to fix issue with getting another tenants list items.
		Elem.username.waitForVisible(60000);
		Elem.username.setValue(username);
		Elem.password.waitForVisible(40000);
		Elem.password.setValue(password);
		Elem.signInButton.waitAndClick();
		Elem.chooseTenantButton.waitForVisible(60000);
		Elem.chooseTenantButton.waitAndClick();
		Brow.pause(2000);

	}
};
module.exports = uiLoginPage;

