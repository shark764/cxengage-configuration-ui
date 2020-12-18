/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEntityFetching, getEntityData } from '../../entities/selectors';

export const isDependentEntitesFetching = (state) => isEntityFetching(state, 'queues');

export const getQueues = (state) => {
  const queues = getEntityData(state, 'queues');
  return queues && queues.size > 0 && queues.filter((a) => a.get('active') === true).size > 0
    ? queues.map((a) => ({ label: a.get('name'), value: a.get('id') }))
    : [];
};

export const getSelectedFilterOption = (state, filterType) =>
  state.getIn(['ForecastDashboards', 'filters', filterType]);

export const selectShowHideGraph = (state, statType) =>
  state.getIn(['ForecastDashboards', 'stats', statType, 'hideGraph']);
