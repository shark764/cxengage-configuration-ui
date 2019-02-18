/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  let validation = {};
  const { dispatchValues, initialValues, allDispatchMappings } = props;

  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.channelType = !values.get('channelType') && 'Please select a Interaction Type';
  validation.interactionField = !values.get('interactionField') && 'Please select a Mapping';
  validation.flowId = !values.get('flowId') && 'Please select a flow';

  validation.value = (!values.get('value') || isEmpty(values.get('value'))) && 'Please set a mapping value.';

  if (dispatchValues && !initialValues.get('id')) {
    validation.value = 'An existing mapping exists with this value and interaction type.';
  } else {
    const findDuplicate = allDispatchMappings
      .filter(mapping => mapping.get('id') !== initialValues.get('id'))
      .find(
        dispatch =>
          dispatch.get('value') === values.get('value') && dispatch.get('channelType') === values.get('channelType')
      );

    if (findDuplicate) validation.value = 'An existing mapping exists with this value and interaction type.';
  }

  return validation;
};
