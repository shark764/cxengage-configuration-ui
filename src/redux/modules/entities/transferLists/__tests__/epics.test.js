import { ActionsObservable } from 'redux-observable';
import { mockStore } from '../../../../../utils/testUtils';
import { sdkPromise } from '../../../../../utils/sdk';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntityStatus,
  getSelectedEntity
} from '../../../entities/selectors';
import { getCurrentFormValueByFieldName } from '../../../form/selectors';
import {
  getQueuesAfterFetchingTransferLists,
  InitTransferListsForm,
  TransferListsSubEntityFormSubmission,
  ReInitTransferListsForm,
  DeleteTransferListItem,
  RemoveTransferListItem
} from '../epics';
import { fromJS } from 'immutable';

jest.mock('serenova-js-utils/uuid', () => ({
  generateUUID: jest.fn(() => 'mockGenerateUUID')
}));
jest.mock('../../../entities/selectors');
jest.mock('../../../form/selectors');

describe('TransferLists Epics', () => {
  const mockState = fromJS({
    id: 'mockTransferListId',
    name: 'mockTransferListName',
    description: 'mockDescription',
    active: true,
    endpoints: [
      {
        hierarchy: 'mockHierarchy1',
        name: 'mockContactName1',
        categoryUUID: 'mockCategoryUUID1',
        droppableUUID: 'mockDroppableUUID1',
        draggableUUID: 'mockDraggableUUID1',
        endpointUUID: 'mockEndpointUUID1'
      },
      {
        hierarchy: 'mockHierarchy1',
        name: 'mockContactName2',
        categoryUUID: 'mockCategoryUUID1',
        droppableUUID: 'mockDroppableUUID1',
        draggableUUID: 'mockDraggableUUID2',
        endpointUUID: 'mockEndpointUUID2'
      },
      {
        hierarchy: 'mockHierarchy3',
        name: 'mockContactName3',
        categoryUUID: 'mockCategoryUUID3',
        droppableUUID: 'mockDroppableUUID3',
        draggableUUID: 'mockDraggableUUID3',
        endpointUUID: 'mockEndpointUUID3'
      }
    ]
  });

  beforeEach(() => {
    getCurrentEntity.mockImplementation(() => 'transferLists');
  });

  it('getQueuesAfterFetchingTransferLists', done => {
    const action = ActionsObservable.of({
      type: 'FETCH_DATA_FULFILLED',
      entityName: 'transferLists',
      response: { result: 'results' }
    });
    getQueuesAfterFetchingTransferLists(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('InitTransferListsForm', done => {
    const action = ActionsObservable.of({
      type: 'FETCH_DATA_ITEM_FULFILLED',
      entityName: 'transferLists',
      id: 'mockTransferListId',
      response: {
        result: {
          name: 'mockTransferListName',
          description: 'mockTransferListDescription',
          endpoints: [
            {
              hierarchy: 'mockHierarchy1',
              name: 'mockContactName1'
            },
            {
              hierarchy: 'mockHierarchy1',
              name: 'mockContactName2'
            },
            {
              hierarchy: 'mockHierarchy3',
              name: 'mockContactName3'
            }
          ]
        }
      }
    });
    InitTransferListsForm(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('creating transferListItem in a new transferList', done => {
    const action = ActionsObservable.of({
      type: 'SUB_ENTITY_FORM_SUBMIT',
      entityName: 'transferLists',
      dirty: true,
      values: 'mockTransferListValues'
    });
    getSelectedEntityId.mockImplementation(() => 'create');
    TransferListsSubEntityFormSubmission(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('Creating transferListItem in an existing transferList', done => {
    const action = ActionsObservable.of({
      type: 'SUB_ENTITY_FORM_SUBMIT',
      entityName: 'transferLists',
      dirty: true,
      values: mockState.get('endpoints')
    });
    getSelectedEntityStatus.mockImplementation(() => true);
    getSelectedEntityId.mockImplementation(() => 'mockTransferListId');
    getCurrentFormValueByFieldName
      .mockImplementationOnce(() => 'mockTransferListName')
      .mockImplementationOnce(() => 'mockTransferListDescription');
    TransferListsSubEntityFormSubmission(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('ReInitTransferListsForm', done => {
    const action = ActionsObservable.of({
      type: 'UPDATE_ENTITY_FULFILLED',
      entityName: 'transferLists',
      entityId: 'mockTransferListId',
      response: { result: 'results' },
      values: {
        endpoints: [
          {
            hierarchy: 'mockHierarchy1',
            name: 'mockContactName1'
          },
          {
            hierarchy: 'mockHierarchy2',
            name: 'mockContactName2'
          },
          {
            hierarchy: 'mockHierarchy1',
            name: 'mockContactName3'
          }
        ]
      }
    });
    ReInitTransferListsForm(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('Deletes a transferListItem from an existing transferList', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      transferListItemId: 'mockEndpointUUID2'
    });
    getSelectedEntity.mockImplementation(() => mockState);
    getSelectedEntityId.mockImplementation(() => 'mockTransferListId');
    getCurrentFormValueByFieldName.mockImplementation(() => mockState.get('endpoints'));
    DeleteTransferListItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('Deletes group of transferListItems that belong to a category from an existing transferList ', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      categoryId: 'mockCategoryUUID1'
    });
    getSelectedEntity.mockImplementation(() => mockState);
    getSelectedEntityId.mockImplementation(() => 'mockTransferListId');
    getCurrentFormValueByFieldName.mockImplementation(() => mockState.get('endpoints'));
    DeleteTransferListItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('transferList should contain atleast one transferListItem in it', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      transferListItemId: 'mockEndpointUUID1'
    });
    const updatedMockState = mockState.update('endpoints', endpoints => endpoints.get(0));
    getSelectedEntity.mockImplementation(() => updatedMockState);
    getSelectedEntityId.mockImplementation(() => 'mockTransferListId');
    getCurrentFormValueByFieldName.mockImplementation(() => fromJS({ endpoints: updatedMockState.get('endpoints') }));
    DeleteTransferListItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('should update TransferListForm when a transferListItem is removed from an unsaved transferList', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      transferListItemId: 'mockEndpointUUID1'
    });
    getSelectedEntity.mockImplementation(() => mockState);
    getSelectedEntityId.mockImplementation(() => 'create');
    getCurrentFormValueByFieldName.mockImplementation(() => mockState.get('endpoints'));
    RemoveTransferListItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('should update TransferListForm when transferListItems belong to the same group are removed from an unsaved transferList', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      categoryId: 'mockCategoryUUID1'
    });
    getSelectedEntityId.mockImplementation(() => 'create');
    getCurrentFormValueByFieldName.mockImplementation(() => mockState.get('endpoints'));
    RemoveTransferListItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('should initialize TransferListForm when transferListItems belong to the same group are removed from an unsaved transferList', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_TRANSFER_LIST_ITEM',
      transferListItemId: 'mockEndpointUUID1'
    });
    const updatedMockState = mockState.update('endpoints', endpoints => endpoints.get(0));
    getSelectedEntityId.mockImplementation(() => 'create');
    getCurrentFormValueByFieldName
      .mockImplementationOnce(() => fromJS({ endpoints: updatedMockState.get('endpoints') }))
      .mockImplementationOnce(() => updatedMockState.get('name'))
      .mockImplementationOnce(() => updatedMockState.get('description'));
    RemoveTransferListItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
