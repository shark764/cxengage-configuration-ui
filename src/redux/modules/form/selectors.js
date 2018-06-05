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

export const getCurrentForm = state =>
  state.getIn([
    'form',
    `${getCurrentEntity(state)}:${getSelectedEntityId(state)}`
  ]);

export const getCurrentFormInitialValues = state =>
  getCurrentForm(state)
    .get('initial')
    .toJS();

export const isFormInvalid = state =>
  isInvalid(getSelectedEntityFormId(state))(state);

export const isFormPristine = state =>
  isPristine(getSelectedEntityFormId(state))(state);

export const selectFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true });
  } else {
    return getSelectedEntity(state);
  }
};
