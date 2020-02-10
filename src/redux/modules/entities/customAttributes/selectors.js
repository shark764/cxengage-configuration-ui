/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { getSelectedEntity, getAllEntities } from '../selectors';
import { selectFormInitialValues } from '../../form/selectors';

// While creating a custom attribute, dataType should always be 'text' (as per the requirements)
export const selectCustomAtributesFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({
      dataType: 'text',
      active: true
    });
  }
  return selectFormInitialValues(state);
};

export const getAvailableCustomAttributesIdentifiers = createSelector(
  [getAllEntities],
  entities => entities && entities.size > 0 && entities.map(entity => entity.get('identifier'))
);
