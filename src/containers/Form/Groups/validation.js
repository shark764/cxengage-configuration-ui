/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty, isNumber } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name'
});
