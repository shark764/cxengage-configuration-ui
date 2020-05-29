import { createSelector } from 'reselect';
import { List } from 'immutable';

const timezones = state => state.getIn(['Entities', 'timezones', 'data'], List());

export const getTimezones = createSelector(
  timezones,
  timezones =>
    timezones && timezones.size > 0
      ? timezones.toJS().sort((a, b) => (a.timezone.toUpperCase() < b.timezone.toUpperCase() ? -1 : 0))
      : []
);

export const selectTimezonesDropDownList = createSelector([getTimezones], timezones =>
  timezones.map(({ offset, timezone }) => ({ label: `(${offset}) ${timezone}`, value: timezone }))
);
