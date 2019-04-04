/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import LoginLayout from './layout';

import { authenticatedAndBrandingReady, userIsAuthed, platformViewOnlyMode } from '../../redux/modules/userData/selectors';
import { toggleUserAuthed, updateTenantsList, togglePlatformViewOnlyMode, updatePlatformPermissions } from '../../redux/modules/userData';
import { fetchBranding } from '../../redux/modules/entities/branding/actions';
import { updateUserPermissions } from '../../redux/modules/userData';

export function mapStateToProps(state) {
  return {
    hasStarted: authenticatedAndBrandingReady(state),
    authenticated: userIsAuthed(state),
    platformViewOnlyMode: platformViewOnlyMode(state),
  };
}

export const actions = {
  toggleUserAuthed,
  fetchBranding,
  updateTenantsList,
  updateUserPermissions,
  togglePlatformViewOnlyMode,
  updatePlatformPermissions,
};

export default connect(mapStateToProps, actions)(LoginLayout);
