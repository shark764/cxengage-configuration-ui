/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { getSelectedEntity } from '../selectors';

export const getListTypeName = state => getSelectedEntity(state).getIn(['listType', 'name']);

export const getInitialUpdateFormValues = createSelector([getSelectedEntity], selectedEntity =>
  selectedEntity.delete('active').delete('items')
);
