/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import {
  getSelectedEntity,
  getSelectedSubEntity
} from '../../../redux/modules/crudEndpoint';

export const getFieldItems = createSelector(getSelectedEntity, selectedList =>
  selectedList.getIn(['listType', 'fields']).toJS()
);

// Removes the first attribute from the fields; it is not editable
export const getUpdateFieldItems = createSelector(
  getSelectedEntity,
  selectedList =>
    selectedList
      .getIn(['listType', 'fields'])
      .shift()
      .toJS()
);

// Removes the uneditable first attribute from the initial values and the key
export const getInitialValues = createSelector(
  getSelectedSubEntity,
  selectedListItem =>
    selectedListItem
      .delete('key')
      .delete(selectedListItem.keySeq().toArray()[0])
);
