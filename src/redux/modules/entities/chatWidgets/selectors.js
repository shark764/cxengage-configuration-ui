/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { getSelectedEntity } from '../selectors';
import { selectFormInitialValues, getCurrentFormValueByFieldName } from '../../form/selectors';

export const selectChatWidgetFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({
      brandColor: '#65758e',
      conversationColor: '#0099ff',
      actionColor: '#0099ff',
      displayStyle: 'button',
      buttonWidth: '58',
      buttonHeight: '58',
      prechatCapture: 'name'
    });
  }
  return selectFormInitialValues(state);
};

const getDigitalChannelsApps = state => state.getIn(['Entities', 'digitalChannelsApps', 'data']);

export const getDigitalChannelsAppIds = createSelector(getDigitalChannelsApps, getDigitalChannelsApps => {
  return getDigitalChannelsApps !== undefined
    ? getDigitalChannelsApps
        .map(app => ({
          value: app.get('id'),
          label: app.get('name')
        }))
        .toJS()
    : undefined;
});

export const getDigitalChannelsApp = state => {
  return getSelectedEntity(state)
    && getSelectedEntity(state).get('appId')
    && state.getIn(['Entities', 'digitalChannelsApps', 'data'])
    && state.getIn(['Entities', 'digitalChannelsApps', 'data']).find(app => app.get('id') === getSelectedEntity(state).get('appId'));
};

export const getDisplayStyleIsButton = state =>
  getCurrentFormValueByFieldName(state, 'displayStyle') === 'button';
