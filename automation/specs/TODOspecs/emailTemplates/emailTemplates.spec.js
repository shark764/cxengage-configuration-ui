const LoginPage = require('../../behavior/login');
const EmailPage = require('../../behavior/emailTemplates');
const { Element, Brow } = require('cx-automation-utils/pageObject');

 describe('Config-UI Email Templates spec', () => {

    it('Login into CxEngage', () => {
        LoginPage.login('cxselenium+admin@gmail.com', 'selenium1!');
    });

    it('Navigate to Email Page', () => {
        EmailPage.navigateToEmailPage();
    });

    it('Validate all Email Templates Appear on Screen', () => {
        EmailPage.iframe.switchToFrame();
        Brow.pause(5000);
        EmailPage.validateAllTemplatesInList();
    });
        // invite-existing-sso-user  
    it('Search for invite-existing-sso template in the Email Template List', () => {
        EmailPage.templateSearch("invite-existing-user-by-sso", "Existing user invitation template when only SSO credentials are available");
        EmailPage.inviteExistingSSOTemplate.validateElementsState('isExisting', true);
    });

    it('Click invite-existing-sso template in the Email Template List and verify', () => {
        EmailPage.inviteExistingSSOTemplate.waitAndClick();
        EmailPage.validateCustomOrDefaultPageElements();
    });

    it('Change Values in side Panel for invite-existing-sso template in the Email Template List', () => {
        EmailPage.changeToCustomOrDefault();
    });
        // invite-existing-user-by-any
    it('Search for invite-existing-user-by-any template in the Email Template List', () => {
        EmailPage.templateSearch("invite-existing-user-by-any", "Existing user invitation template when both CxEngage and SSO credentials are available");
        EmailPage.inviteExistingAnyTemplate.validateElementsState('isExisting', true);
    });

    it('Click invite-existing-user-by-any in the Email Template List and verify', () => {
        EmailPage.inviteExistingAnyTemplate.waitAndClick();
        EmailPage.validateCustomOrDefaultPageElements();
    });

    it('Change Values in side Panel for invite-existing-user-by-any template in the Email Template List', () => {
        EmailPage.changeToCustomOrDefault();
    });
        // invite-new-user-by-any
    it('Search for invite-new-user-by-any template in the Email Template List', () => {
        EmailPage.templateSearch("invite-new-user-by-any", "New user invitation template when both CxEngage and SSO credentials are available");
        EmailPage.inviteNewAnyTemplate.validateElementsState('isExisting', true);
    });

    it('Click invite-new-user-by-any template in the Email Template List and verify', () => {
        EmailPage.inviteNewAnyTemplate.waitAndClick();
        EmailPage.validateCustomOrDefaultPageElements();
    });

    it('Change Values in side Panel for invite-new-user-by-any template in the Email Template List', () => {
        EmailPage.changeToCustomOrDefault();
    });
        // invite-new-user-by-password-only
    it('Search for invite-new-user-by-password-only template in the Email Template List', () => {
        EmailPage.templateSearch("invite-new-user-by-password-only", "New user invitation template when only CxEngage credentials are available");
        EmailPage.inviteNewPasswordTemplate.validateElementsState('isExisting', true);
    });

    it('Click invite-new-user-by-password-only template in the Email Template List and verify', () => {
        EmailPage.inviteNewPasswordTemplate.waitAndClick();
        EmailPage.validateCustomOrDefaultPageElements();
    });

    it('Change Values in side Panel for invite-new-user-by-password-only template in the Email Template List', () => {
        EmailPage.changeToCustomOrDefault();
    });
        // password-reset
    it('Search for password-reset template in the Email Template List', () => {
        EmailPage.templateSearch("password-reset", "CxEngage password reset template");
        EmailPage.passwordResetTemplate.validateElementsState('isExisting', true);
    });

    it('Click password-reset template in the Email Template List and verify', () => {
        EmailPage.passwordResetTemplate.waitAndClick();
        EmailPage.validateCustomOrDefaultPageElements();
    });

    it('Change Values in side Panel for password-reset template in the Email Template List', () => {
        EmailPage.changeToCustomOrDefault();
    });
        // invite-new-user-by-sso
    it('Search for invite-new-user-by-sso template in the Email Template List', () => {
        EmailPage.templateSearch("invite-new-user-by-sso", "New user invitation template when only SSO credentials are available");
        EmailPage.inviteNewSSOTemplate.validateElementsState('isExisting', true);
    });

    it('Click invite-new-user-by-sso template in the Email Template List and verify', () => {
        EmailPage.inviteNewSSOTemplate.waitAndClick();
        EmailPage.validateCustomOrDefaultPageElements();
    });

    it('Change Values in side Panel for invite-new-user-by-sso template in the Email Template List', () => {
        EmailPage.changeToCustomOrDefault();
    });
        // invite-existing-user-by-password-only
    it('Search for invite-existing-user-by-password-only template in the Email Template List', () => {
        EmailPage.templateSearch("invite-existing-user-by-password-only", "Existing user invitation template when only CxEngage credentials are available");
        EmailPage.inviteExistingPasswordTemplate.validateElementsState('isExisting', true);
    });

    it('Click invite-existing-user-by-password-only template in the Email Template List and verify', () => {
        EmailPage.inviteExistingPasswordTemplate.waitAndClick();
        EmailPage.validateCustomOrDefaultPageElements();
    });

    it('Change Values in side Panel for invite-existing-user-by-password-only template in the Email Template List', () => {
        EmailPage.changeToCustomOrDefault();
    });
 }); 
