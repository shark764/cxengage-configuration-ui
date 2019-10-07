/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { List } from 'immutable';
import moment from 'moment';
import { getCurrentPermissions, getCurrentTenantId } from '../userData/selectors';
import { entitiesMetaData } from './metaData';
import { getDisplay } from './users/selectors';
import { getUserDisplayName } from '../userIdMap/selectors';
import { getSelectedSidePanelId, getSelectedAgentsBulkChangeItems } from '../reporting/agentStateMonitoring/selectors';

const getEntities = state => state.get('Entities');

export const getCurrentEntity = state => getEntities(state).get('currentEntity');

export const getCurrentEntityStore = state => getEntities(state).get(getCurrentEntity(state));

export const getSidePanelWidth = state => getCurrentEntityStore(state).get('sidePanelWidth');

export const getSelectedEntityId = state =>
  getCurrentEntityStore(state) && getCurrentEntityStore(state).get('selectedEntityId');

export const itemApiPending = state => state.getIn(['Entities', 'loading']);

export const getSelectedEntityBulkChangeItems = state =>
  getCurrentEntityStore(state).get('data') &&
  getCurrentEntityStore(state)
    .get('data')
    .filter(item => item.get('bulkChangeItem'))
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

export const getSelectedEntityStatus = state => getSelectedEntity(state) && getSelectedEntity(state).get('active');

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
    return permissionsNeeded.some(permissionNeeded => userPermissions && userPermissions.includes(permissionNeeded));
  } else {
    return false;
  }
};

export const userHasEveryPermissions = (state, permissions) =>
  hasEveryPermission(getCurrentPermissions(state), permissions);

export const hasEveryPermission = (userPermissions, permissionsNeeded) => {
  if (permissionsNeeded !== undefined) {
    // Return true if they have at least one of the permissions
    return permissionsNeeded.every(permissionNeeded => userPermissions && userPermissions.includes(permissionNeeded));
  } else {
    return false;
  }
};

export const isInherited = state => {
  if (getSelectedEntityId(state) !== 'create' && getSelectedEntityId(state) !== 'bulk') {
    switch (getCurrentEntity(state)) {
      case 'roles': {
        return (
          getSelectedEntity(state).get('type') !== 'system' &&
          getSelectedEntity(state).get('tenantId') !== getCurrentTenantId(state)
        );
      }
      case 'groups': {
        return getSelectedEntity(state).get('name') === 'everyone';
      }
      case 'users':
      case 'agentStateMonitoring':
      case 'tenants':
        return false;
      default:
        return getSelectedEntity(state).get('tenantId') !== getCurrentTenantId(state);
    }
  } else {
    return false;
  }
};

export const isSystemRole = state => {
  if (getSelectedEntityId(state) !== 'create' && getSelectedEntityId(state) !== 'bulk') {
    return getSelectedEntity(state).get('type') === 'system';
  } else {
    return false;
  }
};

