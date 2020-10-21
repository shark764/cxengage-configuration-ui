/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { getSelectedEntity, getSelectedSubEntityId } from '../selectors';
import { selectFormInitialValues, getCurrentFormValueByFieldName } from '../../form/selectors';
import { onIntegrationListenerFormSubmit, onFormSubmit } from '../';
import { renameObjectKey } from '../../../../utils';

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
  { awsId: 'eu-central-1', twilioId: 'de1', display: 'Germany' },
  { awsId: 'us-west-1', twilioId: 'ie1', display: 'Ireland' },
  { awsId: 'ap-northeast-1', twilioId: 'jp1', display: 'Japan' },
  { awsId: 'ap-southeast-1', twilioId: 'sg1', display: 'Singapore' },
  { awsId: 'us-east-1', twilioId: 'us1', display: 'US East Coast (Virginia)' },
  { awsId: null, twilioId: 'au1-ix', display: 'Interconnect - Australia (Sydney)' },
  { awsId: null, twilioId: 'de1-ix', display: 'Interconnect - Germany (Frankfurt)' },
  { awsId: 'eu-west-1', twilioId: 'ie1-tnx', display: 'Interconnect - Ireland' },
  { awsId: null, twilioId: 'jp1-ix', display: 'Interconnect - Japan (Tokyo)' },
  { awsId: null, twilioId: 'sg1-ix', display: 'Interconnect - Singapore' },
  { awsId: null, twilioId: 'us1-ix', display: 'Interconnect - US East Coast (Virginia)' },
  { awsId: null, twilioId: 'us2-ix', display: 'Interconnect - US West Coast (Oregon)' },
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

export const subEntityFormSubmission = (values, dispatch, props) => {
  const { integrationType, initialValues } = props;
  if (integrationType === 'twilio') {
    const initialKey = initialValues.get('key');
    const initialValue = initialValues.get('value');
    const key = values.get('key');
    const value = values.get('value');
    const twilioFormValues = initialValues.get('initialTwilioFormValues');
    const existingGlobalDialParams =
      (initialValues.get('globalParamsProperties') && initialValues.get('globalParamsProperties').toJS()) || {};
    let newGlobalDialParam = {};
    let newState;
    if (twilioFormValues && existingGlobalDialParams && (!initialKey && !initialValue)) {
      // create global param property
      newGlobalDialParam[key] = value;
      newState = twilioFormValues.setIn(['properties', 'globalDialParams'], {
        ...existingGlobalDialParams,
        ...newGlobalDialParam
      });
    } else {
      // update global param property
      if (existingGlobalDialParams.hasOwnProperty(initialKey)) {
        existingGlobalDialParams[initialKey] = value;
        const updatedObject = renameObjectKey(existingGlobalDialParams, initialKey, key);
        newState = twilioFormValues.setIn(['properties', 'globalDialParams'], updatedObject);
      }
    }
    // Since twilio Global Params does not have an endpoint to create and update, we handle the whole integration request here
    // So we dispatch onFormSubmit instaed of onIntegrationListenerFormSubmit to update the whole integration
    return dispatch(onFormSubmit(newState, props));
  } else if (integrationType === 'salesforce') {
    let newState, omniChannelPropertiesRequest;
    if (values.get('listenerType') === 'omnichannel') {
      // filters out email to case properties
      const { properties: { topic, type, ...omniChannelProperties } } = values.toJS();
      omniChannelProperties.routingTopics[0].channelType = 'work-item';
      omniChannelPropertiesRequest = Object.assign({}, omniChannelProperties);
      newState = values.set('properties', omniChannelPropertiesRequest);
    } else {
      // filters out omnichannel properties
      const { properties: { routingTopics, agentWorkTopic, ...emailToCaseProperties } } = values.toJS();
      newState = values.set('properties', emailToCaseProperties).delete('listenerType');
    }
    return dispatch(onIntegrationListenerFormSubmit(newState, props));
  } else {
    return dispatch(onIntegrationListenerFormSubmit(values, props));
  }
};

export const selectIntegrationListenerFormInitialValues = state => {
  const selectedSubEntityId = getSelectedSubEntityId(state);
  const integrationType = getCurrentFormValueByFieldName(state, 'type');
  if (integrationType === 'twilio') {
    const globalDialParamFound = selectTwilioGlobalDialParams(state).find(
      globalDialParam => globalDialParam.key === selectedSubEntityId
    );
    return new Map({
      initialTwilioFormValues: getSelectedEntity(state),
      key: selectedSubEntityId === 'twilioGlobalDialParams' ? '' : globalDialParamFound.key,
      value: selectedSubEntityId === 'twilioGlobalDialParams' ? '' : globalDialParamFound.value,
      globalParamsProperties:
        getSelectedEntity(state).get('properties') &&
        getSelectedEntity(state).getIn(['properties', 'globalDialParams']) &&
        getSelectedEntity(state).getIn(['properties', 'globalDialParams'])
    });
  } else {
    return selectedSubEntityId === 'listeners'
      ? new Map({
          name: '',
          active: false,
          ...(integrationType === 'salesforce' && {
            properties: new Map({
              type: 'Case'
            })
          })
        })
      : getSelectedEntity(state).get('listeners') &&
          getSelectedEntity(state)
            .get('listeners')
            .find(listener => listener.get('id') === selectedSubEntityId);
  }
};

export const selectTwilioGlobalDialParams = state => {
  const twilioGlobalDialParams =
    getSelectedEntity(state) && getSelectedEntity(state).getIn(['properties', 'globalDialParams'])
      ? getSelectedEntity(state)
          .getIn(['properties', 'globalDialParams'])
          .toJS()
      : [];
  return Object.entries(twilioGlobalDialParams).map(([key, value]) => ({ key, value }));
};

export const isIntegrationsFetched = state => state.getIn(['Entities', 'integrations', 'data']).size === 0;

export const isTwilioWebRtcEnabled = createSelector(
  [getIntegrations],
  integrations =>
    integrations && integrations.size > 0
      ? integrations.find(
          integration =>
            integration.get('type') === 'twilio' &&
            integration.get('active') &&
            integration.getIn(['properties', 'webRtc'])
        ) !== undefined
      : undefined
);
