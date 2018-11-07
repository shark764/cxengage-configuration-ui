/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { getCurrentForm } from '../../form/selectors';

export const getDataAccessReports = state => {
  return state.getIn(['Entities', 'dataAccessReports'], new Map([]));
};

export const getReportTypeFormValue = state =>
  getCurrentForm(state) &&
  getCurrentForm(state).getIn(['values', 'reportType']);

export const getRealtimeReportTypeFormValue = state =>
  getCurrentForm(state) &&
  getCurrentForm(state).getIn(['values', 'realtimeReportType']);
