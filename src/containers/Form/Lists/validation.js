/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from '../../../utils/string';

export const updateFormValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name'
});

export const createFormValidation = values => ({
  ...updateFormValidation(values),
  listTypeId: !values.get('listTypeId') && 'Please select a list type'
});
