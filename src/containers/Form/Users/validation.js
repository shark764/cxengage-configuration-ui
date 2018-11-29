/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { validatePhoneNumber, validateSip } from 'serenova-js-utils/validation';

const validateValue = (value, type) =>
  type === 'pstn' ? Boolean(validatePhoneNumber(value)) : Boolean(validateSip(value));

const isWebRtc = type => type === 'webrtc';

const errorMessage = type => (type === 'pstn' ? 'Invalid Phone Number' : 'Invalid sip address');

export const formValidation = values => {
  const newValues = values.toJS();
  const extensions = newValues.extensions.map(
    (ext, i) => !ext.value || isWebRtc(ext.type) || validateValue(ext.value, ext.type) || errorMessage(ext.type)
  );
  if (extensions.some(err => typeof err === 'string')) {
    return {
      extensions
    };
  } else {
    return {};
  }
};
