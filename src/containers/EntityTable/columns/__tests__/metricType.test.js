/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { metricTypeColumn } from '../metricType';

describe('metricTypeColumn', () => {
  it('is configured correctly', () => {
    expect(metricTypeColumn).toMatchSnapshot();
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(metricTypeColumn.Cell({ row: { metricType: 'mock metric type' } })).toMatchSnapshot();
    });
  });
});
