import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';

export const selectBusinessHoursV2FormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return Map({ active: true, shared: false });
  }
  return selectFormInitialValues(state);
};

export const getBusinessHourV2Drafts = createSelector(
  getSelectedEntity,
  businessHour =>
    businessHour &&
    businessHour.get('drafts') &&
    List.isList(businessHour.get('drafts')) &&
    businessHour.get('drafts').toJS()
);
