/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => {
  let identifierFieldError;
  if (isEmpty(values.get('identifier'))) {
    identifierFieldError = 'Attribute Identifier is required.';
  } else if (/[^\dA-Z_-]/gi.test(values.get('identifier'))) {
    identifierFieldError =
      'Attribute Identifier should be alphanumeric without spaces & can only contain "-" and "_" as special characters';
  }

  return {
    identifier: identifierFieldError,
    name: isEmpty(values.get('name')) && 'Attribute Name is required.'
  };
};
