/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import { selectFormInitialValues, getCurrentFormValueByFieldName } from '../../form/selectors';
import { getSelectedEntity } from '../selectors';
import { Map } from 'immutable';

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
    ['voice', 'sms', 'messaging'].includes(getCurrentFormValueByFieldName(state, 'channelType')) &&
    getCurrentFormValueByFieldName(state, 'interactionField') === 'contact-point'
      ? ' an e.164 formatted number or SIP address'
      : getCurrentFormValueByFieldName(state, 'channelType') === 'email' &&
        getCurrentFormValueByFieldName(state, 'interactionField') === 'contact-point'
        ? ' an email adress'
        : 'a mapping value'
  }`;
