/**
 * Page Objects for login and top menu bar
 */
const { Element, Brow } = require('cx-automation-utils/pageObject');
const domElments = require('../../behavior');
const uiLoginPage = {
  usernameInpt: new Element('[data-automation="username"]'),
  passwordInpt: new Element('[data-automation="password"]'),
  loginButton: new Element('[data-automation="signInButton"]'),
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
    this.passwordInpt.waitForVisible(40000);
    this.passwordInpt.setValue(password);
    this.loginButton.waitAndClick();

    Brow.pause(8000);
  }
};
module.exports = uiLoginPage;
