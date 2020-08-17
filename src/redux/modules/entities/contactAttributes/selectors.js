/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { Map, List, fromJS } from 'immutable';

import { getCurrentFormValues } from '../../form/selectors';
import { getEntities, getSelectedEntity, getSelectedEntityId } from '../selectors';

export const getContactAttributes = createSelector(
  getEntities,
  entitites => entitites && entitites.getIn(['contactAttributes', 'data'])
);

export const getContactAttributesNames = createSelector(
  [getContactAttributes],
  contactAttributes =>
    contactAttributes && contactAttributes.size > 0
      ? contactAttributes
          .toJS()
          .map(attribute => attribute.objectName)
          .sort((a, b) => (a.toUpperCase() < b.toUpperCase() ? -1 : 0))
      : undefined
);

export const getMandatoryContactAttributes = createSelector(
  [getContactAttributes],
  contactAttributes => contactAttributes && contactAttributes.filter(attribute => attribute.get('mandatory') === true)
);

export const selectContactAttributeFormInitalValues = createSelector(
  [getSelectedEntity, getSelectedEntityId],
  (selectedEntity, selectedEntityId) => {
    if (selectedEntityId === 'create') {
      return fromJS({
        label: [{ label: '', language: '' }]
      });
    } else {
      // convert label object to array :
      return selectedEntity
        ? selectedEntity.update('label', label =>
            label.reduce((r, v, k) => r.push(fromJS({ label: v, language: k })), List())
          )
        : List();
    }
  }
);

export const getContactAttributesFormSubmitValues = createSelector(
  [getCurrentFormValues, getSelectedEntityId],
  (currentFormValues, selectedEntityId) => {
    const submitValues =
      currentFormValues &&
      currentFormValues.update('label', label =>
        label.reduce(
          (r, v) => (v.get('language') !== '' && v.get('label') !== '' ? r.set(v.get('language'), v.get('label')) : r),
          Map({})
        )
      );
    if (selectedEntityId === 'create') {
      return submitValues;
    } else {
      return fromJS({
        active: submitValues.get('active'),
        default: submitValues.get('default'),
        mandatory: submitValues.get('mandatory'),
        label: submitValues.get('label')
      });
    }
  }
);
