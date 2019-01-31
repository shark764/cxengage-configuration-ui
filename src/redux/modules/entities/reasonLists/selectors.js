/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { selectFormInitialValues } from '../../form/selectors';

export const reasonListsInitialValues = state => {
  const initialValues = selectFormInitialValues(state);

  return initialValues.has('shared') && initialValues.has('isDefault')
    ? initialValues.set('reasons', [])
    : initialValues
        .set('shared', false)
        .set('isDefault', false)
        .set('reasons', []);
};

export const checkDisableShared = state => {
  const initialValues = selectFormInitialValues(state);

  return initialValues.get('shared') && initialValues.get('id') !== undefined;
};
