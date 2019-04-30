/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';
import { validateEmail, validatePhoneNumber, validateSip } from 'serenova-js-utils/validation';

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
    return 'Please enter an e.164 formatted number or SIP address';
  } else if (!validatePhoneNumber(phoneNumber) && !validateSip(phoneNumber)) {
    return 'Please enter either a valid e.164 formatted number or a valid SIP address';
  } else {
    return false;
  }
};

export const formValidation = (values, props) => {
  let validation = {};
  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.channelType = !values.get('channelType') && 'Please select a Interaction Type';
  validation.interactionField = !values.get('interactionField') && 'Please select a Mapping';
  validation.flowId = !values.get('flowId') && 'Please select a flow';
  validation.version =
    ((!props.flowsFetching && values.get('version') === '') ||
      (props.flowsFetching && (!values.get('version') || values.get('version') === 'null'))) &&
    'Please select a flow version';

  validation.value = !values.get('value') && 'Please set a mapping value';
  if (values.get('interactionField') === 'contact-point') {
    if (['voice', 'sms'].includes(values.get('channelType'))) {
      validation.value = phoneNumberValidation(values.get('value'));
    }
    if (values.get('channelType') === 'email') {
      validation.value = emailValidation(values.get('value'));
    }
  }

  return validation;
};
