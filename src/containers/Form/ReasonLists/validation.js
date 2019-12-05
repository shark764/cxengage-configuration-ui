/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => {
  return {
    name: isEmpty(values.get('name')) && 'Please enter a name',
    reasons:
      (!values.get('reasons') || values.get('reasons').size === 0) &&
      'Reason List should contain at least one reason category.'
  };
};
