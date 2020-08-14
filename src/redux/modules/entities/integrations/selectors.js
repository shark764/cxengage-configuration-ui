/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { getSelectedEntity, getSelectedSubEntityId } from '../selectors';
import { selectFormInitialValues } from '../../form/selectors';
import { onIntegrationListenerFormSubmit } from '../';

export const getIntegrations = state => state.getIn(['Entities', 'integrations', 'data']);

export const selectIntegrations = createSelector(getIntegrations, integrations => {
  return integrations !== undefined
    ? integrations.toJS().map(integration => ({
        value: integration.type,
        label: integration.type
      }))
    : undefined;
});

export const selectIntegrationsFormInitialValues = state => {
  if (getSelectedEntity(state) === undefined) {
    return new Map({ active: true, type: 'rest', authType: 'noAuth' });
  }
  const initialValues = selectFormInitialValues(state);

  //
  // THIS SHOULD BE DONE IN THE REDUCER OR FROM SDK
  //
  if (initialValues && initialValues.get('type') === 'monet') {
    return initialValues.setIn(
      ['properties', 'usernameAsAgentId'],
      initialValues.getIn(['properties', 'usernameAsAgentId']) === 'true'
    );
  }
  if (initialValues && initialValues.get('type') === 'rest') {
    const properties = initialValues.get('properties');
    if (properties && properties.get('token') === '') {
      if (properties.get('username') === '') {
        return initialValues.set('authType', 'noAuth');
      } else {
        return initialValues.set('authType', 'basic');
      }
    } else {
      return initialValues.set('authType', 'token');
    }
  }

  return initialValues;
};

export const getTwilioRegions = () => [
  { awsId: 'default', twilioId: 'default', display: 'Use Tenant Default' },
  { awsId: null, twilioId: 'gll', display: 'Global Low Latency' },
  { awsId: 'ap-southeast-2', twilioId: 'au1', display: 'Australia' },
  { awsId: 'sa-east-1', twilioId: 'br1', display: 'Brazil' },
  { awsId: 'us-west-1', twilioId: 'ie1', display: 'Ireland' },
  { awsId: 'ap-northeast-1', twilioId: 'jp1', display: 'Japan' },
  { awsId: 'ap-southeast-1', twilioId: 'sg1', display: 'Singapore' },
  { awsId: 'us-east-1', twilioId: 'us1', display: 'US East Coast (Virginia)' },
  { awsId: null, twilioId: 'us1-tnx', display: 'Virginia Interconnect' },
  { awsId: null, twilioId: 'us2-tnx', display: 'Oregon Interconnect' },
  { awsId: 'eu-central-1', twilioId: 'de1', display: 'Germany' },
  { awsId: 'eu-west-1', twilioId: 'ie1-tnx', display: 'Ireland Interconnect' }
];

export const selectTwilioRegions = state =>
  getTwilioRegions()
    .map(region => ({ value: region.twilioId, label: region.display }))
    .filter(region => region.value !== 'default');

export const selectIntegrationListeners = state =>
  getSelectedEntity(state) && getSelectedEntity(state).get('listeners')
    ? getSelectedEntity(state)
        .get('listeners')
        .toJS()
    : [];

export const subEntityFormSubmission = (values, dispatch, props) =>
  dispatch(onIntegrationListenerFormSubmit(values, props));

export const selectIntegrationListenerFormInitialValues = state => {
  const selectedSubEntityId = getSelectedSubEntityId(state);

  return selectedSubEntityId === 'listeners'
    ? new Map({ name: '', active: false })
    : getSelectedEntity(state).get('listeners') &&
        getSelectedEntity(state)
          .get('listeners')
          .find(listener => listener.get('id') === selectedSubEntityId);
};

export const isIntegrationsFetched = state => state.getIn(['Entities', 'integrations', 'data']).size === 0;
