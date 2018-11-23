/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  let validation = {};
  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.reportType = !values.get('reportType') && 'Please select a report type';
  validation.realtimeReportType = !values.get('realtimeReportType') && 'Please select a realtime report type';
  validation.realtimeReportName = isEmpty(values.get('realtimeReportName')) && 'Please enter a realtime report name';
  validation.historicalCatalogName =
    isEmpty(values.get('historicalCatalogName')) && 'Please enter an historical catalog name';

  const { dashboards, folders, standardDashboards } = props;

  if (values.get('reportType') === 'realtime') {
    if (values.get('realtimeReportType') === 'standard') {
      validation.realtimeReportName =
        !standardDashboards.includes(values.get('realtimeReportName')) && 'Please enter a valid realtime report name';
    } else {
      validation.realtimeReportName =
        !dashboards.includes(values.get('realtimeReportName')) && 'Please enter a valid realtime report name';
    }
  }

  if (values.get('reportType') === 'historical') {
    validation.historicalCatalogName =
      !folders.includes(values.get('historicalCatalogName')) && 'Please enter a valid historical catalog name';
  }

  return validation;
};
