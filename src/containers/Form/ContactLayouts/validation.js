/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */
import { isEmpty } from 'serenova-js-utils/strings';

const layoutFieldValidation = (value, isCurrentFormMissingMandatoryAttributes) => {
  if (!isCurrentFormMissingMandatoryAttributes && (value && value.size === 0)) {
    return 'There should be atleast one layout item to create a contact layout.';
  } else if (isCurrentFormMissingMandatoryAttributes) {
    return true;
  }
};

export const formValidation = (values, props) => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  layout: layoutFieldValidation(values.get('layout'), props.isCurrentFormMissingMandatoryAttributes)
});
