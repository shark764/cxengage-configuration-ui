/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty, isSerializedOrigin } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  contactPoint: isEmpty(values.get('contactPoint')) && 'Please enter a contact point',
  clientDisconnectMinutes:
    values.get('clientDisconnectMinutes') !== null &&
    values.get('clientDisconnectMinutes') !== undefined &&
    ((values.get('clientDisconnectMinutes') < 1 && 'Must be greater than or equal to 1') ||
      (values.get('clientDisconnectMinutes') > 1440 && 'Must be less than or equal to 1440')),
  appId: isEmpty(values.get('appId')) && 'Please choose an app',
  whitelistedUrls:
    values.get('whitelistedUrls') &&
    values.get('whitelistedUrls').filter(url => !isSerializedOrigin(url)).size > 0 &&
    'One or more URL(s) are not properly formatted with serialized-origin standard.'
});
