/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  type: !values.get('type') && 'Please select a type',
  activeVersion: !values.get('activeVersion') && 'Please select an active version to be associated to this flow.'
});
