/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getCurrentEntity, getSelectedEntity } from '../selectors';
import { listMemberIds } from '../listItemSelectors';
import { EntityMetaData, entitiesMetaData } from '../metaData';

entitiesMetaData.mockEntity = new EntityMetaData('mockEntity');

const initialState = fromJS({
  Entities: {
    mockEntity: {
      data: [
        {
          id: '0000',
          name: 'mockName',
          active: true,
          mockDependentEntity: [
            {
              id: '0001',
              name: 'mockName',
              active: true
            }
          ]
        }
      ]
    },
    mockDependentEntity: {
      data: [
        {
          id: '0001',
          name: 'mockName',
          active: true
        }
      ]
    }
  }
});

const mockSelectedEntity = fromJS({
  id: '0000',
  name: 'mockName',
  active: true,
  mockDependentEntity: [
    {
      id: '0001',
      name: 'mockName',
      active: true
    }
  ]
});

jest.mock('../selectors');
getCurrentEntity.mockImplementation(() => 'mockEntity');
getSelectedEntity.mockImplementation(() => mockSelectedEntity);

describe('listMemberIds', () => {
  it('should get dependentEntity, then return it as javascript collection', () => {
    expect(listMemberIds(initialState)).toEqual([]);
  });
});
