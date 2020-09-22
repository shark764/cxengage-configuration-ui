/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import store from '../../../../redux/store';
import { getSelectedSubEntityId } from '../../../../redux/modules/entities/selectors';
import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  let validation = {};

  // Twilio Global Params Properties
  const key = values.get('key');
  const value = values.get('value');
  const twilioGlobalDialParamsProperties = props.initialValues.get('globalParamsProperties');
  const updatingTwilioGlobalDialParams = getSelectedSubEntityId(store.getState()) !== 'twilioGlobalDialParams';

  // Salesforce Listener Properties
  const topic = values.getIn(['properties', 'topic']);
  const agentWorkTopic = values.getIn(['properties', 'agentWorkTopic']);
  const routingTopics = values.getIn(['properties', 'routingTopics', 0, 'topic']);

  validation.name = isEmpty(values.get('name')) && 'Please enter a listener name';
  validation.value =
    (isEmpty(value) && 'Please enter a value') ||
    (twilioGlobalDialParamsProperties &&
      !updatingTwilioGlobalDialParams &&
      (twilioGlobalDialParamsProperties.has(key) &&
        value !== '' &&
        'You can not overwrite the value of an existing key'));
  validation.key =
    (isEmpty(key) && 'Please enter a key') ||
    (twilioGlobalDialParamsProperties &&
      !updatingTwilioGlobalDialParams &&
      (twilioGlobalDialParamsProperties.has(key) && value === '' && "There's already a key with this name"));

  validation.properties = {
    // Email
    email: isEmpty(values.getIn(['properties', 'email'])) && 'Please enter an email',
    password: isEmpty(values.getIn(['properties', 'password'])) && 'Please enter a password',
    // Facebook
    pageToken: isEmpty(values.getIn(['properties', 'pageToken'])) && 'Please enter a page token',
    pageId: isEmpty(values.getIn(['properties', 'pageId'])) && 'Please enter a page id',
    // Salesforce
    topic: (isEmpty(topic) || !topic) && 'Please enter a topic',
    agentWorkTopic: (isEmpty(agentWorkTopic) || !agentWorkTopic) && 'Please enter an agent work topic',
    routingTopics: [
      {
        topic: (isEmpty(routingTopics) || !routingTopics) && 'Please enter a routing topic'
      }
    ]
  };
  return validation;
};
