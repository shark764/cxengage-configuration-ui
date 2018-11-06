/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  reportType: !values.get('reportType') && 'Please select a report type',
  realtimeReportType: !values.get('realtimeReportType') && 'Please select a realtime report type',
  realtimeReportName: isEmpty(values.get('realtimeReportName')) && 'Please enter a realtime report name',
  historicalCatalogName: isEmpty(values.get('historicalCatalogName')) && 'Please enter an historical catalog name'
});
