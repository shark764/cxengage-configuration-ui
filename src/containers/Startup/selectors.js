/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import {
  getBranding,
  getProtectedBranding
} from '../../redux/modules/entities/branding/selectors';

export const hasStarted = state =>
  getBranding(state) !== undefined && getProtectedBranding(state) !== undefined;
