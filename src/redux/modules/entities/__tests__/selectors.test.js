/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';
import {
  getCurrentEntity,
  getCurrentEntityStore,
  getSidePanelWidth,
  getSelectedEntityId,
  itemApiPending,
  getSelectedEntityBulkChangeItems,
  getConfirmationDialogType,
  getConfirmationDialogMetaData,
  getAllEntities,
  isEntityFetching,
  getSelectedEntity,
  getSelectedEntityName,
  getSelectedEntityStatus,
  userHasReadPermission,
  userHasReadPermissionManual,
  userHasUpdatePermission,
  userHasCreatePermission,
  userHasPermissions,
  hasPermission,
  isInherited,
  isCreating,
  isUpdating,
  isSaving,
  getCurrentSubEntity,
  getSelectedSubEntityId,
  getSelectedSubEntity,
  isSubEntitySaving,
  getSelectedEntityFormId,
  availableEntitiesForList,
  getListDependency,
  getEntityListMembers,
  getListSize
} from '../selectors';
import {
  getCurrentPermissions,
  getCurrentTenantId
} from '../../userData/selectors';
import { EntityMetaData, entitiesMetaData } from '../metaData';

entitiesMetaData.mockEntity = new EntityMetaData('mockEntity');

const initialState = fromJS({
  Entities: {
    loading: false,
    currentEntity: 'mockEntity',
    mockEntity: {
      sidePanelWidth: 1000,
      selectedEntityId: '0000',
      confirmationDialogType: 'CONFIRM_TOGGLE_ENTITY_LIST_ITEM_ACTIVE',
      confirmationDialogMetaData: { visible: true },
      confirmationDialogSubEntityData: {
        id: '0001',
        name: 'mockName',
        active: true
      },
      readPermission: ['READ_ALL'],
      updatePermission: ['UPDATE_ALL'],
      createPermission: ['CREATE_ALL'],
      fetching: false,
      creating: true,
      updating: false,
      subEntity: 'mockDependentEntity',
      selectedSubEntityId: '0001',
      subEntitySaving: false,
      metaData: { listDependency: 'mockDependentEntity' },
      data: [
        {
          id: '0000',
          name: 'mockName',
          active: true,
          tenantId: '0000-0000',
          items: [{ key: '0001' }],
          members: ['0002', '0003', '0004'],
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

jest.mock('../../userData/selectors');
getCurrentPermissions.mockImplementation(() => [
  'READ_ALL',
  'UPDATE_ALL',
  'MANAGE_ALL'
]);
getCurrentTenantId.mockImplementation(() => '0000-0000');

describe('getCurrentEntity', () => {
  it('Returns current entity name', () => {
    expect(getCurrentEntity(initialState)).toEqual('mockEntity');
  });
});

describe('getCurrentEntityStore', () => {
  it('Returns current entity data stored', () => {
    expect(getCurrentEntityStore(initialState)).toEqual(
      fromJS({
        sidePanelWidth: 1000,
        selectedEntityId: '0000',
        confirmationDialogType: 'CONFIRM_TOGGLE_ENTITY_LIST_ITEM_ACTIVE',
        confirmationDialogMetaData: { visible: true },
        confirmationDialogSubEntityData: {
          id: '0001',
          name: 'mockName',
          active: true
        },
        readPermission: ['READ_ALL'],
        updatePermission: ['UPDATE_ALL'],
        createPermission: ['CREATE_ALL'],
        fetching: false,
        creating: true,
        updating: false,
        subEntity: 'mockDependentEntity',
        selectedSubEntityId: '0001',
        subEntitySaving: false,
        metaData: { listDependency: 'mockDependentEntity' },
        data: [
          {
            id: '0000',
            name: 'mockName',
            active: true,
            tenantId: '0000-0000',
            items: [{ key: '0001' }],
            members: ['0002', '0003', '0004'],
            mockDependentEntity: [
              {
                id: '0001',
                name: 'mockName',
                active: true
              }
            ]
          }
        ]
      })
    );
  });
});

describe('getSidePanelWidth', () => {
  it('Returns sidePanel width configured for current entity', () => {
    expect(getSidePanelWidth(initialState)).toEqual(1000);
  });
});

describe('getSelectedEntityId', () => {
  it('Returns selected entity ID', () => {
    expect(getSelectedEntityId(initialState)).toEqual('0000');
  });
});

describe('itemApiPending', () => {
  it('Returns if item action is pending API response', () => {
    expect(itemApiPending(initialState)).toEqual(false);
  });
});

describe('getSelectedEntityBulkChangeItems', () => {
  it('Returns list of items selected for changes when there is no any selected', () => {
    expect(getSelectedEntityBulkChangeItems(initialState)).toEqual(List());
  });

  it('Returns list of items selected for changes', () => {
    expect(
      getSelectedEntityBulkChangeItems(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000',
                  bulkChangeItem: true
                }
              ]
            }
          }
        })
      )
    ).toEqual(fromJS(['0000']));
  });
});

