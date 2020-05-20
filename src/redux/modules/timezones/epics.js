import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { sdkPromise } from '../../../utils/sdk';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { getCurrentEntity, getSelectedSubEntityId } from '../entities/selectors';

import { handleError } from '../entities/handleResult';

import { getTimezones } from './selectors';

export const fetchTimezones = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID', 'CREATE_DRAFT_BUSINESS_HOURS_V2_FULFILLED')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      timezones: getTimezones(store.getState()),
      subEntityId: getSelectedSubEntityId(store.getState())
    }))
    .filter(
      ({ entityName, timezones, subEntityId }) =>
        (entityName === 'businessHours' || entityName === 'businessHoursV2') && timezones.length === 0
    )
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
