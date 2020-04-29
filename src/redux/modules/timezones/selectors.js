import { createSelector } from 'reselect';
import { List } from 'immutable';

const timezones = state => state.getIn(['timezones', 'allZones'], new List());

export const getTimezones = createSelector(timezones, timezones =>
  timezones.toJS().sort((a, b) => (a.timezone.toUpperCase() < b.timezone.toUpperCase() ? -1 : 0))
);
