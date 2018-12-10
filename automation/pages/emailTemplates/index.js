const { Element, Brow } = require('cx-automation-utils/pageObject'),
    Common = require('../common/index.js'),
    urls = require('../uiUrls/uiUrls.js'),
    MainPage = require('../main/index.js');

 const EmailPage = {
   //iframes & links
   iframe: new Element('iframe[src="https://dev-config2.cxengagelabs.net/#/configuration/emailTemplates"]'),
   linkToListsDocs: new Element('a[href="https://docs.cxengage.net/Help/Content/Configuration/Email_Templates/Updating_Email_Templates.htm"]'),
   emailLink: new Element('li[id="emailTemplates-configuration-link"]'),

   // Search inputs
   mainPaneNameLabel: new Element('span[title="Name"]'),
   mainPaneDescriptionPanel: new Element('span[title="Description"]'),
   nameSearchInput: new Element('input[class="entity-table-filter-column-name"]'),
   descriptionSearchInput: new Element('input[type="text"]'), //maybe fix this
   variablesNameInput: new Element('input[class*="subentity-filter-column-name"]'),
   variablesDescriptionInput: new Element('input[class*="subentity-filter-column-description"]'),

   // Email template options
   inviteExistingSSOTemplate: new Element('span[title="invite-existing-user-by-sso"]'),
   inviteExistingAnyTemplate: new Element('span[title="invite-existing-user-by-any"]'),
   inviteExistingPasswordTemplate: new Element('span[title="invite-existing-user-by-password-only"]'),
   passwordResetTemplate: new Element('span[title="password-reset"]'),
   inviteNewSSOTemplate: new Element('span[title="invite-new-user-by-sso"]'),
   inviteNewAnyTemplate: new Element('span[title="invite-new-user-by-any"]'),
   inviteNewPasswordTemplate: new Element('span[title="invite-new-user-by-password-only"]'),

   // Email template buttons and toggles
   confirmButton: new Element('button[id="confirm"]'),
   submitButton: new Element('button[id="sdpanel-submit"]'),
   cancelButton: new Element('button[id="sdpanel-cancel"]'),
   closeButton: new Element('div[id="sdpanel-close-panel"]'),
   sharedToggle: new Element('label[class="sc-TOsTZ fNiEvz"]'), //fix this

   // Other
   configurationDropDown: new Element('dropdown[id="configurationDropConfig"]'),
   emailDropdown: new Element('select[name="email"]'),
   emailOptionCustom: new Element('option[value="custom"]'),
   emailOptionDefault: new Element('option[value="default"]'),

   // Default side panel page elements 
   subjectDefaultInput: new Element('.//span[text()="Welcome to CxEngage"]'),
   subjectDefaultPasswordInput: new Element('.//span[text()="CxEngage password change request"]'),
   subjectDefaultLabel: new Element('.//span[text()="Subject"]'),
   bodyDefaultLabel: new Element('.//span[text()="Body"]'),

   // Custom side panel page elements
   subjectCustomLabel: new Element('label[for="subject"]'),
   bodyCustomLabel: new Element('label[for="body"]'),


   navigateToEmailPage: function() {
      this.configurationDropDown.waitAndClick();
      this.configurationDropDown.waitAndClick();
      this.emailLink.waitAndClick();
   },

   validateAllTemplatesInList: function() {
      this.inviteExistingAnyTemplate.validateElementsState('isExisting', true);
      this.inviteExistingPasswordTemplate.validateElementsState('isExisting', true);
      this.inviteExistingSSOTemplate.validateElementsState('isExisting', true);
      this.inviteNewAnyTemplate.validateElementsState('isExisting', true);
      this.inviteNewPasswordTemplate.validateElementsState('isExisting', true);
      this.inviteNewSSOTemplate.validateElementsState('isExisting', true);
      this.passwordResetTemplate.validateElementsState('isExisting', true);
   },

   templateSearch: function(TemplateOption, Description) {
      this.nameSearchInput.waitAndClick();
      this.nameSearchInput.setValue(TemplateOption);
      this.descriptionSearchInput.waitAndClick();
      this.descriptionSearchInput.setValue(Description);
   },

   templateNameSearch: function(TemplateOption) {
      this.iframe.switchToFrame();
      this.nameSearchInput.waitAndClick();
      this.nameSearchInput.setValue(TemplateOption);
   },

   descriptionSearch: function(Description) {
      this.iframe.switchToFrame();
      this.descriptionSearchInput.waitAndClick();
      this.descriptionSearchInput.setValue(Description);
   },

   cancelEmailTemplate: function() {
      this.cancelButton.click();
   },

   closeSidePanel: function() {
      this.closeButton.click();
   },

   changeToCustomOrDefault: function() {
      var booleanValue = this.variablesNameInput.isExisting();
      var passResetBoolean = this.passwordResetTemplate.isExisting();
      Brow.pause(3000);
		if ( booleanValue === true ) {
         this.emailDropdown.waitAndClick();
         this.emailOptionDefault.waitAndClick();
         this.submitButton.waitAndClick();
         Brow.pause(5000);
         // Shared toggle should not be visible
         this.variablesNameInput.validateElementsState('isExisting', false);
         this.variablesDescriptionInput.validateElementsState('isExisting', false);
         if (passResetBoolean === true) {
            this.subjectDefaultPasswordInput.validateElementsState('isExisting', true);
         }
         else {
            this.subjectDefaultInput.validateElementsState('isExisting', true);
         }
         this.subjectDefaultLabel.validateElementsState('isExisting', true);
         this.bodyDefaultLabel.validateElementsState('isExisting', true);
      }
      else if (booleanValue === false) {
         this.emailDropdown.waitAndClick();
         this.emailOptionCustom.waitAndClick();
         this.submitButton.waitAndClick();
         Brow.pause(5000);
         // Shared toggle should be visible
         this.variablesNameInput.validateElementsState('isExisting', true);
         this.variablesDescriptionInput.validateElementsState('isExisting', true);
         if (passResetBoolean === true) {
            this.subjectDefaultPasswordInput.validateElementsState('isExisting', true);
         }
         else {
            this.subjectDefaultInput.validateElementsState('isExisting', true);
         }
         this.subjectDefaultLabel.validateElementsState('isExisting', false);
         this.bodyDefaultLabel.validateElementsState('isExisting', false);
         
      }
   },

   validateCustomOrDefaultPageElements: function() {
      var booleanValue = this.variablesNameInput.isExisting();
      var passResetBoolean = this.passwordResetTemplate.isExisting();
      console.log(booleanValue);
      Brow.pause(5000);
		if ( booleanValue === true ) {
         // Shared toggle should be visible
         this.subjectCustomLabel.validateElementsState('isExisting', true);
         this.bodyCustomLabel.validateElementsState('isExisting', true);
         this.variablesNameInput.validateElementsState('isExisting', true);
         this.variablesDescriptionInput.validateElementsState('isExisting', true);
         this.subjectDefaultLabel.validateElementsState('isExisting', false);
         this.bodyDefaultLabel.validateElementsState('isExisting', false);
      }
      else if ( booleanValue === false) {
         // Shared toggle should not be visible
         if (passResetBoolean === true) {
            this.subjectDefaultPasswordInput.validateElementsState('isExisting', true);
         }
         else {
            this.subjectDefaultInput.validateElementsState('isExisting', true);
         }
         this.subjectDefaultLabel.validateElementsState('isExisting', true);
         this.bodyDefaultLabel.validateElementsState('isExisting', true);
         this.subjectCustomLabel.validateElementsState('isExisting', false);
         this.bodyCustomLabel.validateElementsState('isExisting', false);
         this.variablesNameInput.validateElementsState('isExisting', false);
         this.variablesDescriptionInput.validateElementsState('isExisting', false);
      }
   },

   sharedToggleButton: function() {
      this.sharedToggle.waitAndClick();
      this.submitButton.click();
   },

   subjectToChange: function(Subject) {
      this.subjectInfo.waitAndClick();
      this.subjectInfo.setValue(Subject);
      this.submitButton.click();
   },

   availableVariables: function(variable1) {
      this.variablesNameInput.waitAndClick();
      this.variablesNameInput.setValue(variable1);
   },
 };

 module.exports = EmailPage; 