/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { List } from 'immutable';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';

export const getMedias = (state) => state.getIn(['Entities', 'media', 'data']);

export const selectMediaFormInitialValues = (state) => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({});
  }
  const initialValues = selectFormInitialValues(state);
  return initialValues.set('description', initialValues.get('description') || '').toJS();
};

export const selectMedias = createSelector(getMedias, (medias) => {
  return medias
    ? medias.filter((media) => media.get('type') === 'audio' || media.get('type') === 'tts').map((media) => ({
        value: media.get('id'),
        label: media.get('name'),
        type: media.get('type'),
      }))
    : new List([]);
});
