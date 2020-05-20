/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { Map } from 'immutable';
import { isPristine, isDirty, isInvalid } from 'redux-form/immutable';

import {
  getCurrentEntity,
  getSelectedEntity,
  getSelectedEntityId,
  getSelectedEntityFormId,
  getSelectedSubEntityFormsIds
} from '../entities/selectors';
import { onFormSubmit, onSubEntityFormSubmit } from '../entities';

import { entitiesMetaData } from '../entities/metaData';

export const getCurrentForm = state =>
  state.getIn(['form', `${getCurrentEntity(state)}:${getSelectedEntityId(state)}`]);

export const getCurrentFormInitialValues = state =>
  getCurrentForm(state)
    .get('initial')
    .toJS();

export const isFormInvalid = state => isInvalid(getSelectedEntityFormId(state))(state);
export const isFormDirty = state => isDirty(getSelectedEntityFormId(state))(state);
export const isFormPristine = state => isPristine(getSelectedEntityFormId(state))(state);
export const areSubEntityFormsDirty = state =>
  getSelectedSubEntityFormsIds(state) &&
  getSelectedSubEntityFormsIds(state)
    .map(formName => isDirty(formName)(state))
    .some(isDirty => isDirty);

export const selectFormInitialValues = state => {
  const entityName = getCurrentEntity(state);
  if (getSelectedEntityId(state) === 'bulk') {
    return new Map({});
  } else if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true });
  } else if (entityName === 'users') {
    const initValues = getSelectedEntity(state);
    if (initValues.has('effectiveCapacityRule') && initValues.get('effectiveCapacityRule') !== null) {
      return initValues
        .delete('active')
        .set('effectiveCapacityRule', initValues.getIn(['effectiveCapacityRule', 'id']))
        .toJS();
    }
    return initValues.delete('active').toJS();
  } else {
    // Members and active are not handled in the same Update
    // as the rest of values, so not need to be set in form
    return getSelectedEntity(state)
      .delete('active')
      .delete(entitiesMetaData[getCurrentEntity(state)].dependentEntity);
  }
};

export const formSubmission = (values, dispatch, props) => dispatch(onFormSubmit(values, props));

export const subEntityFormSubmission = (values, dispatch, props) => dispatch(onSubEntityFormSubmit(values, props));

export const createFormName = state => ({
  form: `${getCurrentEntity(state)}:${getSelectedEntityId(state)}`
});

export const getCurrentFormValueByFieldName = (state, fieldName) =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', fieldName]);

export const getCurrentSubForm = (state, formId) => state.getIn(['form', formId]);

export const getCurrentSubFormValueByFieldName = (state, formId, fieldName) =>
  getCurrentSubForm(state, formId) && getCurrentSubForm(state, formId).getIn(['values', fieldName]);

export const getCurrentSubmittingFormProps = (state, props) => props;

export const getCurrentSubmittingFormValues = (state, props) =>
  props.values.map(value => {
    if (typeof value === 'string') {
      return value.trim();
    } else {
      return value;
    }
  });
