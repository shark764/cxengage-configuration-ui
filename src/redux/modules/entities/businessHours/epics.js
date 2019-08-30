import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { change } from 'redux-form';
import { removeLastLetter, camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';

import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const changeBusinessHoursType = (action$, store) =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(a => a.meta.form.includes('businessHours') && a.meta.field === 'businessHoursType')
    .mergeMap(a => {
      return days
        .reduce((r, i) => [...r, i.concat('StartTimeMinutes'), i.concat('EndTimeMinutes')], [])
        .map(i => change(a.meta.form, i, a.payload === 'scheduledHours' && i.includes('EndTimeMinutes') ? 1440 : 0));
    });

export const CreateBusinessHours = action$ =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'businessHours')
    .map(a => {
      a.sdkCall = entitiesMetaData['businessHours'].entityApiRequest('create', 'singleMainEntity');
      const timeMinutes = Object.entries(a.values)
        .filter(([key, value]) => key.includes('StartTimeMinutes') || key.includes('EndTimeMinutes'))
        .reduce(
          (r, [key, value]) => ({
            ...r,
            [key]:
              key.includes('EndTimeMinutes') && a.values.businessHoursType === 'scheduledHours' && value === 0
                ? 1440
                : value
          }),
          {}
        );
      const { timezone, name, description } = a.values;

      a.sdkCall.data.timeMinutes = timeMinutes;
      a.sdkCall.data.timezone = timezone;
      a.sdkCall.data.active = true;
      a.sdkCall.data.name = name;
      a.sdkCall.data.description = description;

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('businessHours')} was created successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const UpdateBusinessHours = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'businessHours')
    .map(a => {
      a.sdkCall = entitiesMetaData['businessHours'].entityApiRequest('update', 'singleMainEntity');
      const timeMinutes = Object.entries(a.values)
        .filter(([key, value]) => key.includes('StartTimeMinutes') || key.includes('EndTimeMinutes'))
        .reduce(
          (r, [key, value]) => ({
            ...r,
            [key]:
              key.includes('EndTimeMinutes') && a.values.businessHoursType === 'scheduledHours' && value === 0
                ? 1440
                : value
          }),
          {}
        );
      const { timezone, name, description } = a.values;

      a.sdkCall.data.timeMinutes = timeMinutes;
      a.sdkCall.data.timezone = timezone;
      a.sdkCall.data.name = name;
      a.sdkCall.data.description = description;
      a.sdkCall.data[removeLastLetter('businessHours') + 'Id'] = a.entityId;

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('businessHours')} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );
