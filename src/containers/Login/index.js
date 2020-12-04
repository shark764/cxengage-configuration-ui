/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import LoginLayout from './layout';

import {
  authenticatedAndBrandingReady,
  userIsAuthed,
  platformViewOnlyMode,
} from '../../redux/modules/userData/selectors';
import {
  setUserAuthed,
  updateTenantsList,
  togglePlatformViewOnlyMode,
  updatePlatformPermissions,
  switchTenant,
} from '../../redux/modules/userData';
import { isInIframe } from 'serenova-js-utils/browser';
import { fetchBranding } from '../../redux/modules/entities/branding/actions';
import { updateUserPermissions } from '../../redux/modules/userData';

import { changeLocale } from '../../redux/modules/language';
import { selectCurrentLocale } from '../../redux/modules/language/selectors';

export function mapStateToProps(state) {
  return {
    hasStarted: authenticatedAndBrandingReady(state),
    authenticated: userIsAuthed(state),
    platformViewOnlyMode: platformViewOnlyMode(state),
    insideIframe: !isInIframe(),
    locale: selectCurrentLocale(state),
  };
}

export const actions = {
  setUserAuthed,
  fetchBranding,
  updateTenantsList,
  updateUserPermissions,
  togglePlatformViewOnlyMode,
  updatePlatformPermissions,
  switchTenant,
  changeLocale,
};

export default connect(mapStateToProps, actions)(LoginLayout);
