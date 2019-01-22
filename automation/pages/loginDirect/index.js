/**
 * Page Objects for logging into config 2 directly
 */
const {Element, Brow} = require('cx-automation-utils/pageObject');
const uiLoginPage = {
	username: new Element('.username'),
	password: new Element('.password'),
  loginButton: new Element('.sign-in-button'),
  tenantSelect: new Element('.tenant-select'),
  chooseTenantButton: new Element('.choose-tenant-button'),

	login: function(username, password, entity) {
		Brow.url(`${process.env.URL}configuration/${entity}`);
		// Brow.pause(5000); //added to fix issue with getting another tenants list items.
		this.username.waitForVisible(60000);
		this.username.setValue(username);
		this.password.waitForVisible();
		this.password.setValue(password);
		this.loginButton.waitAndClick();
	}
};
module.exports = uiLoginPage;
