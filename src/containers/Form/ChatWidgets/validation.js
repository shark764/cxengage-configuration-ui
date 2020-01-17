/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  contactPoint: isEmpty(values.get('contactPoint')) && 'Please enter a contact point',
  appId: isEmpty(values.get('appId')) && 'Please choose an app'
});
