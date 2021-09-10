/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getCurrentEntity, getSelectedEntity, getCurrentEntityStore, getSelectedEntityId } from '../selectors';
import {
  listMemberIds,
  listMemberObjects,
  getDependantEntityTableItems,
  getSidePanelTableItems,
  getModalTableItems,
  availableItemsForList,
  getEntityListMembers,
  selectedEntityIndex,
  availableEntityMembersForList,
  entityRemovedFromList,
  entityAddedToList,
} from '../listItemSelectors';
import { EntityMetaData, entitiesMetaData } from '../metaData';
import { getCurrentPermissions } from '../../userData/selectors';

entitiesMetaData.mockEntity = new EntityMetaData('mockEntity');
entitiesMetaData.mockEntity.dependentEntity = 'mockDependentEntity';

const initialState = fromJS({
  Entities: {
    mockEntity: {
      data: [
        {
          id: '0000',
          name: 'mockName',
          active: true,
          mockDependentEntity: ['0001'],
        },
      ],
      selectedEntityId: '0000',
    },
    mockDependentEntity: {
      data: [
        {
          id: '0001',
          name: 'mockName',
          active: true,
        },
      ],
    },
  },
});

const mockSelectedEntity = fromJS({
  id: '0000',
  name: 'mockName',
  active: true,
  mockDependentEntity: ['0001'],
});

const mockCurrentEntityStore = fromJS({
  data: [
    {
      id: '0000',
      name: 'mockName',
      active: true,
      mockDependentEntity: ['0001'],
    },
  ],
  selectedEntityId: '0000',
});

jest.mock('../selectors');
jest.mock('../../userData/selectors');
getCurrentEntity.mockImplementation(() => 'mockEntity');
getSelectedEntity.mockImplementation(() => mockSelectedEntity);
getCurrentEntityStore.mockImplementation(() => mockCurrentEntityStore);
getSelectedEntityId.mockImplementation(() => '0000');
getCurrentPermissions.mockImplementation(() => ['mockPermissionName']);

describe('listMemberIds', () => {
  it('should get dependentEntity, then return it as javascript collection', () => {
    expect(listMemberIds(initialState)).toEqual(['0001']);
  });
});

describe('listMemberObjects', () => {
  it('should get all current entity members, then return them as javascript collection', () => {
    expect(listMemberObjects(initialState)).toEqual(fromJS([{ id: '0001', name: 'mockName', active: true }]));
  });
});

describe('getDependantEntityTableItems', () => {
  it('should get dependent members of current entity, then return them as javascript collection', () => {
    expect(getDependantEntityTableItems(initialState)).toEqual([{ active: true, id: '0001', name: 'mockName' }]);
  });
  it('should get empty array since dependentEntity has no entries in state', () => {
    expect(
      getDependantEntityTableItems(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  mockDependentEntity: ['0001'],
                },
              ],
            },
            mockDependentEntity: {
              data: undefined,
            },
          },
        })
      )
    ).toEqual([]);
  });
});

describe('getSidePanelTableItems', () => {
  it('should get all current entity members for side panel use', () => {
    expect(getSidePanelTableItems(initialState, 'mockDependentEntity')).toEqual([
      { active: true, id: '0001', name: 'mockName' },
    ]);
  });
  it('should get empty array since dependentEntity has no entries in state', () => {
    expect(
      getSidePanelTableItems(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  active: true,
                  mockDependentEntity: ['0001'],
                },
              ],
            },
            mockDependentEntity: {
              data: undefined,
            },
          },
        }),
        'mockDependentEntity'
      )
    ).toEqual(undefined);
  });
});

describe('getModalTableItems', () => {
  it('should get available items for current entity, then return them as javascript collection', () => {
    expect(getModalTableItems(initialState, 'mockDependentEntity')).toEqual([]);
  });
  it('should get available items for current entity when entityName equals reasonLists, then return them as javascript collection', () => {
    expect(
      getModalTableItems(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  active: true,
                  reasonLists: ['0001'],
                },
              ],
            },
            reasonLists: {
              data: [
                {
                  id: '0001',
                  name: 'mockName',
                  active: true,
                },
                {
                  id: '0002',
                  name: 'mockNam2',
                  active: true,
                },
              ],
            },
          },
        }),
        'reasonLists'
      )
    ).toEqual([{ active: true, id: '0001', name: 'mockName' }, { active: true, id: '0002', name: 'mockNam2' }]);
  });
  it('should get empty array since there are no data for dependentEntity', () => {
    expect(getModalTableItems(initialState, 'mockDependentEntity2')).toEqual([]);
  });
  it('should get empty array since dependentEntity data is undefined', () => {
    expect(
      getModalTableItems(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  active: true,
                  mockDependentEntity: ['0001'],
                },
              ],
            },
            mockDependentEntity: {
              data: undefined,
            },
          },
        }),
        'mockDependentEntity'
      )
    ).toEqual([]);
  });
});

