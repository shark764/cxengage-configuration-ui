/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectHistoricalReportFolders } from '../selectors';

const initialState = fromJS({
  Entities: {
    historicalReportFolders: {
      data: ['Folder Mock 1', 'Folder Mock 2', 'Folder Mock 3', null],
    },
  },
});

describe('selectHistoricalReportFolders', () => {
  it('should get historicalReportFolders, then return it mapped to label and value', () => {
    expect(selectHistoricalReportFolders(initialState)).toEqual([
      'Folder Mock 1',
      'Folder Mock 2',
      'Folder Mock 3',
    ]);
  });
  it('returns empty array when no data is available', () => {
    const initialStateNoData = fromJS({
      Entities: {
        historicalReportFolders: {
          data: undefined,
        },
      },
    });
    expect(selectHistoricalReportFolders(initialStateNoData)).toEqual([]);
  });
});
