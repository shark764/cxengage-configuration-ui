/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name...',
  identityProviderType: isEmpty(values.get('identityProviderType')) && 'Please select a type...',
  emailMapping: isEmpty(values.get('emailMapping')) && 'Please enter an email or the word "Email" for default...',
  metadataUrl: isEmpty(values.get('metadataUrl')) && 'Please enter the URL to XML...',
  metadataFile: isEmpty(values.get('metadataFile')) && 'Please enter the XML markup...',
});
