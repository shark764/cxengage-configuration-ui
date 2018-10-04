import { getHelpLink, getTableColumns } from '../config';

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
  it('returns correct columns for outbound identifier list', () => {
    expect(getTableColumns('outboundIdentifierLists')).toMatchSnapshot();
  });
  it('returns correct columns for custom metrics', () => {
    expect(getTableColumns('customMetrics')).toMatchSnapshot();
  });
  it('returns correct columns for chat widgets', () => {
    expect(getTableColumns('chatWidgets')).toMatchSnapshot();
  });
  it('returns empty array by default', () => {
    expect(getTableColumns()).toEqual([]);
  });
});
