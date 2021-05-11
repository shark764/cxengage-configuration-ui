/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { List } from 'immutable';
import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';

export const selectFacebookIntegrationsFormInitialValues = (state) => {
  if (getSelectedEntity(state) === undefined) {
    return undefined;
  }
  let initialValues = selectFormInitialValues(state);
  initialValues = initialValues.set('description', initialValues.get('description') || '');
  return initialValues.toJS();
};
