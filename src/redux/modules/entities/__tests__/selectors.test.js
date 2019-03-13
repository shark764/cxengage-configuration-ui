/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';
import moment from 'moment';
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
  shouldDisableField,
  isCreating,
  isUpdating,
  isSaving,
  getCurrentSubEntity,
  getSelectedSubEntityId,
  getSelectedSubEntityName,
  getSelectedSubEntityData,
  getSelectedSubEntity,
  isSubEntitySaving,
  getSelectedEntityFormId,
  availableEntitiesForList,
  getListDependency,
  getEntityListMembers,
  getListSize,
  findEntityIndex,
  findEntity,
  getSelectedEntityWithIndex,
  sidePanelHeader,
  isUpdateForm,
  userHasCurrentFormPermission
} from '../selectors';
import { EntityMetaData, entitiesMetaData } from '../metaData';
import { getCurrentPermissions, getCurrentTenantId } from '../../userData/selectors';
import { getUserDisplayName } from '../../userIdMap/selectors';

entitiesMetaData.mockEntity = new EntityMetaData('mockEntity');

const initialState = fromJS({
  UserIdMap: { '1000-0000': 'Jim Carrey', '1001-0000': 'John Frusciante' },
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
      selectedSubEntityName: 'mockDependentEntity',
      selectedSubEntityData: {},
      subEntitySaving: false,
      metaData: { listDependency: 'mockDependentEntity' },
      data: [
        {
          id: '0000',
          name: 'mockName',
          active: true,
          tenantId: '0000-0000',
          created: '2018-07-16T14:43:14Z',
          createdBy: '1000-0000',
          updated: '2019-02-20T18:55:35Z',
          updatedBy: '1001-0000',
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
getCurrentPermissions.mockImplementation(() => ['READ_ALL', 'UPDATE_ALL', 'MANAGE_ALL']);
getCurrentTenantId.mockImplementation(() => '0000-0000');

jest.mock('../../userIdMap/selectors');

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
        selectedSubEntityName: 'mockDependentEntity',
        selectedSubEntityData: {},
        subEntitySaving: false,
        metaData: { listDependency: 'mockDependentEntity' },
        data: [
          {
            id: '0000',
            name: 'mockName',
            active: true,
            tenantId: '0000-0000',
            created: '2018-07-16T14:43:14Z',
            createdBy: '1000-0000',
            updated: '2019-02-20T18:55:35Z',
            updatedBy: '1001-0000',
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
    expect(getConfirmationDialogType(initialState)).toEqual('CONFIRM_TOGGLE_ENTITY_LIST_ITEM_ACTIVE');
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
          created: '2018-07-16T14:43:14Z',
          createdBy: '1000-0000',
          updated: '2019-02-20T18:55:35Z',
          updatedBy: '1001-0000',
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
        created: '2018-07-16T14:43:14Z',
        createdBy: '1000-0000',
        updated: '2019-02-20T18:55:35Z',
        updatedBy: '1001-0000',
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
    expect(userHasReadPermissionManual(initialState, 'mockEntity')).toEqual(true);
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
    expect(userHasPermissions(initialState, ['VIEW_ALL', 'UPDATE_ALL'])).toEqual(true);
  });
});

describe('hasPermission', () => {
  it('Returns if user permissions contain permissions given', () => {
    expect(hasPermission(['VIEW_ALL', 'UPDATE_ALL'], ['VIEW_ALL'])).toEqual(true);
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
  it('Returns if selected entity is inherited when selectedEntityId is "bulk"', () => {
    expect(
      isInherited(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: 'bulk'
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

describe('shouldDisableField', () => {
  it('Returns if selected entity field should be disabled', () => {
    expect(shouldDisableField(initialState)).toEqual(false);
  });
  it('Returns if selected entity field should be disabled when selectedEntityId is "create"', () => {
    expect(
      shouldDisableField(
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
  it('Returns if selected entity field should be disabled when currentEntity matches default', () => {
    expect(
      shouldDisableField(
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
  it('Returns if selected entity is inherited when currentEntity matches reasonLists', () => {
    expect(
      shouldDisableField(
        fromJS({
          Entities: {
            currentEntity: 'reasonLists',
            reasonLists: {
              selectedEntityId: '0004',
              data: [
                {
                  id: '0004',
                  type: 'system',
                  reasons: []
                }
              ]
            }
          }
        })
      )
    ).toEqual(true);
  });
  it('Returns if selected entity is inherited when currentEntity matches flows', () => {
    expect(
      shouldDisableField(
        fromJS({
          Entities: {
            currentEntity: 'flows',
            flows: {
              selectedEntityId: '0004',
              data: [
                {
                  id: '0004',
                  versions: [],
                  drafts: []
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

describe('getSelectedSubEntityName', () => {
  it('Returns current subentity Name', () => {
    expect(getSelectedSubEntityName(initialState)).toEqual('mockDependentEntity');
  });
});

describe('getSelectedSubEntityData', () => {
  it('Returns current subentity Data', () => {
    expect(getSelectedSubEntityData(initialState)).toEqual(fromJS({}));
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
    expect(availableEntitiesForList(initialState)).toEqual([{ active: true, id: '0001', name: 'mockName' }]);
  });
});

describe('getListDependency', () => {
  it('Returns dependant entity name', () => {
    expect(getListDependency(initialState)).toEqual('mockDependentEntity');
  });
});

describe('getEntityListMembers', () => {
  it('Returns members list for selected entity', () => {
    expect(getEntityListMembers(initialState)).toEqual(['0002', '0003', '0004']);
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
  it('Returns size of members array for selected entity', () => {
    expect(getListSize(initialState)).toEqual(3);
  });
});

describe('findEntityIndex', () => {
  it('Returns index of selected entity', () => {
    expect(
      findEntityIndex(
        fromJS({
          mockEntity: {
            selectedEntityId: '0000',
            data: [
              {
                id: '0000'
              }
            ]
          }
        }),
        'mockEntity',
        '0000'
      )
    ).toEqual(0);
  });
  it('Returns index of selected entity when state contains all Entities', () => {
    expect(findEntityIndex(initialState, 'mockEntity', '0000')).toEqual(0);
  });
});

describe('findEntity', () => {
  it('Returns entity by given entityName and id', () => {
    expect(
      findEntity(
        fromJS({
          mockEntity: {
            selectedEntityId: '0000',
            data: [
              {
                id: '0000'
              }
            ]
          }
        }),
        'mockEntity',
        '0000'
      )
    ).toEqual(
      fromJS({
        id: '0000'
      })
    );
  });
  it('Returns index of selected entity when state contains all Entities', () => {
    expect(findEntity(initialState, 'mockEntity', '0000')).toEqual(
      fromJS({
        id: '0000',
        name: 'mockName',
        active: true,
        tenantId: '0000-0000',
        created: '2018-07-16T14:43:14Z',
        createdBy: '1000-0000',
        updated: '2019-02-20T18:55:35Z',
        updatedBy: '1001-0000',
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

describe('getSelectedEntityWithIndex', () => {
  it('Returns entity data with index given', () => {
    expect(
      getSelectedEntityWithIndex(
        fromJS({
          currentEntity: 'mockEntity',
          mockEntity: {
            selectedEntityId: '0000',
            data: [
              {
                id: '0000'
              }
            ]
          }
        })
      )
    ).toEqual(fromJS({ id: '0000', currentIndex: 0, entityName: 'mockEntity' }));
  });
  it('Returns undefined when no result is found', () => {
    expect(
      getSelectedEntityWithIndex(
        fromJS({
          currentEntity: 'mockEntity',
          mockEntity: {
            selectedEntityId: '0000',
            data: [
              {
                id: '0001'
              }
            ]
          }
        })
      )
    ).toEqual(undefined);
  });
});

describe('sidePanelHeader', () => {
  it('Returns metadata used for sidePanelHeader', () => {
    getUserDisplayName.mockImplementationOnce(() => 'Jim Carrey').mockImplementationOnce(() => 'John Frusciante');
    expect(sidePanelHeader(initialState)).toEqual({
      createdAt: `Created on ${moment('2018-07-16T14:43:14Z').format('lll')}  by Jim Carrey `,
      title: 'mockName',
      toggleStatus: true,
      updatedAt: `Last updated on ${moment('2019-02-20T18:55:35Z').format('lll')}  by John Frusciante`
    });
  });
  it('Returns metadata used for sidePanelHeader when createdByName is not defined', () => {
    getUserDisplayName.mockImplementationOnce(() => undefined).mockImplementationOnce(() => 'John Frusciante');
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  active: true,
                  created: '2018-07-16T14:43:14Z',
                  createdBy: '1000-0000',
                  updated: '2019-02-20T18:55:35Z',
                  updatedBy: '1001-0000'
                }
              ]
            }
          }
        })
      )
    ).toEqual({
      createdAt: `Created on ${moment('2018-07-16T14:43:14Z').format('lll')}  `,
      title: 'mockName',
      toggleStatus: true,
      updatedAt: `Last updated on ${moment('2019-02-20T18:55:35Z').format('lll')}  by John Frusciante`
    });
  });
  it('Returns metadata used for sidePanelHeader when updatedByName is not defined', () => {
    getUserDisplayName.mockImplementationOnce(() => 'Jim Carrey').mockImplementationOnce(() => undefined);
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  active: true,
                  created: '2018-07-16T14:43:14Z',
                  createdBy: '1000-0000',
                  updated: '2019-02-20T18:55:35Z',
                  updatedBy: '1001-0000'
                }
              ]
            }
          }
        })
      )
    ).toEqual({
      createdAt: `Created on ${moment('2018-07-16T14:43:14Z').format('lll')}  by Jim Carrey `,
      title: 'mockName',
      toggleStatus: true,
      updatedAt: `Last updated on ${moment('2019-02-20T18:55:35Z').format('lll')} `
    });
  });
  it('Returns metadata used for sidePanelHeader when name is not defined but has email', () => {
    getUserDisplayName.mockImplementationOnce(() => 'Jim Carrey').mockImplementationOnce(() => 'John Frusciante');
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000',
                  email: 'mock@mock.com',
                  active: true,
                  created: '2018-07-16T14:43:14Z',
                  createdBy: '1000-0000',
                  updated: '2019-02-20T18:55:35Z',
                  updatedBy: '1001-0000'
                }
              ]
            }
          }
        })
      )
    ).toEqual({
      createdAt: `Created on ${moment('2018-07-16T14:43:14Z').format('lll')}  by Jim Carrey `,
      title: 'mock@mock.com',
      toggleStatus: true,
      updatedAt: `Last updated on ${moment('2019-02-20T18:55:35Z').format('lll')}  by John Frusciante`
    });
  });
  it('Returns metadata used for sidePanelHeader when active is not defined but has status', () => {
    getUserDisplayName.mockImplementationOnce(() => 'Jim Carrey').mockImplementationOnce(() => 'John Frusciante');
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000',
                  name: 'mockName',
                  status: 'accepted',
                  created: '2018-07-16T14:43:14Z',
                  createdBy: '1000-0000',
                  updated: '2019-02-20T18:55:35Z',
                  updatedBy: '1001-0000'
                }
              ]
            }
          }
        })
      )
    ).toEqual({
      createdAt: `Created on ${moment('2018-07-16T14:43:14Z').format('lll')}  by Jim Carrey `,
      title: 'mockName',
      toggleStatus: true,
      updatedAt: `Last updated on ${moment('2019-02-20T18:55:35Z').format('lll')}  by John Frusciante`
    });
  });
  it('Returns metadata used for sidePanelHeader when currentEntity equals roles', () => {
    getUserDisplayName.mockImplementationOnce(() => 'Jim Carrey').mockImplementationOnce(() => 'John Frusciante');
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'roles',
            roles: {
              selectedEntityId: '0004',
              data: [
                {
                  id: '0004',
                  name: 'mockName',
                  type: 'system',
                  active: true,
                  created: '2018-07-16T14:43:14Z',
                  createdBy: '1000-0000',
                  updated: '2019-02-20T18:55:35Z',
                  updatedBy: '1001-0000'
                }
              ]
            }
          }
        })
      )
    ).toEqual({
      createdAt: `Created on ${moment('2018-07-16T14:43:14Z').format('lll')}  by Jim Carrey `,
      title: 'mockName',
      toggleStatus: undefined,
      updatedAt: `Last updated on ${moment('2019-02-20T18:55:35Z').format('lll')}  by John Frusciante`
    });
  });
  it('Returns just title if selectedEntityId equals create', () => {
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: 'create'
            }
          }
        })
      )
    ).toEqual({ title: 'Creating New Mock Entit' });
  });
  it('Returns just title if selectedEntityId equals bulk', () => {
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: 'bulk',
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
    ).toEqual({
      title: 'Bulk Actions: 1 Selected'
    });
  });
  it('Returns undefined if selectedEntityId is not defined', () => {
    expect(
      sidePanelHeader(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: undefined,
              data: [
                {
                  id: '0000'
                }
              ]
            }
          }
        })
      )
    ).toEqual(undefined);
  });
});

describe('isUpdateForm', () => {
  it('Returns true if selected entity exists for update form', () => {
    expect(
      isUpdateForm(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000'
                }
              ]
            }
          }
        })
      )
    ).toEqual(true);
  });
  it('Returns false for create form', () => {
    expect(
      isUpdateForm(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0001'
                }
              ]
            }
          }
        })
      )
    ).toEqual(false);
  });
});

describe('userHasCurrentFormPermission', () => {
  it('Returns true if is an update form and user has permissions', () => {
    expect(
      userHasCurrentFormPermission(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0000'
                }
              ],
              updatePermission: ['UPDATE_ALL'],
              createPermission: ['CREATE_ALL']
            }
          }
        })
      )
    ).toEqual(true);
  });
  it('Returns true if is a create form and user has permissions', () => {
    expect(
      userHasCurrentFormPermission(
        fromJS({
          Entities: {
            currentEntity: 'mockEntity',
            mockEntity: {
              selectedEntityId: '0000',
              data: [
                {
                  id: '0001'
                }
              ],
              updatePermission: ['UPDATE_ALL'],
              createPermission: ['CREATE_ALL']
            }
          }
        })
      )
    ).toEqual(false);
  });
});
