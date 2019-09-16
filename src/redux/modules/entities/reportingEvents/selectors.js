import { createSelector } from 'reselect';

export const getReportingEvents = state => {
  return state.getIn(['Entities', 'reportingEvents']);
};

export const getStringifyReportingEvents = createSelector(getReportingEvents, fetchResult =>
  JSON.stringify(fetchResult, null, 2)
);

export const getStringifyReportingEventsRawData = createSelector(getReportingEvents, fetchResult =>
  JSON.stringify(fetchResult)
);
