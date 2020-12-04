/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';
import { validateUrl } from 'serenova-js-utils/validation';

const metadataUrlValidation = (url, props) => {
  if (isEmpty(url)) {
    return props.intl.formatMessage({
      id: 'identityProviders.details.metadataUrl.error',
      defaultMessage: 'Please enter the URL to XML...'
    });
  } else if (!validateUrl(url)) {
    return props.intl.formatMessage({
      id: 'identityProviders.details.validMetadataUrl.error',
      defaultMessage: 'Please enter a valid URL...'
    });
  }
  return false;
};

export const formValidation = (values, props) => ({
  name: isEmpty(values.get('name')) &&
    props.intl.formatMessage({
      id: 'identityProviders.details.name.error',
      defaultMessage: 'Please enter a name...'
    }),
  identityProviderType: isEmpty(values.get('identityProviderType')) &&
    props.intl.formatMessage({
      id: 'identityProviders.details.type.error',
      defaultMessage: 'Please select a type...'
    }),
  emailMapping: isEmpty(values.get('emailMapping')) &&
    props.intl.formatMessage({
      id: 'identityProviders.details.emailMapping.error',
      defaultMessage: 'Please enter an email or "Email" for default...'
    }),
  metadataUrl: metadataUrlValidation(values.get('metadataUrl'), props),
  metadataFile: isEmpty(values.get('metadataFile')) &&
    props.intl.formatMessage({
      id: 'identityProviders.details.enterXml.error',
      defaultMessage: 'Please enter the XML markup...'
    }),
  identityProvider: isEmpty(values.get('identityProvider')) &&
    props.intl.formatMessage({
      id: 'identityProviders.details.sharedAccessCode.error',
      defaultMessage: 'Please enter an access code...'
    }),
});
