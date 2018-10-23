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
    // Since active is handled by toggle in header
    // we don't need to add it in form submission
    // if we don't remove active from map, it gets
    // toggled automatically on every submit
    if (getSelectedEntity(state).has('active')) {
      // Returns new Map without "active" key
      return getSelectedEntity(state).delete('active');
    }
    return getSelectedEntity(state);
  }
};

export const formSubmission = (values, dispatch, props) => dispatch(onFormSubmit(values, props));

export const subEntityFormSubmission = (values, dispatch, props) => dispatch(onSubEntityFormSubmit(values, props));

export const createFormName = state => ({ form: `${getCurrentEntity(state)}:${getSelectedEntityId(state)}` });
