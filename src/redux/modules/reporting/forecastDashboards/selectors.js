/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEntityFetching, getEntityData } from '../../entities/selectors';

export const isDependentEntitesFetched = state => isEntityFetching(state, 'queues');

export const getQueues = state => {
  const queues = getEntityData(state, 'queues');
  return queues && queues.size > 0 ? queues.toJS().map(a => ({ label: a.name, value: a.id })) : [];
};

export const getSelectedFilterOption = (state, filterType) =>
  state.getIn(['ForecastDashboards', 'filters', filterType]);

export const selectShowHideGraph = (state, statType) =>
  state.getIn(['ForecastDashboards', 'stats', statType, 'hideGraph']);
