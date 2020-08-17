/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name.',
  type: isEmpty(values.get('type')) && 'Type field is required.'
});
