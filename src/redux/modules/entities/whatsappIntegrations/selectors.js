/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { List } from 'immutable';
import { createSelector } from 'reselect';

const getWhatsappIntegrations = (state) => state.getIn(['Entities', 'whatsappIntegrations', 'data'], new List([]));

const getWhatsappApps = (state) => state.getIn(['Entities', 'whatsappApps', 'data'], new List([]));

export const selectWhatsappApps = createSelector(
  [getWhatsappApps, getWhatsappIntegrations],
  (whatsappApps, whatsappIntegrations) =>
    whatsappApps
      .filter(
        (whatsappApp) =>
          whatsappIntegrations.filter(
            (whatsappIntegration) => whatsappIntegration.get('appId') === whatsappApp.get('appId')
          ).size === 0
      )
      .map((whatsappApp) => ({
        value: whatsappApp.get('id'),
        label: `${whatsappApp.get('phoneNumber')} - ${whatsappApp.get('displayName')}`,
      }))
);
