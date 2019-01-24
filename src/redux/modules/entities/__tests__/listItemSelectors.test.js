/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';
import { getCurrentEntity, getSelectedEntity, getCurrentEntityStore } from '../selectors';
import {
  listMemberIds,
  listMemberObjects,
  getDependantEntityTableItems,
  getSidePanelTableItems,
  getModalTableItems,
  getListSize,
  availableItemsForList,
  getEntityListMembers,
  selectedEntityIndex,
  availableEntityMembersForList,
  entityRemovedFromList,
  entityAddedToList
} from '../listItemSelectors';
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

const mockCurrentEntityStore = fromJS({
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
  ],
  selectedEntityId: '0000'
});

jest.mock('../selectors');
getCurrentEntity.mockImplementation(() => 'mockEntity');
getSelectedEntity.mockImplementation(() => mockSelectedEntity);
getCurrentEntityStore.mockImplementation(() => mockCurrentEntityStore);

describe('listMemberIds', () => {
  it('should get dependentEntity, then return it as javascript collection', () => {
    expect(listMemberIds(initialState)).toEqual([]);
  });
});

describe('listMemberObjects', () => {
  it('should get all current entity members, then return them as javascript collection', () => {
    expect(listMemberObjects(initialState)).toEqual(new List([]));
  });
});

describe('getDependantEntityTableItems', () => {
  it('should get dependent members of current entity, then return them as javascript collection', () => {
    expect(getDependantEntityTableItems(initialState)).toEqual([]);
  });
});

describe('getSidePanelTableItems', () => {
  it('should get all current entity members for side panel use', () => {
    expect(getSidePanelTableItems(initialState)).toEqual(undefined);
  });
});

describe('getModalTableItems', () => {
  it('should get available items for current entity, then return them as javascript collection', () => {
    expect(getModalTableItems(initialState)).toEqual([]);
  });
});

describe('getListSize', () => {
  it('should get size of collection of dependant members of current entity', () => {
    expect(getListSize(initialState)).toEqual(0);
  });
});

describe('availableItemsForList', () => {
  it('should get all available items to add to list, then return them as javascript collection', () => {
    expect(availableItemsForList(initialState)).toEqual([]);
  });
});

describe('getEntityListMembers', () => {
  it('should get all members from an entity, then return them as javascript collection', () => {
    expect(getEntityListMembers(initialState)).toEqual([]);
  });
});

describe('selectedEntityIndex', () => {
  it('should get index of current entity from list', () => {
    expect(selectedEntityIndex(initialState)).toEqual(0);
  });
});

describe('availableEntityMembersForList', () => {
  it('should get members available for current entity list, then return them as javascript collection', () => {
    expect(availableEntityMembersForList(initialState)).toEqual([]);
  });
});

describe('entityRemovedFromList', () => {
  it('should remove member by id, then return new list as javascript collection', () => {
    expect(entityRemovedFromList(initialState, '0001')).toEqual([]);
  });
});

describe('entityAddedToList', () => {
  it('should add member with the id, then return new list as javascript collection', () => {
    expect(entityAddedToList(initialState, '0002')).toEqual(['0002']);
  });
});
