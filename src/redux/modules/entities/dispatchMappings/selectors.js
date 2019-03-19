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
    return new Map({ active: true, interactionField: 'customer', channelType: 'any', version: 'null' });
  }
  return !selectFormInitialValues(state).get('version')
    ? selectFormInitialValues(state).set('version', 'null')
    : selectFormInitialValues(state);
};

export const getMappingValueMessage = state =>
  `Enter${
    ['voice', 'sms', 'messaging'].includes(currentChannelType(state)) && currentMappingValue(state) === 'contact-point'
      ? ' an e.164 formatted number or SIP address'
      : currentChannelType(state) === 'email' && currentMappingValue(state) === 'contact-point'
        ? ' an email adress'
        : 'a mapping value'
  }`;
