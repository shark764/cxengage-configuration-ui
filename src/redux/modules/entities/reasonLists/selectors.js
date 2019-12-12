/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import {
  selectFormInitialValues,
  getCurrentFormValueByFieldName,
  getCurrentSubFormValueByFieldName,
  getCurrentSubmittingFormProps,
  getCurrentSubmittingFormValues
} from '../../form/selectors';
import {
  getSelectedEntity,
  getSelectedEntityId,
  getEntityData,
  getAllEntities as getAllEntitiesFromStore,
  getSelectedSubEntityId
} from '../selectors';
import { List, Map, fromJS } from 'immutable';
import { generateUUID } from 'serenova-js-utils/uuid';

export const getInitialReason = (state, listName) => {
  if (getAllEntitiesFromStore(state) && getSelectedEntityId(state) !== 'create') {
    let reasonLists = getAllEntitiesFromStore(state).toJS();
    let index = reasonLists.findIndex(x => x.name === listName);
    let reasons = reasonLists[index].reasons;
    return reasons;
  }
  return [];
};

export const getAllReasons = state => {
  if (getEntityData(state, 'reasons')) {
    let reasons = getEntityData(state, 'reasons').toJS();
    return reasons;
  }
  return [];
};

export const reasonListsInitialValues = state => {
  if (getSelectedEntityId(state) !== 'create') {
    return Map({
      name: getSelectedEntity(state).get('name'),
      description: getSelectedEntity(state).get('description'),
      isDefault: getSelectedEntity(state).get('isDefault') || false,
      shared: getSelectedEntity(state).get('shared')
    });
  } else {
    return Map({ active: true, shared: false, isDefault: false });
  }
};

export const checkDisableShared = state => {
  const initialValues = selectFormInitialValues(state);

  return initialValues.get('shared') && initialValues.get('id') !== undefined;
};

export const currentFormReasons = state => getCurrentFormValueByFieldName(state, 'reasons');

// Groups reasonListItems based on the category they belong to:
export const selectReasonHeaders = createSelector(currentFormReasons, reasons => {
  if (reasons && reasons.size > 0) {
    // Finds the first reasonListItem in each category, so that rest of the items can be grouped under them:
    return reasons.reduce((accumlator, currentVal) => {
      // When "create", currentVal.get('hierarchy')[0]
      let currHierarchy = currentVal.get('hierarchy')[0]
        ? currentVal.get('hierarchy')[0]
        : currentVal.get('hierarchy').toJS()[0];
      const hierarchyExists = accumlator.find(val => {
        return val.get('hierarchy').toJS()[0] === currHierarchy;
      });
      if (!hierarchyExists) {
        return accumlator.push(
          fromJS({
            name: currentVal.get('name'),
            hierarchy: currentVal.get('hierarchy'),
            categoryUUID: currentVal.get('categoryUUID'),
            droppableUUID: currentVal.get('droppableUUID')
          })
        );
      }
      return accumlator;
    }, List());
  }
});

export const isUserCreatingNewCategory = state =>
  getCurrentSubFormValueByFieldName(state, `reasonListItems:${getSelectedSubEntityId(state)}`, 'newCategory');

export const hierarchyInputText = state =>
  getCurrentSubFormValueByFieldName(state, `reasonListItems:${getSelectedSubEntityId(state)}`, 'hierarchy');

// While updating a reasonListItem, the subEntityForm should be pre-populated with it's field values:
export const getSelectedReasonListItemValues = createSelector(
  [currentFormReasons, getSelectedSubEntityId],
  (reasons, subEntityId) => {
    // while updating cateoryheader, just return hierarchy title:
    if (subEntityId.includes('updateCategoryHeader')) {
      const a = reasons.find(reason => `updateCategoryHeader:${reason.get('categoryUUID')}` === subEntityId);
      return Map({ hierarchy: a.toJS().hierarchy[0] });
    }
  }
);

