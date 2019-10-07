/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { listTypeColumn } from '../listType';

describe('listTypeColumn', () => {
  it('is configured correctly', () => {
    expect(listTypeColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('accesses correctly', () => {
      expect(listTypeColumn.accessor({ listType: { name: 'mock list type name' } })).toEqual('mock list type name');
    });
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(listTypeColumn.Cell({ value: 'mock list type', row: { listType: 'mock list type' } })).toMatchSnapshot();
    });
  });
});
