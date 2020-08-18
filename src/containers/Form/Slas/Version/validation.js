/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty, isNumber } from 'serenova-js-utils/strings';

export const formValidation = values => {
  const versionValues = values.get('initialVersion');
  return {
    initialVersion: {
      versionName: isEmpty(versionValues.get('versionName')) && 'Please enter a version name',
      abandonType: !versionValues.get('abandonType') && 'Please select an abandon type',
      slaThreshold:
        (isEmpty(versionValues.get('slaThreshold')) || !isNumber(versionValues.get('slaThreshold'))) &&
        'SLA Threshold must be a number',
      abandonThreshold:
        (isEmpty(versionValues.get('abandonThreshold')) || !isNumber(versionValues.get('abandonThreshold'))) &&
        'SLA Abandon Threshold must be a number'
    }
  };
};
