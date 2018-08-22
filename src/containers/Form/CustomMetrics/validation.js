/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty, isNumber } from '../../../utils/string';

export const formValidation = values => ({
  customMetricsName: isEmpty(values.get('customMetricsName')) && 'Please enter a name',
  customMetricsType: !values.get('customMetricsType') && 'Please select a metric type',
  slaAbandonType: !values.get('slaAbandonType') && 'Please select an abandon type',
  slaThreshold: (isEmpty(values.get('slaThreshold'))
      || !isNumber(values.get('slaThreshold')))
      && 'SLA Threshold must be a number',
  slaAbandonThreshold: (isEmpty(values.get('slaAbandonThreshold'))
      || !isNumber(values.get('slaAbandonThreshold')))
      && 'SLA Abandon Threshold must be a number',
});