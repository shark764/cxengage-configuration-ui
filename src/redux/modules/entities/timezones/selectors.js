import { createSelector } from 'reselect';
import { List } from 'immutable';

const timezones = state => state.getIn(['Entities', 'businessHours', 'timezones'], new List());

export const getTimezones = createSelector(timezones, timezones => timezones.toJS());
