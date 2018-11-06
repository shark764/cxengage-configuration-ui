import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      description: 'mockDescription',
      reportType: 'realtime',
      realtimeReportType: 'standard',
      realtimeReportName: 'mockRealtimeReportName',
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object when required fields are provided with historical type', () => {
    const values = new Map({
      name: 'mockName',
      description: 'mockDescription',
      reportType: 'historical',
      historicalCatalogName: 'mockHistoricalCatalogName',
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      description: '',
      reportType: '',
      realtimeReportType: '',
      realtimeReportName: '',
      historicalCatalogName: '',
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      description: undefined,
      reportType: null,
      realtimeReportType: null,
      realtimeReportName: undefined,
      historicalCatalogName: undefined,
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
