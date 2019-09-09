import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess } from '../handleResult';
import { Toast } from 'cx-ui-components';
import { of } from 'rxjs/observable/of';

export const fetchReportingEvents = (action$, store) =>
  action$
    .ofType('FETCH_REPORTING_EVENTS')
    .map(a => {
      a.sdkCall = {
        module: 'entities',
        command: 'getEntity',
        topic: 'cxengage/entities/get-entity-response',
        data: {
          path: ['interactions', a.interactionId, 'reporting-events'],
          stringifyKeys: true
        }
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => {
          Toast.error('Invalid Interaction Id');
          a.type = `${a.type}_REJECTED`;
          return of(a);
        })
    );
