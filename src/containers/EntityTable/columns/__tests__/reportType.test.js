/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { reportTypeColumn } from '../reportType';

describe('reportTypeColumn', () => {
  it('is configured correctly', () => {
    expect(reportTypeColumn).toMatchSnapshot();
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(
        reportTypeColumn.Cell({ value: 'mock report type', row: { reportType: 'mock report type' } })
      ).toMatchSnapshot();
    });
  });
});
