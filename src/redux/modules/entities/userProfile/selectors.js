import { createSelector } from 'reselect';
import { generateUUID } from 'serenova-js-utils/uuid';
import { fromJS, Map } from 'immutable';

import { findEntity } from '../selectors';
import { getCurrentAgentId } from '../../userData/selectors';
import { getUpdatedUserExtensions } from '../users/selectors';

const userTenants = (state) => state.getIn(['Entities', 'userProfile', 'userTenants']);

export const selectUserTenants = createSelector(
  userTenants,
  (tenants) =>
    tenants &&
    tenants.toJS().map(({ tenantId, name }) => ({
      value: tenantId,
      label: name,
    }))
);

export const isSaving = (state) => state.getIn(['Entities', 'userProfile', 'updating']);

export const userProfileInitialValues = (state) => {
  const userData = findEntity(state, 'users', getCurrentAgentId(state));
  return userData
    ? userData.update('extensions', (extensions) =>
        fromJS(
          getUpdatedUserExtensions(state, extensions.toJS().map((extension) => ({ ...extension, id: generateUUID() })))
        )
      )
    : Map({});
};
