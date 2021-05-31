import { createSelector } from 'reselect';
import { Map, List, fromJS } from 'immutable';

import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity, getSelectedSubEntity } from '../selectors';
import { ednRuleToImmutable } from './ednHelpers';

export const selectCapacityRulesFormInitialValues = (state) => {
  if (getSelectedEntity(state) === undefined) {
    return Map({ name: '' });
  }
  return selectFormInitialValues(state);
};

export const getCapacityRules = (state) => state.getIn(['Entities', 'capacityRules', 'data']);

export const getCapacityRulesSelector = createSelector([getCapacityRules], (capacityRules) =>
  capacityRules.filter((rule) => rule.get('active')).map((rule) => ({ label: rule.get('name'), value: rule.get('id') }))
);

export const selectCapacityRuleVersions = createSelector(
  getSelectedEntity,
  (capacityRule) =>
    capacityRule
      ? capacityRule
        .get('items', List([]))
        .map((capacityRule, i) => capacityRule.set('numericOrderVersion', `v${i + 1}`))
        .toJS()
      : List([]).toJS()
);

export const selectCapacityRuleVersionFormInitialValues = createSelector(
  getSelectedSubEntity,
  (version) =>
    version
      ? (version.get('ruleSet') || version.get('rules')) &&
      version.set('rule', ednRuleToImmutable(version.get('ruleSet'))).set('rules', version.get('rules'))
      : fromJS({
        rule: {
          voice: true,
          groups: [
            {
              channels: ['email', 'messaging'],
              interactions: 4,
            },
          ],
        },
        rules: [
          {
            channels: ['voice'],
            max: 1,
            weight: 100
          },
          {
            channels: ['email'],
            max: 1,
            weight: 100,
          },
          {
            channels: ['messaging'],
            max: 1,
            weight: 100,
          },
          {
            channels: ['sms'],
            max: 1,
            weight: 100,
          },
          {
            channels: ['work-item'],
            max: 1,
            weight: 100,
          },
        ],
        quantifier: 'any',
      })
);
