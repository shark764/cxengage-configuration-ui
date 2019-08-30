/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export const getRolesAfterFetchingApiKeys = action$ =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(a => a.entityName === 'apiKeys')
    .map(a => ({ type: 'FETCH_DATA', entityName: 'roles' }));
