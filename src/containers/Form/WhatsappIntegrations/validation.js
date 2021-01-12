/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values) => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  clientDisconnectMinutes:
    values.get('clientDisconnectMinutes') !== null &&
    values.get('clientDisconnectMinutes') !== undefined &&
    ((values.get('clientDisconnectMinutes') < 1 && 'Must be greater than or equal to 1') ||
      (values.get('clientDisconnectMinutes') > 1440 && 'Must be less than or equal to 1440')),
  whatsappId: isEmpty(values.get('whatsappId')) && 'Please choose an app',
});
