/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const getBranding = state => state.getIn(['Entities', 'branding', 'data']);

export const getProtectedBranding = state =>
  state.getIn(['Entities', 'protectedBranding', 'data']);

export const hasAllBranding = state =>
  getBranding(state) !== undefined && getProtectedBranding(state) !== undefined;

const getStyles = state =>
  (getBranding(state) && getBranding(state).get('styles')) || '{}';

export const getCustomTheme = createSelector([getStyles], styles =>
  JSON.parse(styles)
);
