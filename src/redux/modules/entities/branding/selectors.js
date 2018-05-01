/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

export const getBranding = state =>
  state.getIn(['Entities', 'branding', 'data']);

export const getProtectedBranding = state =>
  state.getIn(['Entities', 'protectedBranding', 'data']);
