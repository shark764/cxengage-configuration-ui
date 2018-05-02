/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import {
  getCurrentPermissions,
  getCurrentTenantId
} from '../userData/selectors';

const getEntities = state => state.get('Entities');

export const getCurrentEntity = state =>
  getEntities(state).get('currentEntity');

export const getCurrentEntityStore = state =>
  getEntities(state).get(getCurrentEntity(state));

export const getSidePanelWidth = state =>
  getCurrentEntityStore(state).get('sidePanelWidth');

export const getSelectedEntityId = state =>
  getCurrentEntityStore(state).get('selectedEntityId');

export const getConfirmationDialogType = state =>
  getCurrentEntityStore(state).get('confirmationDialogType');

export const getConfirmationDialogMetaData = state =>
  getCurrentEntityStore(state).get('confirmationDialogMetaData');

export const getAllEntities = state => getCurrentEntityStore(state).get('data');

export const getSelectedEntity = createSelector(
  [getCurrentEntity, getAllEntities, getSelectedEntityId],
  (currentEntity, allEntities, selectedEntityId) =>
    selectedEntityId &&
    allEntities.find(obj => obj.get('id') === selectedEntityId)
);

export const getSelectedEntityName = state =>
  getSelectedEntity(state).get('name');

export const userHasReadPermission = state =>
  hasPermission(
    getCurrentPermissions(state),
    getCurrentEntityStore(state).get('readPermission')
  );

export const userHasUpdatePermission = state =>
  hasPermission(
    getCurrentPermissions(state),
    getCurrentEntityStore(state).get('updatePermission')
  );

export const userHasCreatePermission = state =>
  hasPermission(
    getCurrentPermissions(state),
    getCurrentEntityStore(state).get('createPermission')
  );

const hasPermission = (userPermissions, permissionsNeeded) => {
  if (permissionsNeeded !== undefined) {
    // Return true if they have at least one of the permissions
    return permissionsNeeded.some(permissionNeeded =>
      userPermissions.includes(permissionNeeded)
    );
  } else {
    return false;
  }
};

export const isInherited = state =>
  getSelectedEntity(state).get('tenantId') !== getCurrentTenantId(state);

export const isCreating = state =>
  getCurrentEntityStore(state) && getCurrentEntityStore(state).get('creating');

export const isUpdating = state => getCurrentEntityStore(state).get('updating');

export const getCurrentSubEntity = state =>
  getCurrentEntityStore(state).get('subEntity');

export const getSelectedSubEntityId = state =>
  getCurrentEntityStore(state).get('selectedSubEntityId');

export const getSelectedSubEntity = createSelector(
  [getSelectedEntity, getCurrentSubEntity, getSelectedSubEntityId],
  (selectedEntity, currentSubEntity, selectedSubEntityId) =>
    selectedEntity &&
    selectedEntity
      .get('items')
      .find(subEntity => subEntity.get('key') === selectedSubEntityId)
);

export const isSubEntitySaving = state =>
  getCurrentEntityStore(state).get('subEntitySaving');

export const getSelectedEntityFormId = createSelector(
  [getCurrentEntity, getSelectedEntityId],
  (currentEntity, selectedEntityId) => `${currentEntity}:${selectedEntityId}`
);