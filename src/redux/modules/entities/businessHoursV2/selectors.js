import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import { isInvalid, isDirty } from 'redux-form/immutable';
import { generateUUID } from 'serenova-js-utils/uuid';
import moment from 'moment';

import { selectFormInitialValues, getFormValues } from '../../form/selectors';
import { getSelectedEntity, getSelectedSubEntity } from '../selectors';
import { onSubEntityFormSubmit } from '../../entities';
import { getEntityData, sidePanelHeader, isSubEntitySaving } from '../../entities/selectors';
import { getCurrentTenantId } from '../../../../redux/modules/userData/selectors';
import { getCurrentTenantTimezone } from '../../userData/selectors';

export const selectBusinessHoursV2FormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return Map({ shared: false });
  }
  return selectFormInitialValues(state);
};

export const getSelectedBusinessHourV2Version = state =>
  state.getIn(['Entities', 'businessHoursV2', 'selectedVersion']);

export const selectBusinessHoursV2Data = state =>
  getEntityData(state, 'businessHoursV2')
    .filter(businessHour => businessHour.get('tenantId') === getCurrentTenantId(state))
    .toJS();

export const selectBusinessHoursEntityVersions = createSelector(
  [getSelectedEntity, getSelectedBusinessHourV2Version],
  (selectedEntity, selectedBusinessHour) =>
    selectedEntity &&
    selectedEntity.get('versions') &&
    List.isList(selectedEntity.get('versions')) &&
    selectedEntity
      .get('versions')
      .sort((versionA, versionB) => {
        const createdA = new Date(versionA.get('created'));
        const createdB = new Date(versionB.get('created'));

        if (createdA > createdB) {
          return -1;
        } else if (createdA < createdB) {
          return 1;
        } else {
          return 0;
        }
      })
      .map((version, index) => ({
        id: version.get('id'), // Used to set in selectedVersion on redux in EntityTable
        version: `v${selectedEntity.get('versions').size - index}`,
        name: version.get('name'),
        description: version.get('description'),
        createdBy: version.get('createdByName'),
        createdOn: version.get('created'),
        value: version.get('id'),
        label: `v${selectedEntity.get('versions').size - index} - ${version.get('name')}`,
        timezone: version.get('timezone'),
        viewing: selectedBusinessHour === version.get('id'),
        rules: version.get('rules').toJS()
      }))
      .toJS()
);

export const panelHeaderBusinessHoursV2 = createSelector(
  sidePanelHeader,
  getSelectedEntity,
  getSelectedSubEntity,
  (panelHeaderData, entity, subEntity) => {
    if (subEntity) {
      return {
        title: entity && entity.get('name')
      };
    } else {
      return panelHeaderData;
    }
  }
);

export const selectRules = createSelector(
  getSelectedEntity,
  getSelectedSubEntity,
  getSelectedBusinessHourV2Version,
  (entity, subEntity, selectedVersion) => {
    if (subEntity) {
      return (
        subEntity &&
        List.isList(subEntity.get('rules')) &&
        subEntity.get('rules').reduce((ruleList, rule) => {
          const { startDate, endDate, on, on: { type, value } = {}, repeats, ...r } = rule.toJS();
          return [
            ...ruleList,
            {
              ...r,
              id: generateUUID(),
              startDate: moment(startDate.split('T')[0]).toDate(),
              ...(endDate ? { endDate: moment(endDate.split('T')[0]).toDate() } : {}),
              ...(on && type && value && type === 'day' && typeof value === 'number'
                ? {
                    on: {
                      type: value,
                      value: type
                    }
                  }
                : on ? { on } : {}),
              ...(!repeats ? { repeats: 'none' } : { repeats })
            }
          ];
        }, [])
      );
    } else {
      return (
        selectedVersion &&
        entity &&
        entity.get('versions') &&
        List.isList(entity.get('versions')) &&
        entity.get('versions').find(version => version.get('id') === selectedVersion) &&
        entity
          .get('versions')
          .find(version => version.get('id') === selectedVersion)
          .get('rules')
          .reduce((ruleList, rule) => {
            const { startDate, endDate, on, on: { type, value } = {}, repeats, ...r } = rule.toJS();
            return [
              ...ruleList,
              {
                ...r,
                id: generateUUID(),
                startDate: moment(startDate.split('T')[0]).toDate(),
                ...(endDate ? { endDate: moment(endDate.split('T')[0]).toDate() } : {}),
                // I know this makes no sense based on the API contract file, but it's the only way to keep the inputs
                // "consistent" and we don't end up crazy trying to figure out what to do on the business hours rule
                // component. We change it around anyways once it needs to be sent to the API on the epics.
                ...(on && type && value && type === 'day' && typeof value === 'number'
                  ? {
                      on: {
                        type: value,
                        value: type
                      }
                    }
                  : on ? { on } : {}),
                ...(!repeats ? { repeats: 'none' } : { repeats })
              }
            ];
          }, [])
      );
    }
  }
);

