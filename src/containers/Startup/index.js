/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import Startup from '../../components/Startup';

import { hasStarted } from './selectors';
import { fetchBranding } from '../../redux/modules/entities/branding/actions';

export function mapStateToProps(state) {
  return {
    hasStarted: hasStarted(state)
  };
}

export const actions = {
  start: fetchBranding
};

const StartupContainer = connect(mapStateToProps, actions)(Startup);

export default StartupContainer;
