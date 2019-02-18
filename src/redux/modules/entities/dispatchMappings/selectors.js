/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import { getCurrentForm, selectFormInitialValues } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';
import { Map } from 'immutable';

export const currentMappingValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'interactionField']);

export const currentValue = state => getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'value']);

export const currentChannelType = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'channelType']);

export const getDispatchMappings = state => state.getIn(['Entities', 'dispatchMappings', 'data']);

export const getDispatchMappingValue = state =>
  getDispatchMappings(state).find(
    dispatch =>
      dispatch.get('value') === currentValue(state) && dispatch.get('channelType') === currentChannelType(state)
  );

export const selectDispatchMappingsFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true, interactionField: 'customer' });
  }
  return selectFormInitialValues(state);
};
