/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { validatePhoneNumber, validateSip } from 'serenova-js-utils/validation';
import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => {
  const formValidation = {};
  const newValues = values.toJS();
  const bypassNamesValidation =
    isEmpty(values.get('firstName')) &&
    isEmpty(values.get('lastName')) &&
    (values.get('invitationStatus') === 'pending' ||
      values.get('invitationStatus') === 'invited' ||
      values.get('invitationStatus') === 'expired');

  const extensionsErrors = newValues.extensions.map(({ description, type, value }) => ({
    ...(isEmpty(description) && {
      label: true,
      message: 'Please provide a description'
    }),
    ...(((type === 'pstn' && !validatePhoneNumber(value)) ||
      ((type === 'sip' && !validateSip(value)) || (type !== 'webrtc' && !value))) && {
      value: true,
      message:
        type !== 'webrtc' && !value
          ? 'Value required'
          : type === 'sip' ? "Extensions must start with 'sip:'." : 'Phone number should be in E.164 format.'
    })
  }));

  if (extensionsErrors.some(({ label, value }) => label || value)) {
    formValidation.extensions = extensionsErrors;
  }

  formValidation.firstName = !bypassNamesValidation && isEmpty(values.get('firstName')) && 'Please enter a first name';
  formValidation.lastName = !bypassNamesValidation && isEmpty(values.get('lastName')) && 'Please enter a last name';
  formValidation.roleId = !values.get('roleId') && 'Please select a Tenant Role';
  return formValidation;
};
