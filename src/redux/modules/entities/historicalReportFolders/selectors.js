/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import { createSelector } from 'reselect';

const getHistoricalReportFolders = state => state.getIn(['Entities', 'historicalReportFolders', 'data']);

export const selectHistoricalReportFolders = createSelector([getHistoricalReportFolders], historicalReportFolders => {
  return historicalReportFolders !== undefined
    ? historicalReportFolders.toJS().filter(folder => folder !== '' && folder !== null)
    : [];
});
