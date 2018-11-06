/**
 * Page Objects for login and top menu bar
 */
const {Element, Brow} = require('cx-automation-utils/pageObject');
const uiLoginPage = {
	usernameInpt: new Element('input[ng-model="innerScope.username"]'),
	passwordInpt: new Element('input[ ng-model="innerScope.password"]'),
	loginButton: new Element('input[class="btn btn-primary lo-accent-border lo-accent-bg"]'),
	forgotPasswordLink: new Element('a[href="#/forgot-password"]'),
	privacyPolicyLink: new Element('a[href="https://www.serenova.com/privacy"]'),
	restPasswordLink: new Element('input[value="Reset Password"]'),
	backtoLogin: new Element('a[href="https://www.serenova.com/privacy"]'),

	// Tenant dropdown
	tenantDropDown: new Element('dropdown[id="tenant-dropdown"]'),
	
	login: function(username, password) {
		Brow.url('https://dev-config.cxengagelabs.net/#/login');
		Brow.pause(5000); //added to fix issue with getting another tenants list items.
		this.usernameInpt.waitForVisible(60000);
		this.usernameInpt.setValue(username);
		this.passwordInpt.waitForVisible();
		this.passwordInpt.setValue(password);
		this.loginButton.waitAndClick();
	}
};
module.exports = uiLoginPage;
