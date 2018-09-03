/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';

import { sdkPromise } from '../../../../utils/sdk';
import {
  startReportingSubscriptions,
  reportingSubscriptionStarted
} from './index';

export const StartBatchRequest = (action$, store) =>
  action$.ofType('START_REPORTING_BATCH_REQUEST_$').switchMap(action =>
    fromPromise(
      sdkPromise(
        {
          module: 'reporting',
          command: `addStatSubscription`,
          data: {
            statistic: 'interactions-in-conversation-list',
            statId: 'interactions-in-conversation-list'
          },
          topic: `cxengage/reporting/stat-subscription-added`
        }
      )
    ).mapTo(startReportingSubscriptions())
  );

export const StartBatchSubscription = (action$, store) =>
  action$.ofType('START_REPORTING_SUBSCRIPTION_$').switchMap(action =>
    fromPromise(
      sdkPromise(
        {
          module: 'subscribe',
          command: 'cxengage/reporting/batch-response',
          topic: 'cxengage/reporting/batch-response'
        }
      )
    ).mapTo(reportingSubscriptionStarted())
  );
