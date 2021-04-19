/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  let validation = {};
  const integrationType = values.get('type');
  const properties = values.get('properties');
  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.type = !values.get('type') && 'Please select a type';

  if (properties) {
    if (integrationType === 'rest' || integrationType === 'zendesk') {
      /**
       * endpointPrefix allows empty string for REST integrations,
       * https://lifesize.atlassian.net/browse/CXV1-23989
       */
      validation.properties = {
        endpointPrefix:
          integrationType !== 'rest' && isEmpty(properties.get('endpointPrefix')) && 'Please enter an API URI',
        username: isEmpty(properties.get('username')) && 'Please enter a Username',
        password: isEmpty(properties.get('password')) && 'Please enter a Password',
        token: isEmpty(properties.get('token')) && 'Please enter a Token',
      };
    }

    if (integrationType === 'monet') {
      const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      validation.properties = {
        monetUrl: !pattern.test(properties.get('monetUrl')) && 'Please enter a valid URL',
        username: isEmpty(properties.get('username')) && 'Please enter a Username',
        password: isEmpty(properties.get('password')) && 'Please enter a Password',
      };
    }

    if (integrationType === 'email') {
      validation.properties = {
        incomingType: isEmpty(properties.get('incomingType')) && 'Please enter an Incoming Protocol',
        imapServer: isEmpty(properties.get('imapServer')) && 'Please enter an Incoming IMAP Host',
        smtpHost: isEmpty(properties.get('smtpHost')) && 'Please enter a SMTP Host',
        smtpPort: isEmpty(properties.get('smtpPort')) && 'Please enter a SMTP Port',
        smtpEncryptionType: isEmpty(properties.get('smtpEncryptionType')) && 'Please select an SMTP Encryption',
        smtpUser: isEmpty(properties.get('smtpUser')) && 'Please enter a SMTP User',
        smtpPassword: isEmpty(properties.get('smtpPassword')) && 'Please enter a SMTP Password',
      };
    }

    if (integrationType === 'salesforce') {
      validation.properties = {
        username: isEmpty(properties.get('username')) && 'Please enter a Username',
        password: isEmpty(properties.get('password')) && 'Please enter a Password',
        consumerKey: isEmpty(properties.get('consumerKey')) && 'Please enter a Consumer Key',
        consumerSecret: isEmpty(properties.get('consumerSecret')) && 'Please enter a Consumer Secret',
        securityToken: isEmpty(properties.get('securityToken')) && 'Please select a Security Token',
      };
    }

    if (integrationType === 'twilio') {
      const extensionPrefixPattern = /^[\d]{5}?$/;
      validation.properties = {
        accountSid: isEmpty(properties.get('accountSid')) && 'Please enter a valid URL',
        authToken: isEmpty(properties.get('authToken')) && 'Please enter an AuthToken',
        region: isEmpty(properties.get('region')) && 'Please select a Region',
        extensionPrefix:
          !isEmpty(properties.get('extensionPrefix')) &&
          !properties.get('extensionPrefix').match(extensionPrefixPattern) &&
          'Extension Prefix should only contain a 5 length numeric value',
      };
    }
  }

  return validation;
};
