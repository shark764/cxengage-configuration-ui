/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectFormInitialValues } from '../../../form/selectors';
import { getSelectedEntity } from '../../selectors';
import { selectMediaFormInitialValues, selectMedias } from '../selectors';

jest.mock('../../selectors');
jest.mock('../../../form/selectors');

describe('selectMediaFormInitialValues', () => {
  it('Initial values when creating a new media', () => {
    expect(selectMediaFormInitialValues(fromJS([]))).toMatchSnapshot();
  });
  it('Gets the correct media', () => {
    const initialState = fromJS({
      id: 'mediaMockId_1',
      name: 'Flow Mock 1',
      description: '',
    });
    getSelectedEntity.mockImplementation(() => initialState);
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectMediaFormInitialValues()).toMatchSnapshot();
  });
});

describe('selectMedias', () => {
  it('should get medias and filter out medias of type list', () => {
    const initialStateWithData = fromJS({
      Entities: {
        media: {
          data: [
            {
              id: 'mediaMockId_1',
              name: 'Flow Mock 1',
              type: 'tts',
            },
            {
              id: 'mediaMockId_2',
              name: 'Flow Mock 2',
              type: 'audio',
            },
            {
              id: 'mediaMockId_3',
              name: 'Flow Mock 3',
              type: 'list',
            },
            {
              id: 'mediaMockId_4',
              name: 'Flow MOCK 4',
              type: 'audio',
            },
          ],
        },
      },
    });
    expect(selectMedias(initialStateWithData)).toMatchSnapshot();
  });

  it('returns undefined when no data is available', () => {
    const initialStateNoData = fromJS({
      Entities: {
        flows: {
          data: undefined,
        },
      },
    });
    expect(selectMedias(initialStateNoData)).toMatchSnapshot();
  });
});
