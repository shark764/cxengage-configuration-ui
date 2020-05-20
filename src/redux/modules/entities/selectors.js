/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { List } from 'immutable';
import moment from 'moment';
import { getCurrentPermissions, getCurrentTenantId } from '../userData/selectors';
import { entitiesMetaData } from './metaData';
import { getDisplay, userHasNameSet } from './users/selectors';
import { getUserDisplayName } from '../userIdMap/selectors';
import { getSelectedSidePanelId, getSelectedAgentsBulkChangeItems } from '../reporting/agentStateMonitoring/selectors';

const getEntities = state => state.get('Entities');

export const getCurrentEntity = state => getEntities(state).get('currentEntity');

export const getNextEntity = state => getEntities(state).get('nextEntity');

export const getCurrentEntityStore = state => getEntities(state).get(getCurrentEntity(state));

export const getSelectedEntityId = state =>
  getCurrentEntityStore(state) && getCurrentEntityStore(state).get('selectedEntityId');

export const getSidePanelWidth = createSelector(
  [getCurrentEntityStore, getSelectedEntityId],
  (currentEntityStore, selectedEntityId) =>
    selectedEntityId !== 'bulk' ? currentEntityStore.get('sidePanelWidth') : 550
);

export const itemApiPending = state => state.getIn(['Entities', 'loading']);

export const getSelectedEntityBulkChangeItems = createSelector(
  [getCurrentEntityStore],
  currentEntityStore =>
    currentEntityStore.get('data') &&
    currentEntityStore
      .get('data')
      .filter(item => item.get('bulkChangeItem'))
      .reduce((accum, item) => accum.push(item.get('id')), List())
);

export const getBulkSelectedTotal = state =>
  getSelectedEntityBulkChangeItems(state) ? getSelectedEntityBulkChangeItems(state).size : 0;

/**
 * Returns if bulk actions form for current entity
 * has been submitted.
 */
export const isBulkUpdating = createSelector(
  [getCurrentEntityStore],
  currentEntity => currentEntity.get('bulkUpdating') || false
);

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
  [getAllEntities, getSelectedEntityId],
  (allEntities, selectedEntityId) => selectedEntityId && allEntities.find(obj => obj.get('id') === selectedEntityId)
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
export const userHasSharePermission = state =>
  hasPermission(getCurrentPermissions(state), getCurrentEntityStore(state).get('sharePermission'));
export const userHasDisablePermission = state =>
  hasPermission(getCurrentPermissions(state), getCurrentEntityStore(state).get('disablePermission'));

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

export const isItemInherited = (state, entityName = null, entityId = null) => {
  const currentEntity = entityName || getCurrentEntity(state);
  const selectedEntity = entityId ? findEntity(state, currentEntity, entityId) : getSelectedEntity(state);
  const currentTenantId = getCurrentTenantId(state);

  switch (currentEntity) {
    case 'roles': {
      return selectedEntity.get('type') !== 'system' && selectedEntity.get('tenantId') !== currentTenantId;
    }
    case 'groups': {
      return selectedEntity.get('name') === 'everyone';
    }
    case 'users':
    case 'agentStateMonitoring':
    case 'tenants':
      return false;
    default:
      return selectedEntity.get('tenantId') !== currentTenantId;
  }
};

export const isInherited = state =>
  getSelectedEntityId(state) !== 'create' && getSelectedEntityId(state) !== 'bulk' ? isItemInherited(state) : false;

export const isSystemRole = state => {
  if (getSelectedEntityId(state) !== 'create' && getSelectedEntityId(state) !== 'bulk') {
    return getSelectedEntity(state).get('type') === 'system';
  } else {
    return false;
  }
};

export const shouldDisableHeaderToggleField = state => {
  if (getSelectedEntityId(state) !== 'create' && getSelectedEntityId(state) !== 'bulk') {
    switch (getCurrentEntity(state)) {
      case 'businessHoursV2': {
        // Entity can have versions, but we'll allow to enable it
        // until it has a version set as active.
        return !getSelectedEntity(state).get('activeVersion');
      }
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
      case 'users': {
        // Most of the available actions for user entity
        // must be disabled until firstName and lastName are set
        return !userHasNameSet(state);
      }
      default:
        return false;
    }
  } else {
    return false;
  }
};

export const isCreating = state => getCurrentEntityStore(state) && getCurrentEntityStore(state).get('creating');

export const isUpdating = state => getSelectedEntity(state) && getSelectedEntity(state).get('updating');

export const isSaving = state => isCreating(state) || isUpdating(state);

export const getCurrentSubEntity = state => getCurrentEntityStore(state).get('subEntity');

export const getSelectedSubEntityId = state => getCurrentEntityStore(state).get('selectedSubEntityId');

export const getSelectedSubEntityName = state => getCurrentEntityStore(state).get('selectedSubEntityName');

export const getSelectedSubEntityData = state => getCurrentEntityStore(state).get('selectedSubEntityData');

export const getSelectedSubEntity = createSelector(
  [getSelectedEntity, getSelectedSubEntityId],
  (selectedEntity, selectedSubEntityId) =>
    selectedEntity &&
    selectedSubEntityId &&
    selectedEntity.get('items') &&
    selectedEntity
      .get('items')
      .find(subEntity => subEntity.get('key') === selectedSubEntityId || subEntity.get('id') === selectedSubEntityId)
);

export const isSubEntitySaving = state => getCurrentEntityStore(state).get('subEntitySaving');

export const getSelectedEntityFormId = createSelector(
  [getCurrentEntity, getSelectedEntityId],
  (currentEntity, selectedEntityId) => `${currentEntity}:${selectedEntityId}`
);

export const getAllForms = state => state.get('form');

export const getSelectedSubEntityFormsIds = createSelector(
  [getAllForms, getSelectedEntityFormId],
  (allForms, selectedEntityFormId) => allForms && [...allForms.keys()].filter(key => key !== selectedEntityFormId)
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
      toggleStatus:
        entitiesMetaData[currentEntity].hideActiveToggle === true
          ? undefined
          : Boolean(selectedEntity.get('active')) || selectedEntity.get('status') === 'accepted'
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

export const getEntityDisplay = createSelector(
  [getSelectedEntity],
  selectedEntity => (selectedEntity ? selectedEntity.get('name') || getDisplay(selectedEntity.toJS()) : null)
);

export const getEntityItemDisplay = (state, entityId) => {
  const entityItem = findEntity(state, getCurrentEntity(state), entityId);
  if (!entityItem) {
    return null;
  }
  return entityItem.get('name') || getDisplay(entityItem.toJS());
};

export const getConfirmationToggleEntityMessage = createSelector(
  [getCurrentEntity, getSelectedEntity, getSelectedEntityId],
  (currentEntity, selectedEntity, selectedEntityId) => {
    if (selectedEntityId === 'bulk' || selectedEntityId === 'create' || selectedEntityId === '') {
      return null;
    }
    const title = entitiesMetaData[currentEntity].title;
    if (selectedEntity.get('active') || selectedEntity.get('status') === 'accepted') {
      if (currentEntity === 'roles') {
        return `If you disable this role it will become unavailable for this tenant and all child tenants it is shared with and any users with this role assigned to them may lose permissions granted by this role and may lose the ability to access the platform or specific features granted by this role.`;
      } else if (currentEntity === 'slas') {
        return `This will disable the SLA, but will not remove its association with queue or tenant default settings. Associated queues or tenant settings will continue to use this SLA until they are updated.`;
      } else {
        return `This will disable this ${title}.`;
      }
    }
    return `This will enable this ${title}.`;
  }
);
