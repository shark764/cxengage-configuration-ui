import { createSelector } from 'reselect';

export const getCapacityRules = state => state.getIn(['Entities', 'capacityRules', 'data']);

export const getCapacityRulesSelector = createSelector([getCapacityRules], capacityRules =>
  capacityRules.filter(rule => rule.get('active')).map(rule => ({ label: rule.get('name'), value: rule.get('id') }))
);
