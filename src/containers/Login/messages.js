/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

/*
 * Login Messages
 *
 * This contains all the text for the Login component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  welcome: {
    id: 'app.components.Login.welcome',
    defaultMessage: 'Sign in to CxEngage'
  },
  welcomeNoProd: {
    id: 'app.components.Login.welcomeNoProd',
    defaultMessage: 'Sign in'
  },
  ssoSignIn: {
    id: 'app.components.Login.ssoSignInTitle',
    defaultMessage: 'Sign in with SSO'
  },
  ssoSignInDescription: {
    id: 'app.components.Login.ssoSignInDescription',
    defaultMessage: "Enter your email address and we'll redirect you to your company's login"
  },
  nextButton: {
    id: 'app.components.Login.nextButton',
    defaultMessage: 'Next'
  },
  selectButton: {
    id: 'app.components.Login.selectButton',
    defaultMessage: 'Select'
  },
  signInButton: {
    id: 'app.components.Login.signInButton',
    defaultMessage: 'Sign In'
  },
  return2Login: {
    id: 'app.components.Login.return2Login',
    defaultMessage: 'Sign in with email and password'
  },
  email: {
    id: 'app.components.Login.email',
    defaultMessage: 'Email'
  },
  username: {
    id: 'app.components.Login.username',
    defaultMessage: 'Username'
  },
  password: {
    id: 'app.components.Login.password',
    defaultMessage: 'Password'
  },
  rememberMe: {
    id: 'app.components.Login.rememberMe',
    defaultMessage: 'Remember Me'
  },
  toolbarHasBeenLaunched: {
    id: 'app.components.Login.toolbarHasBeenLaunched',
    defaultMessage: 'Toolbar has been launched in a new window. You can no longer login from here.'
  },
  youMayClose: {
    id: 'app.components.Login.youMayClose',
    defaultMessage: 'You may now close this window.'
  },
  selectTenantMenu: {
    id: 'app.components.Login.selectTenantMenu',
    defaultMessage: 'Please Select a Tenant'
  },
  selectTenant: {
    id: 'app.components.Login.selectTenant',
    defaultMessage: 'Select Tenant...'
  },
  authRequired: {
    id: 'app.components.Login.selectTenantReauthTitle',
    defaultMessage: 'Authentication is required to switch to this tenant'
  },
  privacy: {
    id: 'app.components.Login.privacy',
    defaultMessage: 'Privacy Policy'
  },
  privacyLink: {
    id: 'app.components.Login.privacyLink',
    defaultMessage: 'https://www.serenova.com/privacy'
  },
  setDefaultTenant: {
    id: 'app.components.Login.setDefaultTenant',
    defaultMessage: 'Set as Default Tenant'
  }
});
