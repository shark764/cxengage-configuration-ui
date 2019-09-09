import { selectFormInitialValues, getCurrentSubFormValueByFieldName } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';
import { entitiesMetaData } from '../metaData';
import { onSubEntityFormSubmit } from '../../entities';

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { minutesTo12HoursString } from 'serenova-js-utils/strings';

export const selectBusinessHoursFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    const initialTimes = entitiesMetaData.businessHours.daysInitials.reduce(
      (r, key) => ({ ...r, [key.concat('StartTimeMinutes')]: 0, [key.concat('EndTimeMinutes')]: 0 }),
      {}
    );
    return Map({ active: true, businessHoursType: '24/7', timezone: 'Etc/GMT+12', ...initialTimes });
  }
  return selectFormInitialValues(state);
};

const getBusinessHourExceptions = createSelector(getSelectedEntity, businessHour => businessHour.get('exceptions'));

export const selectBusinessHourExceptions = createSelector(
  getBusinessHourExceptions,
  exceptions =>
    exceptions && exceptions.size
      ? exceptions
          .map(exception =>
            Map({
              description: exception.get('description'),
              startTime:
                exception.get('startTimeMinutes') > -1
                  ? minutesTo12HoursString(exception.get('startTimeMinutes'))
                  : 'All day',
              endTime:
                exception.get('endTimeMinutes') > -1
                  ? minutesTo12HoursString(exception.get('endTimeMinutes'))
                  : 'All day',
              date: exception.get('date').split('T')[0],
              id: exception.get('id')
            })
          )
          .toJS()
      : []
);

export const subEntityFormSubmission = (values, dispatch) => dispatch(onSubEntityFormSubmit(values, { dirty: true }));

export const exceptionOverlaps = createSelector(
  getBusinessHourExceptions,
  state => [
    getCurrentSubFormValueByFieldName(state, 'exception:create', 'isAllDay'),
    getCurrentSubFormValueByFieldName(state, 'exception:create', 'date'),
    getCurrentSubFormValueByFieldName(state, 'exception:create', 'startTimeMinutes'),
    getCurrentSubFormValueByFieldName(state, 'exception:create', 'endTimeMinutes')
  ],
  (selectBusinessHourExceptions, [isAllDay, date, startTimeMinutes, endTimeMinutes]) =>
    selectBusinessHourExceptions &&
    date &&
    selectBusinessHourExceptions.some(
      exception =>
        exception.get('date').split('T')[0] === date.toJSON().split('T')[0] &&
        (exception.get('isAllDay') ||
          isAllDay ||
          (startTimeMinutes >= exception.get('startTimeMinutes') &&
            startTimeMinutes <= exception.get('endTimeMinutes')) ||
          (endTimeMinutes !== 0 &&
            endTimeMinutes >= exception.get('startTimeMinutes') &&
            endTimeMinutes <= exception.get('endTimeMinutes')) ||
          (endTimeMinutes === 0 &&
            1440 >= exception.get('startTimeMinutes') &&
            1440 <= exception.get('endTimeMinutes')) ||
          (startTimeMinutes <= exception.get('startTimeMinutes') &&
            ((endTimeMinutes !== 0 && endTimeMinutes >= exception.get('endTimeMinutes')) ||
              (endTimeMinutes === 0 && 1400 >= exception.get('endTimeMinutes')))))
    )
);
