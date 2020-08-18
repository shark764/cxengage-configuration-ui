/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';
import { formValidation as versionValidation } from './Version/validation';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  activeVersion: !values.get('activeVersion') && 'Please select an active version to be associated to this Sla.',
  ...(values.get('initialVersion') && versionValidation(values))
});
