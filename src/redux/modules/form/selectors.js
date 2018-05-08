/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { isPristine, isInvalid } from 'redux-form/immutable';

import {
  getCurrentEntity,
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
