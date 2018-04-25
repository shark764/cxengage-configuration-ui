/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { descriptionColumn } from '../description';

describe('descriptionColumn', () => {
  it('is configured correctly', () => {
    expect(descriptionColumn).toMatchSnapshot();
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(
        descriptionColumn.Cell({ row: { description: 'mock description' } })
      ).toMatchSnapshot();
    });
  });
});
