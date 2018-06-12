---
to: src/containers/Form/<%= name %>/validation.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from '../../../utils/string';

export const formValidation = values => ({
  isEmptyString: isEmpty(values.get('name')) && 'Please enter a ...',
  requiredField: !values.get('flowId') && 'Please select a ...',
});