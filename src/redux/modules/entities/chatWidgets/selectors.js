/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { Map, List } from 'immutable';
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

const getChatWidgets = state => state.getIn(['Entities', 'chatWidgets', 'data'], new List([]));
const getDigitalChannelsApps = state => state.getIn(['Entities', 'digitalChannelsApps', 'data'], new List([]));

export const getDigitalChannelsAppIds = createSelector(
  [getDigitalChannelsApps, getChatWidgets],
  (digitalChannelsApps, chatWidgets) =>
    digitalChannelsApps
      .filter(app => chatWidgets.filter(cw => cw.get('appId') === app.get('id')).size === 0)
      .map(app => ({ value: app.get('id'), label: app.get('name') }))
);

export const getDigitalChannelsApp = state => {
  return (
    getSelectedEntity(state) &&
    getSelectedEntity(state).get('appId') &&
    getDigitalChannelsApps(state).find(app => app.get('id') === getSelectedEntity(state).get('appId'))
  );
};

export const getDisplayStyleIsButton = state => getCurrentFormValueByFieldName(state, 'displayStyle') === 'button';
