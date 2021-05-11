/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

const appSecretValidation = (appSecret, facebookUserAccessToken, props) => {
  if (isEmpty(appSecret)) {
    if (!props.initialValues) {
      return 'Please enter your facebook app secret';
    } else if (!isEmpty(facebookUserAccessToken)) {
      return 'The App Secret is required to update the User Access Token';
    }
  }
  return false;
};

const accessTokenValidation = (appSecret, facebookUserAccessToken, props) => {
  if (!props.initialValues) {
    if (isEmpty(facebookUserAccessToken)) {
      return 'User Access Token is required to create the integration';
    }
  } else if (!isEmpty(appSecret) && isEmpty(facebookUserAccessToken)) {
    return 'Please provide the User Access Token';
  }
  return false;
};

export const formValidation = (values, props) => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  appId: isEmpty(values.get('appId')) && 'Please enter your app id',
  facebookAppId: isEmpty(values.get('facebookAppId')) && 'Please enter your facebook app id',
  facebookAppSecret: appSecretValidation(
    values.get('facebookAppSecret'),
    values.get('facebookUserAccessToken'),
    props),
  facebookPageId: isEmpty(values.get('facebookPageId')) && 'Please enter your facebook page id',
  facebookUserAccessToken: accessTokenValidation(
    values.get('facebookAppSecret'),
    values.get('facebookUserAccessToken'),
    props),
  clientDisconnectMinutes:
    values.get('clientDisconnectMinutes') !== null &&
    values.get('clientDisconnectMinutes') !== undefined &&
    ((values.get('clientDisconnectMinutes') < 1 && 'Must be greater than or equal to 1') ||
      (values.get('clientDisconnectMinutes') > 1440 && 'Must be less than or equal to 1440')),
});
