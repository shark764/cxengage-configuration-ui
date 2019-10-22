/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { roleNameColumn } from '../roleName';

describe('roleNameColumn', () => {
  it('is configured correctly', () => {
    expect(roleNameColumn).toMatchSnapshot();
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(roleNameColumn.Cell({ value: 'mock role name', row: { roleName: 'mock role name' } })).toMatchSnapshot();
    });
  });
});
