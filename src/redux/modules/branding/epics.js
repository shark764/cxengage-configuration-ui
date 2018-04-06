/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../utils/sdk';
import { of } from 'rxjs/observable/of';

export const FetchBranding = action$ =>
  action$.ofType('FETCH_BRANDING').switchMap(() =>
    fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: 'getBranding',
          data: {}
        },
        'cxengage/entities/get-branding-response'
      )
    )
      .map(response => ({
        type: 'FETCH_BRANDING_FULFILLED',
        response
      }))
      .catch(error =>
        of({
          type: 'FETCH_BRANDING_REJECTED',
          error
        })
      )
  );