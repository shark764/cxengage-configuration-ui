/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { generateUUID } from 'serenova-js-utils/uuid';
import * as dispositionListSelectors from '../selectors';
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

describe('DispositionListsForm selectors', () => {
  // mockData:
  const mockState = fromJS({
    Entities: {
      dispositionLists: {
        data: [
          {
            id: 'mockDispositionListId1',
            name: 'mockDispositionListName1',
            description: 'mockDispositionListDescription1',
            active: true,
            shared: false
          },
          {
            id: 'mockDispositionListId2',
            name: 'mockDispositionListName2',
            description: 'mockDispositionListDescription2',
            active: false,
            shared: true
          }
        ],
        selectedEntityId: 'create'
      },
      dispositions: {
        data: [
          {
            id: 'mockDispositionId1',
            name: 'mockDispName1',
            active: true,
            shared: false
          },
          {
            id: 'mockDispositionId2',
            name: 'mockDispName2',
            active: false,
            shared: false
          },
          {
            id: 'updatedMockDispositionId',
            name: 'updatedMockDispName',
            active: true,
            shared: true
          }
        ]
      },
      currentEntity: 'dispositionLists',
      form: {
        dispositionListMockId: {
          values: {
            dispositions: [
              {
                hierarchy: ['mockHierarchy1'],
                categoryUUID: 'mockCategoryUUID1',
                name: 'mockDispName1',
                dispositionId: 'mockDispositionId1',
                endpointUUID: 'mockDispositionUUID1',
                droppableUUID: 'mockDroppableUUID1'
              },
              {
                hierarchy: ['mockHierarchy1'],
                name: 'mockDispName2',
                dispositionId: 'mockDispositionId2',
                endpointUUID: 'mockDispositionUUID2',
                droppableUUID: 'mockDroppableUUID2'
              },
              {
                hierarchy: ['mockHierarchy2'],
                categoryUUID: 'mockCategoryUUID2',
                name: 'mockDispName3',
                dispositionId: 'mockDispositionId3',
                endpointUUID: 'mockDispositionUUID3',
                droppableUUID: 'mockDroppableUUID3'
              }
            ]
          }
        }
      }
    }
  });
  let mockProps, mockDispositions;
  beforeEach(() => {
    mockProps = {
      values: fromJS({
        id: 'mockDispositionId1',
        disposition: 'mockDispositionId1',
        hierarchy: ['updateMockHierarchy'],
        endpointUUID: 'mockDispositionUUID1'
      }),
      initialValues: fromJS({
        id: 'mockDispositionId1',
        disposition: 'mockDispositionId1',
        hierarchy: ['mockHierarchy1']
      })
    };
    mockDispositions = mockState.getIn(['Entities', 'form', 'dispositionListMockId', 'values', 'dispositions']);
    const mockDispositionsData = mockState.getIn(['Entities', 'dispositions', 'data']);
    generateUUID.mockImplementation(() => 'mockGenerateUUID');
    getCurrentFormValueByFieldName.mockImplementation(() => mockDispositions);
    getCurrentSubmittingFormProps.mockImplementation(() => mockProps);
    getEntityData.mockImplementation(() => mockDispositionsData);
  });

  // DispositionList form initial values selectors:
  it('Gets initial values while creating a new dispositionList', () => {
    getSelectedEntity.mockImplementation(() => mockState);
    getSelectedEntityId.mockImplementation(() => 'create');
    expect(dispositionListSelectors.dispositionListsInitialValues(mockState)).toMatchSnapshot();
  });
  it('Gets initial values when an existing dispositionList is selected', () => {
    const updateState = mockState.updateIn(
      ['Entities', 'dispositionLists', 'selectedEntityId'],
      () => 'mockDispositionListId1'
    );
    getSelectedEntity.mockImplementation(() => mockState.getIn(['Entities', 'dispositionLists', 'data', 0]));
    getSelectedEntityId.mockImplementation(() => 'mockDispositionListId1');
    expect(dispositionListSelectors.dispositionListsInitialValues(updateState)).toMatchSnapshot();
  });
  it('Gets currently selected dispositionList dispositions', () => {
    expect(dispositionListSelectors.currentFormDispositions(mockDispositions)).toMatchSnapshot();
  });

  // Selects DispositionListItem (subEntityForm) field values:
  it('Checks whether the dispositionListItem is being created in an existing category', () => {
    getCurrentSubFormValueByFieldName.mockImplementation(() => true);
    expect(dispositionListSelectors.isUserCreatingNewCategory()).toEqual(true);
  });
  it('Gets the hierarchy input field value of the dispositionListItem that is being created', () => {
    getCurrentSubFormValueByFieldName.mockImplementation(() => 'mockHierarchyName');
    expect(dispositionListSelectors.hierarchyInputText()).toEqual('mockHierarchyName');
  });
  it('user should be able to select one of the existing category names while creating a dispositionListItem', () => {
    expect(dispositionListSelectors.selectExistingCategories()).toMatchSnapshot();
  });

  // Dispositions selectors:

  // dispositionListItem (subEntityForm) update selectors:
  it('Gets all of the dispositionListItem values to display in the respective fields while updating a dispositionListItem', () => {
    getSelectedSubEntityId.mockImplementation(() => 'updateDispositionListItem:mockDispositionUUID1');
    expect(dispositionListSelectors.getSelectedDispositionListItemValues()).toMatchSnapshot();
  });
  it('Gets category header value to display in the categoryName field while updating category header', () => {
    getSelectedSubEntityId.mockImplementation(() => 'updateCategoryHeader:mockCategoryUUID1');
    expect(
      dispositionListSelectors.getSelectedDispositionListItemValues('updateCategoryHeader:mockCategoryUUID1')
    ).toMatchSnapshot();
  });
  it('adds UUIDS to the dispositionListItem that is going to be added to the dispositionList', () => {
    getCurrentSubmittingFormValues.mockImplementation(() => mockProps.initialValues);
    expect(dispositionListSelectors.selectDispositionUUIDS()).toMatchSnapshot();
  });

  // dispositionList (mainEntityForm):
  it('updates dispositionList dispositions (mainEntityForm values) when adding dispositionListItem to a new dispositionList', () => {
    getCurrentSubmittingFormValues.mockImplementation(() => mockProps.values);
    getCurrentFormValueByFieldName.mockImplementation(() => undefined);

    expect(dispositionListSelectors.dispositionListItemCreateValues(undefined)).toMatchSnapshot();
  });
  it('updates dispositionList dispositions (mainEntityForm values) when adding dispositionListItem to an existing dispositionList', () => {
    getCurrentSubmittingFormValues.mockImplementation(() => mockProps.values);

    expect(dispositionListSelectors.dispositionListItemCreateValues(mockDispositions)).toMatchSnapshot();
  });
  it('updates dispositionList dispositions (mainEntityForm values) when updating one of its dispositionListItem values', () => {
    getSelectedSubEntityId.mockImplementationOnce(() => 'updateDispositionListItem:mockDispositionListId1');

    expect(
      dispositionListSelectors.dispositionListItemUpdateValues('updateDispositionListItem:mockDispositionListId1')
    ).toMatchSnapshot();
  });
  it('updates dispositionList dispositions (mainEntityForm values) when updating one of its dispositionListItem category header', () => {
    getSelectedSubEntityId.mockImplementation(() => 'updateCategoryHeader:mockDispositionListId1');

    expect(
      dispositionListSelectors.dispositionListItemUpdateValues('updateCategoryHeader:mockDispositionListId1')
    ).toMatchSnapshot();
  });
  it('select dispositions that only contains categoryHeaders', () => {
    expect(dispositionListSelectors.selectDispositionsHeaders(mockDispositions)).toMatchSnapshot();
  });
});
