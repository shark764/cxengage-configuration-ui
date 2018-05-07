/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const getStyles = state =>
  state.getIn(['Entities', 'branding', 'data', 'styles']) || '{}';

export const getCustomTheme = createSelector([getStyles], styles =>
  JSON.parse(styles)
);

export const getBranding = state =>
  state.getIn(['Entities', 'branding', 'data']);

export const getProtectedBranding = state =>
  state.getIn(['Entities', 'protectedBranding', 'data']);
