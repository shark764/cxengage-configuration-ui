/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { Map, List, fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { generateUUID } from 'serenova-js-utils/uuid';

import { getCurrentFormValues, isFormDirty } from '../../form/selectors';
import { getEntities, getSelectedEntity, getSelectedSubEntityId, getSelectedEntityId } from '../selectors';
import {
  getContactAttributes,
  getContactAttributesNames,
  getMandatoryContactAttributes
} from '../contactAttributes/selectors';

export const getContactLayoutsFormInitialValues = createSelector(
  [getSelectedEntity, getSelectedEntityId],
  (selectedEntity, selectedEntityId) =>
    selectedEntityId === 'create'
      ? Map({})
      : Map({
          name: selectedEntity.get('name'),
          description: selectedEntity.get('description'),
          active: selectedEntity.get('active')
        })
);

// Arrange contact-layout items that belong to the same category under the first category-item in each list:
export const selectContactLayoutsHeaders = createSelector([getCurrentFormValues], values => {
  if (values && values.get('layout') && values.get('layout').size > 0) {
    return values.get('layout').reduce((accumlator, currentLayout) => {
      const hierarchyExists = accumlator.find(val => val.get('hierarchy') === currentLayout.get('hierarchy'));
      if (!hierarchyExists) {
        return accumlator.push(currentLayout);
      }
      return accumlator;
    }, List());
  } else {
    return List();
  }
});

export const isCurrentFormMissingMandatoryAttributes = createSelector(
  [getCurrentFormValues, getMandatoryContactAttributes],
  (currentFormValues, mandatoryAttributes) =>
    currentFormValues && currentFormValues.get('layout')
      ? mandatoryAttributes &&
        mandatoryAttributes.some(
          mandatoryAttribute =>
            currentFormValues
              .get('layout')
              .find(layout => layout.get('contactAttributeId') === mandatoryAttribute.get('id')) === undefined
        )
      : false
);

export const getMissingMandatoryAttributesNames = createSelector(
  [getCurrentFormValues, getMandatoryContactAttributes],
  (currentFormValues, mandatoryAttributes) => {
    if (currentFormValues && currentFormValues.get('layout')) {
      const missingMandatoryAttributes =
        mandatoryAttributes &&
        mandatoryAttributes.filter(
          mandatoryAttribute =>
            currentFormValues
              .get('layout')
              .find(layout => layout.get('contactAttributeId') === mandatoryAttribute.get('id')) === undefined
        );
      return missingMandatoryAttributes ? missingMandatoryAttributes.map(attr => attr.get('objectName')) : List();
    } else {
      return List();
    }
  }
);

export const getExistingCategories = createSelector(
  [getCurrentFormValues],
  currentFormValues =>
    currentFormValues && currentFormValues.get('layout')
      ? currentFormValues.get('layout').reduce((accumlator, currentLayout) => {
          const hierarchyIndex = accumlator.findIndex(
            val => val.get('categoryUUID') === currentLayout.get('categoryUUID')
          );
          return hierarchyIndex === -1
            ? accumlator.push(
                fromJS({ hierarchy: currentLayout.get('hierarchy'), categoryUUID: currentLayout.get('categoryUUID') })
              )
            : accumlator;
        }, List())
      : List()
);

export const getExistingCategoryNamesInCurrentLayout = createSelector(
  [getExistingCategories],
  existingCategories =>
    existingCategories && existingCategories.size > 0 ? existingCategories.map(a => a.get('hierarchy')) : List()
);

export const getContactLayoutsFormSubmitValues = createSelector(
  [getCurrentFormValues, getSelectedEntityId],
  (currentFormValues, selectedEntityId) => {
    const updatedValues = currentFormValues.update('layout', layout =>
      layout.reduce((accumlator, currentLayout) => {
        const hierarchyIndex = accumlator.findIndex(
          val => (val.getIn(['label', 'name']) || val.getIn(['label', 'en-US'])) === currentLayout.get('hierarchy')
        );
        if (hierarchyIndex === -1) {
          return accumlator.push(
            fromJS({
              label: currentLayout.get('label'),
              attributes: [currentLayout.get('contactAttributeId')]
            })
          );
        } else {
          return accumlator.updateIn([hierarchyIndex, 'attributes'], attributes =>
            attributes.push(currentLayout.get('contactAttributeId'))
          );
        }
      }, List())
    );
    return fromJS({
      name: updatedValues.get('name'),
      description: updatedValues.get('description') ? updatedValues.get('description') : '',
      active: selectedEntityId === 'create' ? false : updatedValues.get('active'),
      layout: updatedValues.get('layout')
    });
  }
);

// Contact-Attributes must be unique in a layout, filter out the attributes that were already selected:
export const getAvailableContactAttributesNames = createSelector(
  [getContactAttributesNames, getCurrentFormValues],
  (attributeNames, formValues) =>
    attributeNames &&
    attributeNames.filter(
      attrName => formValues.get('layout').find(layout => layout.get('name') === attrName) === undefined
    )
);

export const getContactLayoutsSubEntityFormInitialValues = createSelector(
  [getCurrentFormValues, getSelectedSubEntityId],
  (currentFormValues, selectedSubEntityId) => {
    if (selectedSubEntityId === 'create') {
      return fromJS({
        label: [{ label: '', language: '' }],
        categoryUUID: generateUUID(),
        droppableUUID: generateUUID(),
        draggableUUID: generateUUID(),
        endpointUUID: generateUUID()
      });
    } else {
      const categoryUUID = selectedSubEntityId.startsWith('createListItem')
        ? selectedSubEntityId.replace('createListItem:', '')
        : selectedSubEntityId.replace('updateCategoryHeader:', '');

      // select the first category item in the list:
      const layout =
        currentFormValues &&
        currentFormValues.get('layout') &&
        currentFormValues.get('layout').find(layout => layout.get('categoryUUID') === categoryUUID);

      // convert label object to array & remove label item that have key "name":
      const values = layout
        ? layout
            .update('label', label => label.reduce((r, v, k) => r.push(fromJS({ label: v, language: k })), List()))
            .update('label', label => label.filter(a => a.get('language') !== 'name'))
        : List();

      // set draggableUUID, endpointUUID & remove name key from the values while creating a new list-item:
      return selectedSubEntityId.startsWith('createListItem:')
        ? values
            .set('draggableUUID', generateUUID())
            .set('endpointUUID', generateUUID())
            .delete('name')
        : values;
    }
  }
);

export const getContactLayoutsSubEntityFormSubmitValues = (state, props) => {
  if (props.values && props.values.size > 0) {
    // change the label array back to object & update the name key for the category localization:
    const updatedValues = props.values
      .update('label', label =>
        label.reduce(
          (r, v) => (v.get('language') !== '' && v.get('label') !== '' ? r.set(v.get('language'), v.get('label')) : r),
          Map({})
        )
      )
      .update('label', label => label.set('name', props.values.get('hierarchy')));

    // update the contactAttributeId to match the selected contactAttribute:
    const attribute =
      getContactAttributes(state) &&
      getContactAttributes(state).find(attr => attr.get('objectName') === updatedValues.get('name'));

    const subFormValues = attribute ? updatedValues.set('contactAttributeId', attribute.get('id')) : updatedValues;

    return getCurrentFormValues(state).update('layout', layout => {
      if (props.selectedSubEntityId.startsWith('create')) {
        return layout.push(subFormValues);
      } else {
        return layout.map(
          a =>
            a.get('categoryUUID') === subFormValues.get('categoryUUID')
              ? a.set('label', subFormValues.get('label')).set('hierarchy', subFormValues.get('hierarchy'))
              : a
        );
      }
    });
  } else {
    return Map({});
  }
};

export const getActiveContactLayouts = createSelector(
  getEntities,
  entitites => (entitites ? entitites.getIn(['contactLayouts', 'data']).filter(a => a.get('active') === true) : [])
);

export const shouldDisableContactLayoutsStatusToggle = createSelector(
  [isCurrentFormMissingMandatoryAttributes, getSelectedEntity, getActiveContactLayouts, isFormDirty],
  (missingMandatoryAttributes, selectedEntity, activeContactLayouts, isFormDirty) =>
    isFormDirty ||
    missingMandatoryAttributes ||
    (selectedEntity && selectedEntity.get('active') === true ? activeContactLayouts.size === 1 : false)
);
