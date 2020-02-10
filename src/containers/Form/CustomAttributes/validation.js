/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  let identifierFieldError;
  if (props.isCreatingNewAtrribute) {
    if (isEmpty(values.get('identifier'))) {
      identifierFieldError = 'Attribute Identifier is required.';
    } else if (!isEmpty(values.get('identifier'))) {
      const isItDuplicateIdentifier =
        props.availableIdentifiers &&
        props.availableIdentifiers.find(identifier => identifier.trim() === values.get('identifier').trim());

      const isItInvalidInput = /[^\dA-Z_-]/gi.test(values.get('identifier'));

      if (isItDuplicateIdentifier) {
        identifierFieldError =
          'Identifer with the same name already exists in the Tenant. Duplicate identifers are not allowed.';
      } else if (isItInvalidInput) {
        identifierFieldError =
          'Attribute Identifier should be alphanumeric without spaces & can only contain "-" and "_" as special characters.';
      }
    }
  }

  return {
    identifier: identifierFieldError,
    name: isEmpty(values.get('name')) && 'Attribute Name is required.'
  };
};
