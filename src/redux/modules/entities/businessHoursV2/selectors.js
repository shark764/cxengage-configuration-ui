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
    businessHour.get('items') &&
    List.isList(businessHour.get('items')) &&
    businessHour.get('items').toJS()
);

export const selectBusinessHoursEntityVersions = createSelector(
  [getSelectedEntity],
  selectedEntity =>
    (selectedEntity &&
      selectedEntity.get('versions') &&
      List.isList(selectedEntity.get('versions')) &&
      selectedEntity
        .get('versions')
        .map((version, index) => ({
          id: version.get('id'), // Used to set in selectedVersion on redux in EntityTable
          version: `v${selectedEntity.get('versions').size - index}`,
          name: `v${selectedEntity.get('versions').size - index} - ${version.get('name')}`,
          createdBy: version.get('createdByName'),
          createdOn: version.get('created'),
          rules: version.get('rules').toJS(),
          value: version.get('id'),
          label: `v${selectedEntity.get('versions').size - index} - ${version.get('name')}`
        }))
        .toJS()) ||
    []
);

export const getBusinessHourActiveVersion = createSelector(
  [getSelectedEntity],
  selectedEntity => (selectedEntity && selectedEntity.get('activeVersion')) || ''
);

export const selectBusinessHoursRules = createSelector(
  [getSelectedEntity],
  selectedEntity =>
    (selectedEntity &&
    selectedEntity.get('versions') &&
    List.isList(selectedEntity.get('versions')) &&
    (selectedEntity.get('selectedVersion') || selectedEntity.get('activeVersion')) && // When the component is loading, there is no selectedVersion yet, so we use activeVersion
      selectedEntity.get('versions').size > 0 &&
      selectedEntity
        .get('versions')
        .find(
          version =>
            version.get('id') === (selectedEntity.get('selectedVersion') || selectedEntity.get('activeVersion'))
        )
        .get('rules')
        .toJS() //
        .map(({ startDate, endDate, ...rule }, index) => ({
          ...rule,
          ...(startDate && { startDate: new Date(startDate) }),
          ...(endDate && { endDate: new Date(endDate) }),
          id: index.toString() // id required for BusinessRuleComponent
        }))) ||
    []
);
