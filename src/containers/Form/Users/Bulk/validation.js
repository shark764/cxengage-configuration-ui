/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

export const formValidation = values => ({
  status: !values.get('status') && 'Please select a status',
  noPassword: !values.get('noPassword') && 'Please select a value for Platform Authentication',
  defaultIdentityProvider:
    !values.get('defaultIdentityProvider') && 'Please select a value for Default Identity Provider'
});
