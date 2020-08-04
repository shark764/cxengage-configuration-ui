/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { getEntities } from '../selectors';

export const getContactAttributes = createSelector(
  getEntities,
  entitites => entitites && entitites.getIn(['contactAttributes', 'data'])
);

export const getContactAttributesNames = createSelector(
  [getContactAttributes],
  contactAttributes =>
    contactAttributes && contactAttributes.size > 0
      ? contactAttributes
          .toJS()
          .map(attribute => attribute.objectName)
          .sort((a, b) => (a.toUpperCase() < b.toUpperCase() ? -1 : 0))
      : undefined
);

export const getMandatoryContactAttributes = createSelector(
  [getContactAttributes],
  contactAttributes => contactAttributes && contactAttributes.filter(attribute => attribute.get('mandatory') === true)
);
