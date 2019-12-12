/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name.',
  endpoints:
    (!values.get('endpoints') || values.get('endpoints').size === 0) &&
    'You must have one or more items in your Transfer List in order to save.'
});
