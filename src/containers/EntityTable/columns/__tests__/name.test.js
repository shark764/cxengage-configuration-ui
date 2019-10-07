/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { nameColumn } from '../name';

describe('nameColumn', () => {
  it('is configured correctly', () => {
    expect(nameColumn).toMatchSnapshot();
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(nameColumn.Cell({ value: 'mock name', row: { name: 'mock name' } })).toMatchSnapshot();
    });
  });
});
