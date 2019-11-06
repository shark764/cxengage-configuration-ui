/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { presenceStateColumn } from '../presenceState';

describe('presenceStateColumn', () => {
  it('is configured correctly', () => {
    expect(presenceStateColumn).toMatchSnapshot();
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(presenceStateColumn.Cell({ value: 'offline', row: { state: 'offline' } })).toMatchSnapshot();
    });
    it('renders notready state correctly', () => {
      expect(presenceStateColumn.Cell({ value: 'notready', row: { state: 'notready' } })).toMatchSnapshot();
    });
  });
});