describe('availableItemsForList', () => {
  it('should get all available items to add to list, then return them as javascript collection', () => {
    expect(
      availableItemsForList(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  active: true,
                  mockDependentEntity: ['0001'],
                },
              ],
            },
            mockDependentEntity: {
              data: [
                {
                  id: '0001',
                  name: 'mockName',
                  active: true,
                },
                {
                  id: '0002',
                  name: 'mockNam2',
                  active: true,
                },
              ],
            },
          },
        })
      )
    ).toEqual([{ active: true, id: '0002', name: 'mockNam2' }]);
  });
  it('should get empty array since dependentEntity has no entries in state', () => {
    expect(
      availableItemsForList(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  mockDependentEntity: ['0001'],
                },
              ],
            },
            mockDependentEntity: {
              data: undefined,
            },
          },
        })
      )
    ).toEqual([]);
  });
});

describe('getEntityListMembers', () => {
  it('should get all members from an entity, then return them as javascript collection', () => {
    expect(getEntityListMembers(initialState)).toEqual([{ active: true, id: '0001', name: 'mockName' }]);
  });
  it('should get empty array if members are undefined for selected entity', () => {
    expect(
      getEntityListMembers(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  mockDependentEntity: undefined,
                },
              ],
            },
            mockDependentEntity: {
              data: undefined,
            },
          },
        })
      )
    ).toEqual([]);
  });
});

describe('selectedEntityIndex', () => {
  it('should get index of current entity from list', () => {
    expect(selectedEntityIndex(initialState)).toEqual(0);
  });
});

describe('availableEntityMembersForList', () => {
  it('should get members available for current entity list, then return them as javascript collection', () => {
    expect(
      availableEntityMembersForList(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  active: true,
                  mockDependentEntity: ['0001'],
                },
              ],
            },
            mockDependentEntity: {
              data: [
                {
                  id: '0001',
                  name: 'mockName',
                  active: true,
                },
                {
                  id: '0002',
                  name: 'mockNam2',
                  active: true,
                },
              ],
            },
          },
        })
      )
    ).toEqual([{ active: true, id: '0002', name: 'mockNam2' }]);
  });
  it('should get empty array since dependentEntity has no entries in state', () => {
    expect(
      availableEntityMembersForList(
        fromJS({
          Entities: {
            mockEntity: {
              data: [
                {
                  id: '0000',
                  mockDependentEntity: ['0001'],
                },
              ],
            },
            mockDependentEntity: {
              data: undefined,
            },
          },
        })
      )
    ).toEqual([]);
  });
  it('should filter permissions when entity is roles', () => {
    const mockTempSelectedEntity = fromJS({
      id: '0000',
      name: 'mockName',
      active: true,
      mockDependentEntity: ['permissions'],
    });
    getSelectedEntity.mockImplementationOnce(() => mockTempSelectedEntity);
    getCurrentEntity.mockImplementationOnce(() => 'roles');
    const mockCurrentRolesEntityStore = fromJS({
      data: [
        {
          id: '0000',
          name: 'mockRoleName',
          active: true,
          permissions: ['0001', '0002'],
        },
      ],
      selectedEntityId: '0000',
    });
    const userDataPermissions = fromJS({
      Entities: {
        permissions: {
          data: [
            {
              id: '0001',
              name: 'mockPermissionName',
              active: true,
            },
            {
              id: '0002',
              name: 'mockPermissionName2',
              active: true,
            },
          ],
        },
      },
    });
    expect(availableEntityMembersForList(userDataPermissions)).toEqual([
      { id: '0001', name: 'mockPermissionName', active: true },
    ]);
  });
});

describe('entityRemovedFromList', () => {
  it('should remove member by id, then return new list as javascript collection', () => {
    expect(entityRemovedFromList(initialState, '0001')).toEqual([]);
  });
});

describe('entityAddedToList', () => {
  it('should add member with the id, then return new list as javascript collection', () => {
    expect(entityAddedToList(initialState, '0002')).toEqual(['0002', '0001']);
  });
});