describe('getConfirmationDialogType', () => {
  it('Returns dialog displayed type', () => {
    expect(getConfirmationDialogType(initialState)).toEqual(
      'CONFIRM_TOGGLE_ENTITY_LIST_ITEM_ACTIVE'
    );
  });
});

describe('getConfirmationDialogMetaData', () => {
  it('Returns dialog displayed metadata', () => {
    expect(getConfirmationDialogMetaData(initialState)).toEqual(
      fromJS({
        visible: true
      })
    );
  });
});

describe('getAllEntities', () => {
  it('Returns all current entities selected from state', () => {
    expect(getAllEntities(initialState)).toEqual(
      fromJS([
        {
          id: '0000',
          name: 'mockName',
          active: true,
          tenantId: '0000-0000',
          items: [{ key: '0001' }],
          members: ['0002', '0003', '0004'],
          mockDependentEntity: [
            {
              id: '0001',
              name: 'mockName',
              active: true
            }
          ]
        }
      ])
    );
  });
});

describe('isEntityFetching', () => {
  it('Returns if entity given is retrieving data from API', () => {
    expect(isEntityFetching(initialState, 'mockEntity')).toEqual(false);
  });
  it('Returns if current entity is retrieving data from API', () => {
    expect(isEntityFetching(initialState)).toEqual(false);
  });
});

describe('getSelectedEntity', () => {
  it('Returns selected entity data', () => {
    expect(getSelectedEntity(initialState)).toEqual(
      fromJS({
        id: '0000',
        name: 'mockName',
        active: true,
        tenantId: '0000-0000',
        items: [{ key: '0001' }],
        members: ['0002', '0003', '0004'],
        mockDependentEntity: [
          {
            id: '0001',
            name: 'mockName',
            active: true
          }
        ]
      })
    );
  });
});

describe('getSelectedEntityName', () => {
  it('Returns selected entity name', () => {
    expect(getSelectedEntityName(initialState)).toEqual('mockName');
  });
});

describe('getSelectedEntityStatus', () => {
  it('Returns selected entity status', () => {
    expect(getSelectedEntityStatus(initialState)).toEqual(true);
  });
});

describe('userHasReadPermission', () => {
  it('Returns if user has read permissions', () => {
    expect(userHasReadPermission(initialState)).toEqual(true);
  });
});

describe('userHasReadPermissionManual', () => {
  it('Returns if user has read permissions, manual method', () => {
    expect(userHasReadPermissionManual(initialState, 'mockEntity')).toEqual(
      true
    );
  });
});

describe('userHasUpdatePermission', () => {
  it('Returns if user has update permissions', () => {
    expect(userHasUpdatePermission(initialState)).toEqual(true);
  });
});

describe('userHasCreatePermission', () => {
  it('Returns if user has create permissions', () => {
    expect(userHasCreatePermission(initialState)).toEqual(false);
  });
});

describe('userHasPermissions', () => {
  it('Returns if user has given permissions', () => {
    expect(
      userHasPermissions(initialState, ['VIEW_ALL', 'UPDATE_ALL'])
    ).toEqual(true);
  });
});

