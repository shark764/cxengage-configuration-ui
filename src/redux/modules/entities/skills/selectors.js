/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { getCurrentForm } from '../../form/selectors';

export const getHasProficiencyFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'hasProficiency']);
