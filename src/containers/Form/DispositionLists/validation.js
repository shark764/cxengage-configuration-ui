/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  dispositions:
    (!values.get('dispositions') || values.get('dispositions').size === 0) &&
    'Disposition List should contain at least one disposition category.'
});
