/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

export const updateFormValidation = values => {
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Please enter a name';
  }
  return errors;
};

export const createFormValidation = values => {
  const errors = updateFormValidation(values);
  if (!values.get('listTypeId')) {
    errors.listTypeId = 'Please select a list type';
  }
  return errors;
};
