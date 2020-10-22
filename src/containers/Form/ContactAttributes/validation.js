/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  objectName:
    (isEmpty(values.get('objectName')) && 'Please enter a name.') ||
    (values.get('objectName').match(/^.+\s.+$/) && 'Must be a non-blank string or contains white spaces.'),
  type: isEmpty(values.get('type')) && 'Type field is required.'
});
