import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';
import { Map } from 'immutable';

export const selectBusinessHoursFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    const initialTimes = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].reduce(
      (r, key) => ({ ...r, [key.concat('StartTimeMinutes')]: 0, [key.concat('EndTimeMinutes')]: 0 }),
      {}
    );
    return new Map({ active: true, businessHoursType: '24/7', timezone: 'Etc/GMT+12', ...initialTimes });
  }
  return selectFormInitialValues(state);
};
