/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

export const FetchDependencies = (action$, store) =>
  action$
    .ofType('SET_CURRENT_ENTITY')
    .filter(({ entityName }) => entityName === 'forecastDashboards')
    .map(() => ({
      type: 'FETCH_DATA',
      entityName: 'queues'
    }));
