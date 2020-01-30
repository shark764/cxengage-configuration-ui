/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';
import { validateEmail } from 'serenova-js-utils/validation';

const emailValidation = email => {
  if (isEmpty(email)) {
    return 'Please enter an email';
  } else if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  } else {
    return false;
  }
};

export const formValidation = (values, props) => {
  const allUsers = props.tenantUsers.toJS();
  const userIndex = allUsers.findIndex(element => element.email === values.get('email'));
  const platformRoleEnabled = !props.checkPlatformUser;

  if (userIndex !== -1) {
    props.setSelectedEntityId(allUsers[userIndex].id);
  }
  return {
    roleId: !values.get('roleId') && 'Please select a Tenant Role',
    email: emailValidation(values.get('email')),
    platformRoleId: platformRoleEnabled && !values.get('platformRoleId') && 'Please select a Platform Role'
  };
};
