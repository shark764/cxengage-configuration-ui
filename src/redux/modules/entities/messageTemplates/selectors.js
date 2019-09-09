/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { getSelectedEntityId, getSelectedEntity, getCurrentEntityStore } from '../../entities/selectors';

export const messageTemplateFormInitialValues = createSelector(
  [getSelectedEntity, getSelectedEntityId],
  (selectedEntity, selectedEntityId) => {
    if (selectedEntityId !== 'create') {
      // There is another key with the name 'type' that is been used in 'extensions', here we are changing 'type' to 'templateTextType' to have unique keys in the sdk:
      return selectedEntity.mapKeys(key => (key === 'type' ? 'templateTextType' : key));
    } else {
      return fromJS({ active: true, templateTextType: 'plaintext' });
    }
  }
);

export const isDisplayContentInHtml = createSelector(getCurrentEntityStore, currentEntityStore => {
  if (currentEntityStore) {
    return currentEntityStore.get('isDisplayContentInHtml');
  }
  return false;
});
