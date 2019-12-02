/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';
import { Map } from 'immutable';

export const selectDispositionsFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true, shared: false });
  }
  return selectFormInitialValues(state);
};
