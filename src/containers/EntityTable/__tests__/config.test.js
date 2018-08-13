import { getHelpLink, getTableColumns } from '../config';

describe('getHelpLink', () => {
  it('returns correct link for lists', () => {
    expect(getHelpLink('lists')).toMatchSnapshot();
  });
  it('returns correct link for emailTemplates', () => {
    expect(getHelpLink('emailTemplates')).toMatchSnapshot();
  });
  it('returns undefined by default', () => {
    expect(getHelpLink()).toBe(undefined);
  });
});

jest.mock('../columns/description', () => ({
  descriptionColumn: 'mock description column'
}));
jest.mock('../columns/listType', () => ({
  listTypeColumn: 'mock list type column'
}));
jest.mock('../columns/name', () => ({
  nameColumn: 'mock name column'
}));
jest.mock('../columns/status', () => ({
  statusColumn: 'mock status column'
}));
jest.mock('../columns/metricName', () => ({
  metricNameColumn: 'mock Metric Name column'
}));
jest.mock('../columns/metricType', () => ({
  metricTypeColumn: 'mock Metric Type column'
}));

describe('getTableColumns', () => {
  it('returns correct columns for lists', () => {
    expect(getTableColumns('lists')).toMatchSnapshot();
  });
  it('returns correct columns for emailTemplates', () => {
    expect(getTableColumns('emailTemplates')).toMatchSnapshot();
  });
  it('returns correct columns for outbound identifiers', () => {
    expect(getTableColumns('outboundIdentifiers')).toMatchSnapshot();
  });
  it('returns correct columns for Custom Metrics', () => {
    expect(getTableColumns('customMetrics')).toMatchSnapshot();
  });
  it('returns empty array by default', () => {
    expect(getTableColumns()).toEqual([]);
  });
});
