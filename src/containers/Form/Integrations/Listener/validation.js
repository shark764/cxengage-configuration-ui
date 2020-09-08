/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import store from '../../../../redux/store';
import { getSelectedSubEntityId } from '../../../../redux/modules/entities/selectors';
import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  const key = values.get('key');
  const value = values.get('value');
  const initialValues = props.initialValues.get('globalParamsProperties');
  const updating = getSelectedSubEntityId(store.getState()) !== 'twilioGlobalDialParams';

  return {
    name: isEmpty(values.get('name')) && 'Please enter a listener name',
    value: (isEmpty(value) && 'Please enter a value') ||
      (initialValues &&
        !updating &&
        (initialValues.has(key) && value !== '' && "You can not overwrite the value of an existing key")),
    key:
      (isEmpty(key) && 'Please enter a key') ||
      (initialValues &&
        !updating &&
        (initialValues.has(key) && value === '' && "There's already a key with this name"))
  };
};