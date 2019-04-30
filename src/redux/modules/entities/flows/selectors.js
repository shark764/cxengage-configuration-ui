/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { getSelectedEntity, userHasPermissions, getSelectedSubEntityId, getSelectedSubEntityData } from '../selectors';
import { selectFormInitialValues, getCurrentForm } from '../../form/selectors';
import { onCopyListItemFormSubmit } from '../';
import { selectNonDisabledUsers, getDisplay } from '../users/selectors';
import { entitiesMetaData } from '../metaData';

const getFlows = state => state.getIn(['Entities', 'flows', 'data']);

export const selectFlowIds = createSelector(getFlows, flows => {
  return flows !== undefined
    ? flows
        .filter(flow => flow.get('active'))
        .map(flow => ({
          value: flow.get('id'),
          label: flow.get('name')
        }))
        .toJS()
    : undefined;
});

export const selectNonReusableFlows = createSelector(getFlows, flows => {
  return (
    flows &&
    flows
      .filter(flow => flow.get('active') && flow.get('activeVersion') && flow.get('type') !== 'reusable')
      .map(flow => ({
        value: flow.get('id'),
        label: flow.get('name')
      }))
  );
});

export const getFlowIdFormValue = state => getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'flowId']);

export const selectVersionsFromFlow = state => {
  const versions = getVersionsFromFlow(state);

  return versions.length > 0 ? [{ value: 'null', label: 'Use Active Version' }, ...versions] : undefined;
};

export const getVersionsFromFlow = createSelector([getFlows, getFlowIdFormValue], (flows, flowId) =>
  selectVersions(flows.find(flow => flow.get('id') === flowId))
);

export const selectFlowVersions = state => selectVersions(getSelectedEntity(state));

const selectVersions = selectedEntity => {
  if (!selectedEntity) {
    return [];
  }
  const versions = selectedEntity.get('versions');
  return versions !== undefined
    ? versions
        .map((version, index) => ({
          value: version.get('version'),
          label: `v${versions.size - index} - ${version.get('name')}`
        }))
        .toJS()
    : [];
};

export const selectFlowNames = state => getSelectedSubEntityId(state) !== 'drafts' && getFlowNames(state);

export const getFlowNames = createSelector(getFlows, flows => {
  return flows !== undefined ? flows.map(flow => flow.get('name')).toJS() : [];
});

export const selectFlowDraftNames = state => getSelectedSubEntityId(state) === 'drafts' && getFlowDraftNames(state);

export const getFlowDraftNames = state => {
  const drafts = getSelectedEntity(state).get('drafts');
  return drafts !== undefined ? drafts.map(draft => draft.get('name')).toJS() : [];
};

export const selectFlowItems = (state, memberName) =>
  getFlowItems(
    getSelectedEntity(state).get(memberName),
    selectNonDisabledUsers(state),
    userHasPermissions(state, [
      'PLATFORM_VIEW_ALL_USERS',
      'PLATFORM_CREATE_USERS',
      'PLATFORM_MANAGE_ALL_USERS',
      'PLATFORM_MANAGE_ALL_TENANTS',
      'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT'
    ])
  );

export const getFlowItems = (members, users, createdByColumnPermission) =>
  (members &&
    members.toJS().map((member, index) => ({
      ...member,
      createdByName: createdByColumnPermission && getDisplay(users.find(user => member.createdBy === user.id), true),
      numericOrderVersion: member.version && `v${members.size - index}`
    }))) ||
  [];

export const subEntityFormSubmission = (values, dispatch, props) => dispatch(onCopyListItemFormSubmit(values, props));

export const getNewFlowDraftName = state =>
  getSelectedSubEntityId(state) !== 'drafts'
    ? `Copy of ${getSelectedEntity(state).get('name')}`
    : `${
        getSelectedSubEntityData(state) !== undefined
          ? getSelectedSubEntityData(state).name
          : getSelectedEntity(state).get('name')
      } - draft`;

export const getFlowItemFields = (state, memberName) =>
  userHasPermissions(state, [
    'PLATFORM_VIEW_ALL_USERS',
    'PLATFORM_CREATE_USERS',
    'PLATFORM_MANAGE_ALL_USERS',
    'PLATFORM_MANAGE_ALL_TENANTS',
    'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT'
  ])
    ? [
        ...entitiesMetaData.flows.membersTableFields[memberName],
        {
          label: 'Created By',
          name: 'createdByName'
        }
      ]
    : entitiesMetaData.flows.membersTableFields[memberName];

export const selectFlowFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true, type: 'customer' });
  }
  return selectFormInitialValues(state);
};