// ReasonList Item update Selector:
export const reasonListItemUpdateValues = createSelector(
  [getSelectedSubEntityId, currentFormReasons, getCurrentSubmittingFormProps],
  (selectedSubEntityId, existingReasons, props) => {
    // updates hierarchy title:
    if (selectedSubEntityId.includes('updateCategoryHeader')) {
      const updatedReasons = existingReasons.map(reason => {
        let hierarchy = reason.get('hierarchy')[0] ? reason.get('hierarchy')[0] : reason.get('hierarchy').toJS()[0];
        return hierarchy === props.initialValues.get('hierarchy')
          ? reason.set('hierarchy', [props.values.get('hierarchy')])
          : reason;
      });
      return updatedReasons;
    }
  }
);

export const getCurrentReasonList = state => {
  return getInitialReason(state, getCurrentFormValueByFieldName(state, 'name'));
};

// When creating a new reasonList, reasonListItems should contain UUID's for the drag and drop component to work or else the UI breaks:
export const selectReasonUUIDS = createSelector(
  [getCurrentSubmittingFormValues, getAllReasons, getCurrentReasonList],
  (values, reasons, current) => {
    let reason = reasons.filter(reason => reason.id === values.get('reason'));
    return fromJS(reason[0])
      .set('hierarchy', [values.get('hierarchy')])
      .set('sortOrder', current.length)
      .set('reasonId', reason[0].id)
      .set('draggableUUID', generateUUID())
      .set('reasonUUID', generateUUID())
      .set('categoryUUID', generateUUID())
      .set('droppableUUID', generateUUID())
      .delete('newCategory');
  }
);

// Adds reasonListItems to the current form values based on the hierarchy:
export const reasonListItemCreateValues = createSelector(
  [selectReasonUUIDS, currentFormReasons],
  (values, existingReasons) => {
    if (existingReasons !== undefined) {
      const hierarchyExists = existingReasons.find(reason => reason.get('hierarchy')[0] === values.get('hierarchy')[0]);
      if (!hierarchyExists) {
        // If a reasonListItem is being created under new hierarchy:
        const updatedValues = existingReasons.push(values);
        return updatedValues;
      } else {
        // If a reasonListItem is being created under an existing hierarchy:
        const updatedValues = existingReasons.push(
          values
            .set('categoryUUID', hierarchyExists.get('categoryUUID'))
            .set('droppableUUID', hierarchyExists.get('droppableUUID'))
        );
        return updatedValues;
      }
    } else {
      // If there are no existing reasonListItems in the reasonList:
      const updatedValues = fromJS([values]);
      return updatedValues;
    }
  }
);

// While creating a reasonListItem, user should have an option to select one of the exisiting categories:
export const selectExistingCategories = createSelector(
  currentFormReasons,
  reasons =>
    reasons &&
    reasons.reduce((hierarchyNames, currentReason) => {
      // when creating new reason list = currentReason.get('hierarchy')[0]
      let currHierarchy = currentReason.get('hierarchy')[0]
        ? currentReason.get('hierarchy')[0]
        : currentReason.get('hierarchy').toJS()[0];
      const categoryExists = hierarchyNames.find(hierarchy => {
        return hierarchy === currHierarchy;
      });
      if (!categoryExists) {
        if (currentReason.get('hierarchy').size !== 0) {
          hierarchyNames.push(currHierarchy);
        }
        return hierarchyNames;
      }
      return hierarchyNames;
    }, [])
);

const currentSharedValue = state => getCurrentFormValueByFieldName(state, 'shared') || false;

export const selectActiveReasonDropDownData = createSelector(
  [getAllReasons, currentFormReasons, currentSharedValue],
  (reasons, formReasons, isShared) =>
    reasons
      .filter(reason => {
        // If Reason List is shared, then just shared reasons
        // can only be added to nested list component.
        if (isShared) {
          return reason.active === true && reason.shared;
        }
        return reason.active === true;
      })
      .map(activeReason => {
        return { label: activeReason.name, value: activeReason.id };
      })
      .filter(reason => {
        let formReasonsJS = formReasons
          ? formReasons.toJS().map(reason => {
              return reason;
            })
          : [];
        return !formReasonsJS.map(currReason => currReason.name).includes(reason.label);
      })
);
