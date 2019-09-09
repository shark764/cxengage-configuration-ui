/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty, isNumber } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  activeVersion: !values.get('activeVersion') && 'Please select an active version to be associated to this Sla.',
  versionName: isEmpty(values.get('versionName')) && 'Please enter a version name',
  abandonType: !values.get('abandonType') && 'Please select an abandon type',
  slaThreshold:
    (isEmpty(values.get('slaThreshold')) || !isNumber(values.get('slaThreshold'))) && 'SLA Threshold must be a number',
  abandonThreshold:
    (isEmpty(values.get('abandonThreshold')) || !isNumber(values.get('abandonThreshold'))) &&
    'SLA Abandon Threshold must be a number'
});