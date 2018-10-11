/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import LoginLayout from './layout';

import { authenticatedAndBrandingReady } from '../../redux/modules/userData/selectors';
import { toggleUserAuthed } from '../../redux/modules/userData';
import { fetchBranding } from '../../redux/modules/entities/branding/actions';

export function mapStateToProps(state) {
  return {
    hasStarted: authenticatedAndBrandingReady(state)
  };
}

export const actions = {
  toggleUserAuthed,
  fetchBranding
};

export default connect(mapStateToProps, actions)(LoginLayout);
