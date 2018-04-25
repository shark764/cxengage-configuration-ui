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

describe('getTableColumns', () => {
  describe('lists', () => {
    it('returns correct columns', () => {
      expect(getTableColumns('lists')).toMatchSnapshot();
    });
  });
  it('returns correct columns for emailTemplates', () => {
    expect(getTableColumns('emailTemplates')).toMatchSnapshot();
  });
  it('returns empty array by default', () => {
    expect(getTableColumns()).toEqual([]);
  });
});
