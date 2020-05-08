/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props = {}) => {
  let validation = {};
  let { isSaving, isFetching, initialized } = props;
  validation.name = isEmpty(values.get('name')) && 'Please enter a name.';
  validation.endpoints =
    !isSaving &&
    !isFetching &&
    initialized &&
    (!values.get('endpoints') || values.get('endpoints').size === 0) &&
    'You must have one or more items in your Transfer List in order to save.';
  return validation;
};
