/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';

import { sdkPromise } from '../../../../utils/sdk';

export const startBatchRequest = (action$, store) =>
  action$.ofType('START_REPORTING_BATCH_REQUEST_$').switchMap(action =>
    fromPromise(
      sdkPromise(
        {
          module: 'reporting',
          command: `addStatSubscription`,
          data: {
            statistic: 'interactions-in-conversation-list',
            statId: 'interactions-in-conversation-list'
          }
        },
        `cxengage/reporting/stat-subscription-added`
      )
    ).map(response => ({ type: 'START_REPORTING_SUBSCRIPTION_$' }))
  );

export const startBatchSubscription = (action$, store) =>
  action$.ofType('START_REPORTING_SUBSCRIPTION_$').switchMap(action =>
    fromPromise(
      sdkPromise(
        {
          module: 'subscribe',
          command: 'cxengage/reporting/batch-response'
        },
        'cxengage/reporting/batch-response'
      )
    ).map(response => ({ type: 'REPORTING_SUBSCRIPTION_STARTED_$' }))
  );
