/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/mergeMap';
import { fetchData } from '../index';

export const FetchBranding = action$ =>
  action$
    .ofType('FETCH_BRANDING_$')
    .mergeMap(() => [fetchData('branding'), fetchData('protectedBranding')]);
