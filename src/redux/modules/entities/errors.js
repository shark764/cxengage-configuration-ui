/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 * Ignore these errors as they are commonly not required for cx configuration
 * and often return 404 when not configured
 */
const ignoredErrorList = {
  FETCH_DATA: ['branding'],
  UPLOAD_LOGO_BRANDING_IMAGE: ['tenants'],
  UPLOAD_FAVICON_BRANDING_IMAGE: ['tenants'],
  UPDATE_TENANT_BRANDING: ['tenants']
};

/**
 * Always ignore these successfull api async calls
 */
export const explicitSuccessIgnores = [
  'BULK_ENTITY_UPDATE',
  'TOGGLE_ENTITY_LIST_ITEM',
  'FETCH_DATA_ITEM',
  'FETCH_DATA'
];

export const isIgnoredToast = (action, entity) => {
  if (ignoredErrorList[action] && ignoredErrorList[action].indexOf(entity) > -1) {
    return true;
  } else if (explicitSuccessIgnores.indexOf(action) > -1) {
    return true;
  }
  return false;
};
