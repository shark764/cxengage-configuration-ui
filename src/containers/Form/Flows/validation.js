/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  let validation = {};
  const { names, initialValues } = props;

  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  const namesFiltered =
    initialValues.get('name') !== undefined
      ? names.filter(function(value) {
          return value !== initialValues.get('name');
        })
      : names;
  if (namesFiltered.includes(values.get('name'))) {
    validation.name = 'Flow with the same name already exists, please enter a different value';
  }

  validation.type = !values.get('type') && 'Please select a type';
  validation.activeVersion =
    !values.get('activeVersion') && 'Please select an active version to be associated to this flow.';

  return validation;
};
