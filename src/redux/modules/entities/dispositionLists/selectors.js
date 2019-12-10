/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import {
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

export const getInitialDisposition = (state, listName) => {
  if (getAllEntitiesFromStore(state) && getSelectedEntityId(state) !== 'create') {
    let dispositionLists = getAllEntitiesFromStore(state).toJS();
    let index = dispositionLists.findIndex(x => x.name === listName);
    let dispositions = dispositionLists[index].dispositions;
    return dispositions;
  }
  return [];
};

export const getAllDispositions = state => {
  if (getEntityData(state, 'dispositions')) {
    let dispositions = getEntityData(state, 'dispositions').toJS();
    return dispositions;
  }
  return [];
};

export const dispositionListsInitialValues = state => {
  if (getSelectedEntityId(state) !== 'create') {
    return Map({
      name: getSelectedEntity(state).get('name'),
      description: getSelectedEntity(state).get('description'),
      shared: getSelectedEntity(state).get('shared')
    });
  } else {
    return Map({ active: true, shared: false });
  }
};

export const currentFormDispositions = state => getCurrentFormValueByFieldName(state, 'dispositions');

// // Groups dispositionListItems based on the category they belong to:
export const selectDispositionsHeaders = createSelector(currentFormDispositions, dispositions => {
  if (dispositions && dispositions.size > 0) {
    // Finds the first dispositionListItem in each category, so that rest of the items can be grouped under them:
    return dispositions.reduce((accumlator, currentVal) => {
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
            droppableUUID: currentVal.get('droppableUUID'),
            draggableUUID: currentVal.get('draggableUUID'),
            endpointUUID: currentVal.get('endpointUUID')
          })
        );
      }
      return accumlator;
    }, List());
  }
});

export const isUserCreatingNewCategory = state =>
  getCurrentSubFormValueByFieldName(state, `dispositionListItems:${getSelectedSubEntityId(state)}`, 'newCategory');

export const hierarchyInputText = state =>
  getCurrentSubFormValueByFieldName(state, `dispositionListItems:${getSelectedSubEntityId(state)}`, 'hierarchy');

export const getCurrentDispositionList = state => {
  return getInitialDisposition(state, getCurrentFormValueByFieldName(state, 'name'));
};

// While updating a dispositionListItem, the subEntityForm should be pre-populated with it's field values:
export const getSelectedDispositionListItemValues = createSelector(
  [currentFormDispositions, getSelectedSubEntityId],
  (dispositions, subEntityId) => {
    // while updating cateoryheader, just return hierarchy title:
    if (subEntityId.includes('updateCategoryHeader')) {
      const a = dispositions.find(
        disposition => `updateCategoryHeader:${disposition.get('categoryUUID')}` === subEntityId
      );
      return Map({ hierarchy: a.toJS().hierarchy[0] });
    }
  }
);

// When creating a new dispositionList, dispositionListItems should contain UUID's for the drag and drop component to work or else the UI breaks:
export const selectDispositionUUIDS = createSelector(
  [getCurrentSubmittingFormValues, getAllDispositions, getCurrentDispositionList],
  (values, dispositions, current) => {
    let disposition = dispositions.filter(disposition => disposition.id === values.get('disposition'));
    return fromJS(disposition[0])
      .set('hierarchy', [values.get('hierarchy')])
      .set('sortOrder', current.length)
      .set('dispositionId', disposition[0].id)
      .set('draggableUUID', generateUUID())
      .set('categoryUUID', generateUUID())
      .set('droppableUUID', generateUUID())
      .set('endpointUUID', generateUUID())
      .delete('newCategory');
  }
);

// DispositionList Item update Selector:
export const dispositionListItemUpdateValues = createSelector(
  [getSelectedSubEntityId, currentFormDispositions, getCurrentSubmittingFormProps],
  (selectedSubEntityId, existingDispositions, props) => {
    // updates hierarchy title:
    if (selectedSubEntityId.includes('updateCategoryHeader')) {
      const updatedDispositions = existingDispositions.map(disposition => {
        let hierarchy = disposition.get('hierarchy')[0]
          ? disposition.get('hierarchy')[0]
          : disposition.get('hierarchy').toJS()[0];
        return hierarchy === props.initialValues.get('hierarchy')
          ? disposition.set('hierarchy', [props.values.get('hierarchy')])
          : disposition;
      });
      return updatedDispositions;
    }
  }
);

// Adds dispositionListItems to the current form values based on the hierarchy:
export const dispositionListItemCreateValues = createSelector(
  [selectDispositionUUIDS, currentFormDispositions],
  (values, existingDispositions) => {
    if (existingDispositions !== undefined) {
      let currHierarchy = existingDispositions.find(
        disposition =>
          disposition.get('hierarchy')[0] ? disposition.get('hierarchy')[0] : disposition.get('hierarchy').toJS()[0]
      );
      const hierarchyExists = currHierarchy === values.get('hierarchy')[0];

      if (!hierarchyExists) {
        // If a dispositionListItem is being created under new hierarchy:
        const updatedValues = existingDispositions.push(values);

        return updatedValues;
      } else {
        // If a dispositionListItem is being created under an existing hierarchy:
        const updatedValues = existingDispositions.push(
          values
            .set('categoryUUID', hierarchyExists.get('categoryUUID'))
            .set('droppableUUID', hierarchyExists.get('droppableUUID'))
        );
        return updatedValues;
      }
    } else {
      // If there are no existing dispositionListItems in the dispositionList:
      const updatedValues = fromJS([values]);

      return updatedValues;
    }
  }
);

// While creating a dispositionListItem, user should have an option to select one of the exisiting categories:
export const selectExistingCategories = createSelector(
  currentFormDispositions,
  dispositions =>
    dispositions &&
    dispositions.reduce((hierarchyNames, currentDisposition) => {
      // when creating new disposition list = currentDisposition.get('hierarchy')[0]
      let currHierarchy = currentDisposition.get('hierarchy')[0]
        ? currentDisposition.get('hierarchy')[0]
        : currentDisposition.get('hierarchy').toJS()[0];
      const categoryExists = hierarchyNames.find(hierarchy => {
        return hierarchy === currHierarchy;
      });
      if (!categoryExists) {
        if (currentDisposition.get('hierarchy').size !== 0) {
          hierarchyNames.push(currHierarchy);
        }
        return hierarchyNames;
      }
      return hierarchyNames;
    }, [])
);

const currentSharedValue = state => getCurrentFormValueByFieldName(state, 'shared') || false;

export const selectActiveDispositionDropDownData = createSelector(
  [getAllDispositions, currentFormDispositions, currentSharedValue],
  (dispositions, formDispositions, isShared) =>
    dispositions
      .filter(disposition => {
        // If Disposition List is shared, then just shared dispositions
        // can only be added to nested list component.
        if (isShared) {
          return disposition.active === true && disposition.shared;
        }
        return disposition.active === true;
      })
      .map(activeDisposition => {
        return { label: activeDisposition.name, value: activeDisposition.id };
      })
      .filter(disposition => {
        let formDispositionsJS = formDispositions
          ? formDispositions.toJS().map(disposition => {
              return disposition;
            })
          : [];
        return !formDispositionsJS.map(currDisposition => currDisposition.name).includes(disposition.label);
      })
);
