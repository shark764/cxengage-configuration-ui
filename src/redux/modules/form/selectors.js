/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { Map } from 'immutable';
import { isPristine, isInvalid } from 'redux-form/immutable';

import {
  getCurrentEntity,
  getSelectedEntity,
  getSelectedEntityId,
  getSelectedEntityFormId
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

export const isFormPristine = state => isPristine(getSelectedEntityFormId(state))(state);

export const selectFormInitialValues = state => {
  if (getSelectedEntityId(state) === 'bulk') {
    return new Map({});
  } else if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true });
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
