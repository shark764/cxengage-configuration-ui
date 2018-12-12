export const getCapacityRules = state => state.getIn(['Entities', 'capacityRules', 'data']);

export const getCapacityRulesSelector = state => [
  ...getCapacityRules(state)
    .toJS()
    .filter(rule => rule.active)
    .map(rule => ({
      label: rule.name,
      value: rule.id
    })),
  { value: 'null', label: 'Use Tenant Default' }
];
