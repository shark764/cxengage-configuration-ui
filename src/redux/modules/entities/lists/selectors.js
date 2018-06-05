/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { getSelectedEntity } from '../selectors';

export const getListTypeName = state =>
  getSelectedEntity(state).getIn(['listType', 'name']);

export const getInitialUpdateFormValues = state =>
  new Map({
    name: getSelectedEntity(state).get('name'),
    shared: getSelectedEntity(state).get('shared')
  });
