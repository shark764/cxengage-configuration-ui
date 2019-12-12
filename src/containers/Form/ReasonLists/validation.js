/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => {
  let validation = {};
  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.reasons =
    (!values.get('reasons') || values.get('reasons').size === 0) &&
    'You must have one or more reason categories in your Reason List in order to save.';

  if (values.get('shared') === true && values.get('reasons') && values.get('reasons').size !== 0) {
    let unsharedReasons = values.get('reasons').filter(d => d.get('shared') !== true);
    if (unsharedReasons.size !== 0) {
      validation.reasons = "Shared Reason lists cannot contain reasons that aren't also shared.";
    }
  }
  return validation;
};
