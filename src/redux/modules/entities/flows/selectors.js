/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';
import { getCurrentTenantId } from '../../userData/selectors';

const getFlows = state => state.getIn(['Entities', 'flows', 'data']);

export const selectFlowIds = createSelector(
  getFlows,
  getCurrentTenantId,
  (flows, currentTenantId) => {
    return flows !== undefined
      ? flows
          .toJS()
          .filter(
            flow => flow.tenantId === currentTenantId && flow.active === true
          )
          .map(flow => ({
            value: flow.id,
            label: flow.name
          }))
      : undefined;
  }
);
