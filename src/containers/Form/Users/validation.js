/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { validatePhoneNumber, validateSip } from 'serenova-js-utils/validation';

const validateValue = (value, type) =>
  type === 'pstn' ? Boolean(validatePhoneNumber(value)) : Boolean(validateSip(value));

const isWebRtc = type => type === 'webrtc';

const errorMessage = type => (type === 'pstn' ? 'Valid Phone Number Required' : 'Valid Sip Address Required');

export const formValidation = values => {
  const formValidation = {};
  const newValues = values.toJS();
  const extensions = newValues.extensions.map(
    ext => isWebRtc(ext.type) || validateValue(ext.value, ext.type) || errorMessage(ext.type)
  );
  const labels = newValues.extensions.map(ext => Boolean(ext.description) || 'Label is required');
  if (extensions.some(err => typeof err === 'string')) {
    formValidation.extensions = extensions;
  }
  if (labels.some(err => typeof err === 'string')) {
    formValidation.extensions = labels;
  }
  return formValidation;
};
