/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { getHelpLink as getEntityHelpLink } from './config';
import {
  getAllEntities as getAllEntitiesFromStore,
  getCurrentEntity
} from '../../redux/modules/entities/selectors';
import { getProtectedBranding } from '../../redux/modules/entities/branding/selectors';

export const getAllEntities = state =>
  getAllEntitiesFromStore(state)
    ? getAllEntitiesFromStore(state).toJS()
    : undefined;

/**
 * Prepends custom domain to the entity's help link if it exists
 */
export const getHelpLink = state => {
  const entityHelpLink = getEntityHelpLink(getCurrentEntity(state));
  if (entityHelpLink) {
    const customDomain = getProtectedBranding(state).find(
      protectedBranding => protectedBranding.get('key') === 'customDomain'
    );
    return `https://${
      customDomain ? `${customDomain.get('value')}-` : ''
    }${entityHelpLink}`;
  } else {
    return undefined;
  }
};
