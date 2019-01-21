/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';
import { validateEmail, validatePhoneNumber } from 'serenova-js-utils/validation';

const emailValidation = email => {
  if (isEmpty(email)) {
    return 'Please enter an email adress';
  } else if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  } else {
    return false;
  }
};

const phoneNumberValidation = phoneNumber => {
  if (isEmpty(phoneNumber)) {
    return 'Please enter an e.164 formatted number';
  } else if (!validatePhoneNumber(phoneNumber)) {
    return 'Please enter a valid e.164 formatted number';
  } else {
    return false;
  }
};

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  flowId: !values.get('flowId') && 'Please select a flow',
  channelType: !values.get('channelType') && 'Please select a channel type',
  value:
    values.get('channelType') === 'email'
      ? emailValidation(values.get('value'))
      : phoneNumberValidation(values.get('value'))
});
