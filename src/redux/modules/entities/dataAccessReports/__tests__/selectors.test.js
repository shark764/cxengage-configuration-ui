/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getReportTypeFormValue, getRealtimeReportTypeFormValue } from '../selectors';

const mockCurrentForm = fromJS({
  values: {
    reportType: 'mock reportType value',
    realtimeReportType: 'mock realtime reportType value'
  }
});
jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm
}));

describe('getReportTypeFormValue', () => {
  it("returns the current form's reportType value", () => {
    expect(getReportTypeFormValue()).toEqual('mock reportType value');
  });
});

describe('getRealtimeReportTypeFormValue', () => {
  it("returns the current form's realtime reportType value", () => {
    expect(getRealtimeReportTypeFormValue()).toEqual('mock realtime reportType value');
  });
});
