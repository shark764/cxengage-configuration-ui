/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values) => ({
  name: isEmpty(values.get('name')) && 'Please enter a ...',
  type: !values.get('type') && 'Please select a ...',
});
