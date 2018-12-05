/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const getAllPermissions = state => {
  return state.getIn(['Entities', 'permissions', 'data'], new Map([]));
};

export const convertPermissions = createSelector([getAllPermissions], perm => perm.toJS());
