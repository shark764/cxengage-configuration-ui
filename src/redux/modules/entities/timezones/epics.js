import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { sdkPromise } from '../../../../utils/sdk';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { getCurrentEntity } from '../selectors';

import { handleError } from '../handleResult';

import { getTimezones } from './selectors';

export const fetchTimezones = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      timezones: getTimezones(store.getState())
    }))
    .filter(({ entityName, timezones }) => entityName === 'businessHours' && timezones.length === 0)
    .map(a => {
      a.sdkCall = {
        command: 'getTimezones',
        module: 'entities',
        topic: 'cxengage/entities/get-timezones-response'
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => ({
          type: 'SET_TIMEZONES',
          timezones: response.result
        }))
        .catch(error => handleError(error, a))
    );
