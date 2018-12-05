/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { statusColumn } from '../status';

describe('statusColumn', () => {
  it('is configured correctly', () => {
    expect(statusColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('returns "Enabled" when active is true', () => {
      expect(statusColumn.accessor({ active: true })).toEqual('Enabled');
    });
    it('returns "Disabled" when active is false', () => {
      expect(statusColumn.accessor({ active: false })).toEqual('Disabled');
    });
  });
  describe('filterMethod', () => {
    it('returns true when filter is "all"', () => {
      expect(statusColumn.filterMethod({ value: 'all' })).toBe(true);
    });
    it('compares filter id to "Enabled" when filter value is "enabled"', () => {
      expect(statusColumn.filterMethod({ value: 'Enabled', id: 'status' }, { status: 'Enabled' })).toBe(true);
      expect(statusColumn.filterMethod({ value: 'Enabled', id: 'status' }, { status: 'Disabled' })).toBe(false);
    });
    it('compares filter id to "Disabled" when filter value is "disabled"', () => {
      expect(statusColumn.filterMethod({ value: 'Disabled', id: 'status' }, { status: 'Disabled' })).toBe(true);
      expect(statusColumn.filterMethod({ value: 'Disabled', id: 'status' }, { status: 'Enabled' })).toBe(false);
    });
  });
});
