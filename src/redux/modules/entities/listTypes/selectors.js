/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';

const getListTypes = state => state.getIn(['Entities', 'listTypes', 'data']);

export const getListTypesOptions = createSelector([getListTypes], listTypes =>
  listTypes
    .toJS()
    .filter(listType => listType.active)
    .map(listType => ({ value: listType.id, label: listType.name }))
);
