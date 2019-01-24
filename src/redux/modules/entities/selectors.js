/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { List } from 'immutable';

import { getCurrentPermissions, getCurrentTenantId } from '../userData/selectors';

const getEntities = state => state.get('Entities');

export const getCurrentEntity = state => getEntities(state).get('currentEntity');

export const getCurrentEntityStore = state => getEntities(state).get(getCurrentEntity(state));

export const getSidePanelWidth = state => getCurrentEntityStore(state).get('sidePanelWidth');

export const getSelectedEntityId = state => getCurrentEntityStore(state).get('selectedEntityId');

export const itemApiPending = state => state.getIn(['Entities', 'loading']);

export const getSelectedEntityBulkChangeItems = state =>
  getCurrentEntityStore(state).get('data') &&
  getCurrentEntityStore(state)
    .get('data')
    .filter(item => item.get('bulkChangeItem') === true)
    .reduce((accum, item) => accum.push(item.get('id')), List());

export const getConfirmationDialogType = state => getCurrentEntityStore(state).get('confirmationDialogType');

export const getConfirmationDialogMetaData = state => getCurrentEntityStore(state).get('confirmationDialogMetaData');

export const getAllEntities = state => getCurrentEntityStore(state).get('data');

export const isEntityFetching = (state, entityName) => {
  if (entityName) {
    return getEntities(state).getIn([entityName, 'fetching']);
  } else {
    return getCurrentEntityStore(state).get('fetching');
  }
};

export const getSelectedEntity = createSelector(
  [getCurrentEntity, getAllEntities, getSelectedEntityId],
  (currentEntity, allEntities, selectedEntityId) =>
    selectedEntityId && allEntities.find(obj => obj.get('id') === selectedEntityId)
);

export const getSelectedEntityName = state => getSelectedEntity(state).get('name');

export const getSelectedEntityStatus = state => getSelectedEntity(state).get('active');

export const userHasReadPermission = state =>
  hasPermission(getCurrentPermissions(state), getCurrentEntityStore(state).get('readPermission'));

export const userHasReadPermissionManual = (state, entityName) =>
  hasPermission(getCurrentPermissions(state), state.getIn(['Entities', entityName, 'readPermission']));

export const userHasUpdatePermission = state =>
  hasPermission(getCurrentPermissions(state), getCurrentEntityStore(state).get('updatePermission'));

export const userHasCreatePermission = state =>
  hasPermission(getCurrentPermissions(state), getCurrentEntityStore(state).get('createPermission'));

export const userHasPermissions = (state, permissions) => hasPermission(getCurrentPermissions(state), permissions);

export const hasPermission = (userPermissions, permissionsNeeded) => {
  if (permissionsNeeded !== undefined) {
    // Return true if they have at least one of the permissions
    return permissionsNeeded.some(permissionNeeded => userPermissions.includes(permissionNeeded));
  } else {
    return false;
  }
};

export const isInherited = state => {
  if (getSelectedEntityId(state) !== 'create') {
    switch (getCurrentEntity(state)) {
      case 'roles': {
        return getSelectedEntity(state).get('type') === 'system';
      }
      case 'users': {
        return false;
      }
      case 'groups': {
        return getSelectedEntity(state).get('name') === 'everyone';
      }
      default:
        return getSelectedEntity(state).get('tenantId') !== getCurrentTenantId(state);
    }
  } else {
    return false;
  }
};

export const isCreating = state => getCurrentEntityStore(state) && getCurrentEntityStore(state).get('creating');

export const isUpdating = state => getCurrentEntityStore(state).get('updating');

export const isSaving = state => isCreating(state) || isUpdating(state);

export const getCurrentSubEntity = state => getCurrentEntityStore(state).get('subEntity');

export const getSelectedSubEntityId = state => getCurrentEntityStore(state).get('selectedSubEntityId');

export const getSelectedSubEntity = createSelector(
  [getSelectedEntity, getCurrentSubEntity, getSelectedSubEntityId],
  (selectedEntity, currentSubEntity, selectedSubEntityId) =>
    selectedEntity && selectedEntity.get('items').find(subEntity => subEntity.get('key') === selectedSubEntityId)
);

export const isSubEntitySaving = state => getCurrentEntityStore(state).get('subEntitySaving');

export const getSelectedEntityFormId = createSelector(
  [getCurrentEntity, getSelectedEntityId],
  (currentEntity, selectedEntityId) => `${currentEntity}:${selectedEntityId}`
);

export const availableEntitiesForList = state => {
  const entityIndex = getCurrentEntityStore(state)
    .get('data')
    .findIndex(entity => entity.get('id') === getCurrentEntityStore(state).get('selectedEntityId'));
  const currentListMembers = getCurrentEntityStore(state)
    .getIn(['data', entityIndex, 'members'], new List([]))
    .toOrderedSet();
  const allListOptions = state.getIn(['Entities', getListDependency(state), 'data'], new List([])).toOrderedSet();
  const availableOptions = allListOptions.subtract(currentListMembers);
  return availableOptions.toJS();
};

export const getListDependency = state => getCurrentEntityStore(state).getIn(['metaData', 'listDependency']);

export const getEntityListMembers = state =>
  getSelectedEntity(state)
    .getIn(['members'], new List([]))
    .toJS();

export const getListSize = state => {
  const entityIndex = getCurrentEntityStore(state)
    .get('data')
    .findIndex(entity => entity.get('id') === getCurrentEntityStore(state).get('selectedEntityId'));
  return getCurrentEntityStore(state).getIn(['data', entityIndex, 'members'], new List([])).size;
};
