/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => {
  let validation = {};

  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.channelType = !values.get('channelType') && 'Please select a Interaction Type';
  validation.interactionField = !values.get('interactionField') && 'Please select a Mapping';
  validation.flowId = !values.get('flowId') && 'Please select a flow';
  validation.version = !values.get('version') && 'Please select a flow version';
  validation.value = (!values.get('value') || isEmpty(values.get('value'))) && 'Please set a mapping value.';

  return validation;
};