export const shouldDisableField = state => {
  if (getSelectedEntityId(state) !== 'create' && getSelectedEntityId(state) !== 'bulk') {
    switch (getCurrentEntity(state)) {
      case 'reasonLists': {
        return getSelectedEntity(state).get('reasons').size === 0;
      }
      case 'flows':
      case 'slas': {
        // Entity can have versions, but we'll allow to enable it
        // until it has a version set as active.
        return !getSelectedEntity(state).get('activeVersion');
      }
      case 'roles': {
        return getSelectedEntity(state).get('type') === 'system';
      }
      default:
        return false;
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

export const getSelectedSubEntityName = state => getCurrentEntityStore(state).get('selectedSubEntityName');

export const getSelectedSubEntityData = state => getCurrentEntityStore(state).get('selectedSubEntityData');

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
    .findIndex(entity => entity.get('id') === getSelectedEntityId(state));
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
    .findIndex(entity => entity.get('id') === getSelectedEntityId(state));
  return getCurrentEntityStore(state).getIn(['data', entityIndex, 'members'], new List([])).size;
};

export const findEntityIndex = (state, entityName, entityId) =>
  state.get(entityName) !== undefined
    ? state.getIn([entityName, 'data']).findIndex(entity => entity.get('id') === entityId)
    : getEntities(state)
        .getIn([entityName, 'data'])
        .findIndex(entity => entity.get('id') === entityId);

export const findEntity = (state, entityName, entityId) =>
  state.get(entityName) !== undefined
    ? state.getIn([entityName, 'data']).find(entity => entity.get('id') === entityId)
    : getEntities(state)
        .getIn([entityName, 'data'])
        .find(entity => entity.get('id') === entityId);

export const getEntityData = (state, entityName) => state.getIn(['Entities', entityName, 'data']);

export const getSingleUsersData = (state, userId) => state.getIn(['Entities', 'users', 'data', userId]);

export const getSelectedEntityWithIndex = immutableEntitiesMap => {
  const currentEntityName = immutableEntitiesMap.get('currentEntity');
  const currentSelectedEntityId = immutableEntitiesMap.getIn([currentEntityName, 'selectedEntityId']);
  const currentEntityList = immutableEntitiesMap.getIn([currentEntityName, 'data']);
  const currentIndex = currentEntityList.findIndex(obj => obj.get('id') === currentSelectedEntityId);

  if (currentIndex !== -1) {
    return currentEntityList
      .get(currentIndex)
      .set('currentIndex', currentIndex)
      .set('entityName', currentEntityName);
  } else {
    return undefined;
  }
};

export const sidePanelHeader = state => {
  const currentEntity = getCurrentEntity(state);
  if (currentEntity === 'agentStateMonitoring') {
    if (getSelectedSidePanelId(state) === 'bulk') {
      return { title: `Bulk Actions: ${getSelectedAgentsBulkChangeItems(state).size} Selected` };
    }
  }
  const selectedEntityId = getSelectedEntityId(state);
  if (selectedEntityId === 'create') {
    return {
      title: `Creating New ${entitiesMetaData[currentEntity].title}`
    };
  } else if (selectedEntityId === 'bulk') {
    return {
      title: `Bulk Actions: ${getSelectedEntityBulkChangeItems(state).size} Selected`
    };
  } else if (selectedEntityId) {
    const selectedEntity = getSelectedEntity(state);
    const createdByName =
      selectedEntity.get('createdByName') || getUserDisplayName(state, selectedEntity.get('createdBy'));
    const updatedByName =
      selectedEntity.get('updatedByName') || getUserDisplayName(state, selectedEntity.get('updatedBy'));
    return {
      title: selectedEntity.get('name') || getDisplay(selectedEntity.toJS()),
      createdAt: `Created on ${moment(selectedEntity.get('created')).format('lll')} ${
        createdByName ? ` by ${createdByName}` : ''
      } `,
      updatedAt: `Last updated on ${moment(selectedEntity.get('updated')).format('lll')} ${
        updatedByName ? ` by ${updatedByName}` : ''
      }`,
      toggleStatus: Boolean(selectedEntity.get('active')) || selectedEntity.get('status') === 'accepted'
    };
  }
};

export const isUpdateForm = state => getSelectedEntity(state) !== undefined;

export const userHasCurrentFormPermission = state =>
  isUpdateForm(state) ? userHasUpdatePermission(state) : userHasCreatePermission(state);

export const findEntityByProperty = (state, entityName, entityProperty, value) =>
  state.get(entityName) !== undefined
    ? state.getIn([entityName, 'data']).find(entity => entity.get(entityProperty) === value)
    : getEntities(state)
        .getIn([entityName, 'data'])
        .find(entity => entity.has(entityProperty) && entity.get(entityProperty) === value);

export const getEntityParentTenantName = state => getSelectedEntity(state).get('tenantName') || '';
