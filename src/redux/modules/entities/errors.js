/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

const ignoredErrorList = {
  FETCH_DATA: ['branding']
};

export const isIgnoredError = (action, entity) => {
  if (
    ignoredErrorList[action] &&
    ignoredErrorList[action].indexOf(entity) > -1
  ) {
    return true;
  }
  return false;
};