export const selectBusinessHoursV2RulesFormInitalValues = createSelector(
  getSelectedSubEntity,
  selectRules,
  (subEntity, rules) => {
    const created = subEntity && new Date(subEntity.get('created'));
    const updated = subEntity && new Date(subEntity.get('updated'));
    return Map({
      rules:
        subEntity && !rules && created.getTime() === updated.getTime()
          ? List([
              {
                id: 'new-rule',
                startDate: new Date(),
                hours: {
                  allDay: true
                },
                name: ''
              }
            ])
          : List(rules || [])
    });
  }
);

export const selectBusinessHoursV2DraftFormInitalValues = createSelector(
  getSelectedSubEntity,
  getCurrentTenantTimezone,
  (selectedSubEntity, currentTenantTimezone) => {
    if (selectedSubEntity) {
      return Map({
        name: selectedSubEntity.get('name'),
        timezone: selectedSubEntity.get('timezone') || currentTenantTimezone,
        description: selectedSubEntity.get('description'),
        created: selectedSubEntity.get('created'),
        updated: selectedSubEntity.get('updated')
      });
    } else {
      return Map({
        name: '',
        timezone: currentTenantTimezone
      });
    }
  }
);

export const selectRulesFormViewMode = state => getSelectedEntity(state) && !getSelectedSubEntity(state);

export const draftFormsAreInvalid = state =>
  isInvalid('draft:edit')(state) || isInvalid('businessHoursV2:rules')(state);

export const draftFormsAreDirty = state => isDirty('draft:edit')(state) || isDirty('businessHoursV2:rules')(state);

export const shouldPublishDraft = state =>
  getFormValues(state, 'draft:edit', 'timezone') &&
  getFormValues(state, 'businessHoursV2:rules', 'rules') &&
  getFormValues(state, 'businessHoursV2:rules', 'rules').size > 0;

export const isPublishingDraft = state => state.getIn(['Entities', 'businessHoursV2', 'isPublishingDraft']);

export const selectRulesFormDisabled = state =>
  !getSelectedSubEntity(state) || isSubEntitySaving(state) || isPublishingDraft(state);

export const subEntityFormSubmission = (values, dispatch) => dispatch(onSubEntityFormSubmit(values, { dirty: true }));

export const isCreatingDraft = state => state.getIn(['Entities', 'businessHoursV2', 'isCreatingDraft']);

export const selectDrafts = createSelector(
  getSelectedEntity,
  entity =>
    entity &&
    entity.get('items') &&
    List.isList(entity.get('items')) &&
    entity
      .get('items')
      .map(draft => ({
        id: draft.get('id'), // Used to set in selectedVersion on redux in EntityTable
        version: 'Draft',
        name: draft.get('name'),
        createdBy: draft.get('createdByName'),
        createdOn: draft.get('created'),
        timezone: draft.get('timezone'),
        rules: draft.get('rules') && draft.get('rules').toJS(),
        description: draft.get('description')
      }))
      .toJS()
);
