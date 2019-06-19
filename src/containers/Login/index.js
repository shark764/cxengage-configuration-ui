/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import LoginLayout from './layout';

import {
  authenticatedAndBrandingReady,
  userIsAuthed,
  platformViewOnlyMode
} from '../../redux/modules/userData/selectors';
import {
  toggleUserAuthed,
  updateTenantsList,
  togglePlatformViewOnlyMode,
  updatePlatformPermissions,
  switchTenant
} from '../../redux/modules/userData';
import { isInIframe } from 'serenova-js-utils/browser';
import { fetchBranding } from '../../redux/modules/entities/branding/actions';
import { updateUserPermissions } from '../../redux/modules/userData';

export function mapStateToProps(state) {
  return {
    hasStarted: authenticatedAndBrandingReady(state),
    authenticated: userIsAuthed(state),
    platformViewOnlyMode: platformViewOnlyMode(state),
    insideIframe: !isInIframe()
  };
}

export const actions = {
  toggleUserAuthed,
  fetchBranding,
  updateTenantsList,
  updateUserPermissions,
  togglePlatformViewOnlyMode,
  updatePlatformPermissions,
  switchTenant
};

export default connect(mapStateToProps, actions)(LoginLayout);
