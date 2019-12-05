/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { generateUUID } from 'serenova-js-utils/uuid';
import * as transferListSelectors from '../selectors';
import {
  getCurrentFormValueByFieldName,
  getCurrentSubFormValueByFieldName,
  getCurrentSubmittingFormProps,
  getCurrentSubmittingFormValues
} from '../../../form/selectors';
import {
  getSelectedEntity,
  getSelectedEntityId,
  getEntityData,
  getSelectedSubEntityId
} from '../../../entities/selectors';

jest.mock('../../../form/selectors');
jest.mock('../../../entities/selectors');
jest.mock('serenova-js-utils/uuid');

describe('TransferListsForm selectors', () => {
  // mockData:
  const mockState = fromJS({
    Entities: {
      transferLists: {
        data: [
          {
            id: 'mockTransferListId1',
            name: 'mockTransferListName1',
            description: 'mockTransferListDescription1',
            active: true
          },
          {
            id: 'mockTransferListId2',
            name: 'mockTransferListName2',
            description: 'mockTransferListDescription2',
            active: false
          }
        ],
        selectedEntityId: 'create'
      },
      queues: {
        data: [
          {
            id: 'mockQueueId1',
            name: 'mockQueueName1',
            active: true
          },
          {
            id: 'mockQueueId2',
            name: 'mockQueueName2',
            active: false
          },
          {
            id: 'updatedMockQueueId',
            name: 'updatedMockQueueName',
            active: true
          }
        ]
      },
      currentEntity: 'transferLists',
      form: {
        transferListMockId: {
          values: {
            endpoints: [
              {
                hierarchy: 'mockHierarchy1',
                categoryUUID: 'mockCategoryUUID1',
                name: 'mockContactName1',
                contactType: 'queue',
                endpoint: 'mockQueueId1',
                endpointUUID: 'mockEndpointUUID1',
                droppableUUID: 'mockDroppableUUID1'
              },
              {
                hierarchy: 'mockHierarchy1',
                name: 'mockContactName2',
                contactType: 'pstn',
                endpoint: 'mockQueueId2',
                endpointUUID: 'mockEndpointUUID2',
                droppableUUID: 'mockDroppableUUID2'
              },
              {
                hierarchy: 'mockHierarchy2',
                categoryUUID: 'mockCategoryUUID2',
                name: 'mockContactName3',
                contactType: 'sip',
                endpoint: 'mockSipAddress',
                endpointUUID: 'mockEndpointUUID3',
                droppableUUID: 'mockDroppableUUID3'
              }
            ]
          }
        }
      }
    }
  });
  let mockProps, mockEndpoints;
  beforeEach(() => {
    mockProps = {
      values: fromJS({
        hierarchy: ' updateMockHierarchy ',
        endpoint: ' updatedMockQueueName',
        contactType: 'queue',
        endpointUUID: 'mockEndpointUUID1'
      }),
      initialValues: fromJS({
        hierarchy: 'mockHierarchy1',
        endpoint: ' mockQueueName1',
        contactType: 'queue'
      })
    };
    mockEndpoints = mockState.getIn(['Entities', 'form', 'transferListMockId', 'values', 'endpoints']);
    const mockQueuesData = mockState.getIn(['Entities', 'queues', 'data']);
    generateUUID.mockImplementation(() => 'mockGenerateUUID');
    getCurrentFormValueByFieldName.mockImplementation(() => mockEndpoints);
    getCurrentSubmittingFormProps.mockImplementation(() => mockProps);
    getEntityData.mockImplementation(() => mockQueuesData);
  });

  // TransferList form initial values selectors:
  it('Gets initial values while creating a new transferList', () => {
    getSelectedEntity.mockImplementation(() => mockState);
    getSelectedEntityId.mockImplementation(() => 'create');
    expect(transferListSelectors.transferListsFormInitialValues(mockState)).toMatchSnapshot();
  });
  it('Gets initial values when an existing transferList is selected', () => {
    const updateState = mockState.updateIn(
      ['Entities', 'transferLists', 'selectedEntityId'],
      () => 'mockTransferListId1'
    );
    getSelectedEntity.mockImplementation(() => mockState.getIn(['Entities', 'transferLists', 'data', 0]));
    getSelectedEntityId.mockImplementation(() => 'mockTransferListId1');
    expect(transferListSelectors.transferListsFormInitialValues(updateState)).toMatchSnapshot();
  });
  it('Gets currently selected trasnferList endpoints', () => {
    expect(transferListSelectors.currentFormEndpoints(mockEndpoints)).toMatchSnapshot();
  });

  // Selects TransferListItem (subEntityForm) field values:
  it('Checks whether the transferListItem is being created in an existing category', () => {
    getCurrentSubFormValueByFieldName.mockImplementation(() => true);
    expect(transferListSelectors.isUserCreatingNewCategory()).toEqual(true);
  });
  it('Gets the contactType field value of the transferListItem that is being created', () => {
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'queue');
    expect(transferListSelectors.selectedContactType()).toEqual('queue');
  });
  it('Gets the hierarchy input field value of the transferListItem that is being created', () => {
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'mockHierarchyName');
    expect(transferListSelectors.hierarchyInputText()).toEqual('mockHierarchyName');
  });
  it('Gets the endpoint input field value of the transferListItem that is being created', () => {
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'mockEndpointValue');
    expect(transferListSelectors.endpointFieldValue()).toEqual('mockEndpointValue');
  });
  it('Gets endpoint field value from currently submiting transferListItem form values', () => {
    expect(transferListSelectors.currentSubFormEndpointFieldValue()).toMatchSnapshot();
  });
  it('user should be able to select one of the existing category names while creating a transferListItem', () => {
    expect(transferListSelectors.selectExistingCategories()).toMatchSnapshot();
  });

  // Queues selectors:
  it('Selects active queue names from the tenant', () => {
    expect(transferListSelectors.selectActiveQueueNames()).toMatchSnapshot();
  });
  it('converts queueName to queueId when the transferListItem contactType is queue', () => {
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'queue');
    expect(transferListSelectors.selectActiveQueueId('queue')).toMatchSnapshot();
  });
  it('should return undefined when the transferListItem contactType is sip/pstn', () => {
    getCurrentSubFormValueByFieldName.mockImplementationOnce(() => 'pstn');
    expect(transferListSelectors.selectActiveQueueId('pstn')).toBe(undefined);
  });

  // transferListItem (subEntityForm) update selectors:
  it('Gets all of the transferListItem values to display in the respective fields while updating a transferListItem', () => {
    getSelectedSubEntityId.mockImplementation(() => 'updateTransferListItem:mockEndpointUUID1');
    expect(transferListSelectors.getSelectedTransferListItemValues()).toMatchSnapshot();
  });
  it('Gets category header value to display in the categoryName field while updating category header', () => {
    getSelectedSubEntityId.mockImplementation(() => 'updateCategoryHeader:mockCategoryUUID1');
    expect(
      transferListSelectors.getSelectedTransferListItemValues('updateCategoryHeader:mockCategoryUUID1')
    ).toMatchSnapshot();
  });
  it('adds UUIDS to the transferListItem that is going to be added to the transferList', () => {
    getCurrentSubmittingFormValues.mockImplementation(() => mockProps.initialValues);
    expect(transferListSelectors.selectEndpointUUIDS()).toMatchSnapshot();
  });

  // transferList (mainEntityForm):
  it('updates transferList endpoints (mainEntityForm values) when adding transferListItem to a new transferList', () => {
    getCurrentSubmittingFormValues.mockImplementation(() => mockProps.values);
    getCurrentFormValueByFieldName.mockImplementation(() => undefined);
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'queue');
    expect(transferListSelectors.transferListItemCreateValues(undefined)).toMatchSnapshot();
  });
  it('updates transferList endpoints (mainEntityForm values) when adding transferListItem to an existing transferList', () => {
    getCurrentSubmittingFormValues.mockImplementation(() => mockProps.values);
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'queue');
    expect(transferListSelectors.transferListItemCreateValues(mockEndpoints)).toMatchSnapshot();
  });
  it('updates transferList endpoints (mainEntityForm values) when updating one of its transferListItem values', () => {
    getSelectedSubEntityId.mockImplementationOnce(() => 'updateTransferListItem:mockTransferListId1');
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'queue');
    expect(
      transferListSelectors.transferListItemUpdateValues('updateTransferListItem:mockTransferListId1')
    ).toMatchSnapshot();
  });
  it('updates transferList endpoints (mainEntityForm values) when updating one of its transferListItem category header', () => {
    getSelectedSubEntityId.mockImplementation(() => 'updateCategoryHeader:mockTransferListId1');
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'queue');
    expect(
      transferListSelectors.transferListItemUpdateValues('updateCategoryHeader:mockTransferListId1')
    ).toMatchSnapshot();
  });
  it('select endpoints that only contains categoryHeaders', () => {
    expect(transferListSelectors.selectEndpointHeaders(mockEndpoints)).toMatchSnapshot();
  });
});
