/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  email: isEmpty(values.get('email')) && 'Please enter an email',
  platformRoleId: !values.get('platformRoleId') && 'Please select a platform role',
  roleId: !values.get('roleId') && 'Please select a tenant role'
});
