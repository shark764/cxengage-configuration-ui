/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  roleId: !values.get('roleId') && 'Please select a Tenant Role',
  email: isEmpty(values.get('email')) && 'Please enter an email',
  platformRoleId: !values.get('platformRoleId') && 'Please select a Platform Role'
});
