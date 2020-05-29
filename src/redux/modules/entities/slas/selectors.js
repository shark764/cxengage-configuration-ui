/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map, List } from 'immutable';
import { timeStampToSeconds } from 'cx-ui-components';
import { onInitialVersionFormSubmit } from '../';
import { getSelectedEntity, getSelectedSubEntityId, userHasPermissions, findEntity } from '../selectors';
import { entitiesMetaData } from '../metaData';
import { selectFormInitialValues } from '../../form/selectors';
import { getCurrentTenantId } from '../../userData/selectors';
import { createSelector } from 'reselect';

export const subEntityFormSubmission = (values, dispatch, props) => dispatch(onInitialVersionFormSubmit(values, props));

export const selectSlaVersions = state => selectVersions(getSelectedEntity(state));

const selectVersions = selectedEntity => {
  if (!selectedEntity) {
    return [];
  }
  const versions = selectedEntity.get('versions');
  return (
    (versions &&
      versions
        // API is not sending sorted data by date, so we
        // sort them by using sortBy method from immutable.js
        // otherwise, numericOrderVersion is being wrong calculated
        .sortBy(version => -timeStampToSeconds(version.get('created')))
        .map((version, index) => ({
          value: version.get('versionId'),
          label: `v${versions.size - index} - ${version.get('versionName')}`
        }))) ||
    []
  );
};

export const getSlaItemFields = (state, memberName) =>
  userHasPermissions(state, [
    'PLATFORM_VIEW_ALL_USERS',
    'PLATFORM_CREATE_USERS',
    'PLATFORM_MANAGE_ALL_USERS',
    'PLATFORM_MANAGE_ALL_TENANTS',
    'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT'
  ])
    ? [
        ...entitiesMetaData.slas.membersTableFields[memberName],
        {
          label: 'Created By',
          name: 'createdByName'
        }
      ]
    : entitiesMetaData.slas.membersTableFields[memberName];

export const selectSlaItems = (state, memberName) => getSlaItems(getSelectedEntity(state).get(memberName));

export const getSlaItems = members =>
  (members &&
    members
      // API is not sending sorted data by date, so we
      // sort them by using sortBy method from immutable.js
      // otherwise, numericOrderVersion is being wrong calculated
      .sortBy(member => -timeStampToSeconds(member.get('created')))
      .toJS()
      .map((member, index) => ({
        ...member,
        name: member.versionName,
        numericOrderVersion: `v${members.size - index}`
      }))) ||
  [];

export const selectSlaFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true, shared: false, versionDescription: '' });
  }
  return selectFormInitialValues(state);
};

export const selectSlaVersionFormInitialValues = state => {
  const selectedSubEntityId = getSelectedSubEntityId(state);
  if (selectedSubEntityId === 'versions') {
    return new Map({ versionName: '', versionDescription: '' });
  }
  const selectedVersion =
    getSelectedEntity(state).get('versions') &&
    getSelectedEntity(state)
      .get('versions')
      .find(version => version.get('versionId') === selectedSubEntityId);
  return selectedVersion.set('versionDescription', selectedVersion.get('description'));
};

export const isSlaTenantDefault = state => {
  const tenant = findEntity(state, 'tenants', getCurrentTenantId(state));
  const selectedEntity = getSelectedEntity(state);
  if (!(tenant && selectedEntity)) {
    return false;
  }
  return selectedEntity.get('id') === tenant.get('defaultSlaId');
};

export const getTenantSlas = state => state.getIn(['Entities', 'slas', 'data'], List());

export const selectTenantSlas = createSelector(
  [getTenantSlas],
  data =>
    data && data.size > 0
      ? data
          .filter(sla => sla.get('active') === true)
          .map(activeSla => ({ value: activeSla.get('id'), label: activeSla.get('name') }))
      : undefined
);
