import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { change } from 'redux-form';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';

import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';
import { getCurrentEntity, getSelectedEntityId } from '../selectors';
import { getCurrentFormValueByFieldName } from '../../form/selectors';

export const changeBusinessHoursType = action$ =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(a => a.meta.form.includes('businessHours') && a.meta.field === 'businessHoursType')
    .mergeMap(a =>
      entitiesMetaData.businessHours.daysInitials
        .reduce((r, i) => [...r, i.concat('StartTimeMinutes'), i.concat('EndTimeMinutes')], [])
        .map(i => change(a.meta.form, i, a.payload === 'scheduledHours' && i.includes('EndTimeMinutes') ? 1440 : 0))
    );

export const noHoursChange = (action$, store) =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(a => a.meta.form.includes('businessHours') && a.meta.field.includes('TimeMinutes'))
    .filter(a => {
      const dayInitial = a.meta.field.substring(0, 3);
      return (
        a.payload === -1 &&
        getCurrentFormValueByFieldName(
          store.getState(),
          dayInitial.concat(a.meta.field.includes('Start') ? 'End' : 'Start', 'TimeMinutes')
        ) !== -1
      );
    })
    .map(a => {
      const dayInitial = a.meta.field.substring(0, 3);
      return change(
        a.meta.form,
        dayInitial.concat(a.meta.field.includes('Start') ? 'End' : 'Start', 'TimeMinutes'),
        -1
      );
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

      a.sdkCall.data = {
        timeMinutes,
        timezone,
        active: true,
        name,
        description
      };

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

      a.sdkCall.data = {
        timeMinutes,
        timezone,
        name,
        description,
        businessHourId: a.entityId
      };

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

export const changeExceptionType = action$ =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(a => a.meta.form === 'exception:create' && a.meta.field === 'isAllDay')
    .mergeMap(a => [
      change(a.meta.form, 'startTimeMinutes', a.payload ? -1 : 0),
      change(a.meta.form, 'endTimeMinutes', a.payload ? -1 : 0)
    ]);

export const createException = (action$, store) =>
  action$
    .ofType('CREATE_SUB_ENTITY')
    .map(a => ({
      ...a,
      entityId: getSelectedEntityId(store.getState()),
      entityName: getCurrentEntity(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'businessHours')
    .map(a => {
      a.sdkCall = entitiesMetaData['businessHours'].entityApiRequest('create', 'subEntity');
      const { date, description, isAllDay, startTimeMinutes, endTimeMinutes } = a.values;
      a.sdkCall.data = {
        businessHourId: a.entityId,
        date: new Date(date.toJSON().split('T')[0]).toJSON(),
        description,
        isAllDay,
        startTimeMinutes,
        endTimeMinutes: endTimeMinutes === 0 ? 1440 : endTimeMinutes
      };
      return { ...a, type: 'CREATE_EXCEPTION' };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `<i>Exception</i> was created successfully!`))
        .catch(error => handleError(error, a))
    );

export const removeException = (action$, store) =>
  action$
    .ofType('REMOVE_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      listId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'businessHours')
    .map(a => {
      a.sdkCall = entitiesMetaData['businessHours'].entityApiRequest('delete', 'subEntity');
      a.sdkCall.data = {
        businessHourId: a.listId,
        exceptionId: a.listItemId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );
