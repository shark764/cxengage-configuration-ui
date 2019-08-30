/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { getAllEntities as getAllEntitiesFromStore, getCurrentEntity } from '../../redux/modules/entities/selectors';
import { getProtectedBranding } from '../../redux/modules/entities/branding/selectors';
import { getRoles } from '../../redux/modules/entities/roles/selectors';

export const getAllEntities = state =>
  getAllEntitiesFromStore(state) ? getAllEntitiesFromStore(state).toJS() : undefined;

export const getAllEntitiesTableData = state => {
  if (getCurrentEntity(state) === 'apiKeys') {
    const roles = getRoles(state) && getRoles(state).get('data');
    return getAllEntitiesFromStore(state)
      ? getAllEntitiesFromStore(state)
          .toJS()
          .map(entity => ({
            ...entity,
            roleName: roles.size > 0 && roles.find(role => role.get('id') === entity.roleId).get('name')
          }))
      : undefined;
  }
  return getAllEntities(state);
};

/**
 * Prepends custom domain to the entity's help link if it exists
 */
export const getHelpLink = state => {
  const entity = entitiesMetaData[getCurrentEntity(state)];
  if (!entity) {
    return undefined;
  }
  // Looking for custom domain to add value to
  // URL to redirect user to proper page
  const customDomain =
    getProtectedBranding(state) &&
    getProtectedBranding(state).find(protectedBranding => protectedBranding.get('key') === 'customDomain');
  const helpURL = `https://${customDomain ? `${customDomain.get('value')}-` : ''}docs.cxengage.net`;
  return `${helpURL}${entity.helpLink}`;
};
