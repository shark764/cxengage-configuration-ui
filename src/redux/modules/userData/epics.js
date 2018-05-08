/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';

import { sdkCall } from '../../../utils/sdk';

import { getCurrentEntity } from '../entities/selectors';

// This epic tells the SDK to start a session
export const SetSdkActiveTenant = (action$, store) =>
  action$
    .ofType('UPDATE_USER_PERMISSIONS')
    .filter(a => getCurrentEntity(store.getState()) === 'InteractionMonitoring')
    .switchMap(action =>
      fromPromise(
        sdkCall({
          module: 'session',
          command: `setActiveTenant`,
          data: { tenantId: action.tenantInfo.tenantId }
        })
      ).map(response => ({ type: 'ACTIVE_TENANT_SET_$' }))
    );