describe('hasPermission', () => {
  it('Returns if user permissions contain permissions given', () => {
    expect(hasPermission(['VIEW_ALL', 'UPDATE_ALL'], ['VIEW_ALL'])).toEqual(
      true
    );
  });
  it('Returns if user permissions if permissions given are undefined', () => {
    expect(hasPermission(['VIEW_ALL', 'UPDATE_ALL'], undefined)).toEqual(false);
  });
});

describe('isInherited', () => {
  it('Returns if selected entity is inherited', () => {
    expect(isInherited(initialState)).toEqual(false);
  });
  it('Returns if selected entity is inherited when selectedEntityId is "create"', () => {
    expect(
      isInherited(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: 'create'
            }
          }
        })
      )
    ).toEqual(false);
  });
  it('Returns if selected entity is inherited when currentEntity does not match default', () => {
    expect(
      isInherited(
        fromJS({
          Entities: {
            currentEntity: 'users',
            users: {
              selectedEntityId: '0004'
            }
          }
        })
      )
    ).toEqual(false);
  });
  it('Returns if selected entity is inherited when currentEntity matches roles', () => {
    expect(
      isInherited(
        fromJS({
          Entities: {
            currentEntity: 'roles',
            roles: {
              selectedEntityId: '0004',
              data: [
                {
                  id: '0004',
                  type: 'system'
                }
              ]
            }
          }
        })
      )
    ).toEqual(true);
  });
  it('Returns if selected entity is inherited when currentEntity matches groups', () => {
    expect(
      isInherited(
        fromJS({
          Entities: {
            currentEntity: 'groups',
            groups: {
              selectedEntityId: '0005',
              data: [
                {
                  id: '0005',
                  name: 'everyone'
                }
              ]
            }
          }
        })
      )
    ).toEqual(true);
  });
});

describe('isCreating', () => {
  it('Returns if instance of entity is being created', () => {
    expect(isCreating(initialState)).toEqual(true);
  });
});

describe('isUpdating', () => {
  it('Returns if instance of entity is being updated', () => {
    expect(isUpdating(initialState)).toEqual(false);
  });
});

describe('isSaving', () => {
  it('Returns if instance of entity is being submmited', () => {
    expect(isSaving(initialState)).toEqual(true);
  });
  it('Returns if instance of entity is being updated', () => {
    expect(
      isSaving(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              creating: false,
              updating: true
            }
          }
        })
      )
    ).toEqual(true);
  });
});

describe('getCurrentSubEntity', () => {
  it('Returns current subentity name', () => {
    expect(getCurrentSubEntity(initialState)).toEqual('mockDependentEntity');
  });
});

describe('getSelectedSubEntityId', () => {
  it('Returns current subentity ID', () => {
    expect(getSelectedSubEntityId(initialState)).toEqual('0001');
  });
});

describe('getSelectedSubEntity', () => {
  it('Returns current subentity data', () => {
    expect(getSelectedSubEntity(initialState)).toEqual(fromJS({ key: '0001' }));
  });
});

describe('isSubEntitySaving', () => {
  it('Returns if instance of subentity is being saved', () => {
    expect(isSubEntitySaving(initialState)).toEqual(false);
  });
});

describe('getSelectedEntityFormId', () => {
  it('Returns current entity form ID', () => {
    expect(getSelectedEntityFormId(initialState)).toEqual('mockEntity:0000');
  });
});

describe('availableEntitiesForList', () => {
  it('Returns available members for selected entity', () => {
    expect(availableEntitiesForList(initialState)).toEqual([
      { active: true, id: '0001', name: 'mockName' }
    ]);
  });
});

describe('getListDependency', () => {
  it('Returns dependant entity name', () => {
    expect(getListDependency(initialState)).toEqual('mockDependentEntity');
  });
});

describe('getEntityListMembers', () => {
  it('Returns members list for selected entity', () => {
    expect(getEntityListMembers(initialState)).toEqual([
      '0002',
      '0003',
      '0004'
    ]);
  });
  it('Returns empty members list for selected entity if no members exist for currentEntity', () => {
    expect(
      getEntityListMembers(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000',
                  members: []
                }
              ]
            }
          }
        })
      )
    ).toEqual([]);
  });
});

describe('getListSize', () => {
  it('Returns size of members array for selected enitty', () => {
    expect(getListSize(initialState)).toEqual(3);
  });
});
