/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity, getSelectedEntityId } from '../selectors';
import { List, Map } from 'immutable';

export const filterReasons = state =>
  getSelectedEntity(state)
    .get('reasons')
    .map(
      reason =>
        new Map({
          reasonId: reason.get('reasonId'),
          sortOrder: reason.get('sortOrder'),
          hierarchy: reason.get('hierarchy')
        })
    );

export const reasonListsInitialValues = state => {
  const initialValues = selectFormInitialValues(state);

  //FIX: this should be something temporary, until we actually do a Presence Reason List component, then there should be no need to initialize the reasons values.
  return getSelectedEntityId(state) !== 'create' && getSelectedEntity(state).get('reasons').size > 0
    ? initialValues.set('reasons', filterReasons(state))
    : initialValues
        .set('reasons', new List([]))
        .set('shared', false)
        .set('isDefault', false);
};

export const checkDisableShared = state => {
  const initialValues = selectFormInitialValues(state);

  return initialValues.get('shared') && initialValues.get('id') !== undefined;
};
