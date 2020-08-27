/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import * as selectors from '../selectors';
import { generateUUID } from 'serenova-js-utils/uuid';
import { fromJS } from 'immutable';

import { getCurrentFormValues, isFormDirty } from '../../../form/selectors';
import { getEntities, getSelectedEntity, getSelectedSubEntityId, getSelectedEntityId } from '../../selectors';
import { getContactAttributesNames, getMandatoryContactAttributes } from '../../contactAttributes/selectors';

jest.mock('../../selectors');
jest.mock('../../../form/selectors');
jest.mock('serenova-js-utils/uuid');
jest.mock('../../contactAttributes/selectors');

// mockData:
const mockState = fromJS({
  Entities: {
    contactLayouts: {
      data: [
        {
          id: 'mockContactLayoutId1',
          name: 'mockContactLayoutName1',
          description: 'mockContactLayoutDescription1',
          active: true
        },
        {
          id: 'mockContactLayoutId1',
          name: 'mockContactLayoutName2',
          description: 'mockContactLayoutDescription2',
          active: false
        }
      ],
      selectedEntityId: 'mockSelectedEntityId',
      selectedSubEntityId: 'createListItem:mockCategoryUUID1'
    },
    contactAttributes: {
      data: [
        {
          id: 'mockcontactAttributeId1',
          name: 'mockContactAttributeName1',
          active: true,
          mandatory: true
        },
        {
          id: 'mockContactAttributeId2',
          name: 'mockContactAttributeName2',
          active: false
        }
      ]
    },
    currentEntity: 'contactLayouts'
  },
  form: {
    contactLayoutMockId: {
      values: {
        id: 'mockContactLayoutId',
        name: 'mockLayoutName',
        layout: [
          {
            draggableUUID: 'mockDraggableUUID1',
            categoryUUID: 'mockCategoryUUID1',
            endpointUUID: 'mockEndpointUUID1',
            droppableUUID: 'mockDroppableUUID1',
            hierarchy: 'mockHierarchy1',
            name: 'mockContactAttributeName1',
            contactAttributeId: 'mockContactAttributeId1',
            label: { 'en-US': 'hierarchyInEnglish', 'fr-CA': 'hierarchyInFrench' }
          },
          {
            draggableUUID: 'mockDraggableUUID2',
            categoryUUID: 'mockCategoryUUID2',
            endpointUUID: 'mockEndpointUUID2',
            droppableUUID: 'mockDroppableUUID2',
            hierarchy: 'mockHierarchy2',
            name: 'mockContactAttributeName2',
            contactAttributeId: 'mockContactAttributeId2',
            label: { 'en-US': 'hierarchyInEnglish', 'fr-CA': 'hierarchyInFrench' }
          },
          {
            draggableUUID: 'mockDraggableUUID2',
            categoryUUID: 'mockCategoryUUID2',
            endpointUUID: 'mockEndpointUUID3',
            droppableUUID: 'mockDroppableUUID3',
            hierarchy: 'mockHierarchy2',
            name: 'mockContactAttributeName3',
            contactAttributeId: 'mockContactAttributeId3',
            label: { 'en-US': 'hierarchyInEnglish', 'fr-CA': 'hierarchyInFrench' }
          }
        ]
      }
    }
  }
});

describe('contactLayouts selector tests', () => {
  describe('getContactLayoutsFormInitialValues', () => {
    it('while creating a contact layout', () => {
      getSelectedEntity.mockImplementation(() => undefined);
      getSelectedEntityId.mockImplementation(() => 'create');
      expect(selectors.getContactLayoutsFormInitialValues()).toMatchSnapshot();
    });
    it('while updating a contact layout', () => {
      getSelectedEntity.mockImplementation(() => mockState.getIn(['Entities', 'contactLayouts', 'data', 0]));
      getSelectedEntityId.mockImplementation(() => 'mockSelectedEntityId');
      expect(selectors.getContactLayoutsFormInitialValues(mockState)).toMatchSnapshot();
    });
  });
  it('selectContactLayoutsHeaders', () => {
    getCurrentFormValues.mockImplementation(() => mockState.getIn(['form', 'contactLayoutMockId', 'values']));
    expect(selectors.selectContactLayoutsHeaders()).toMatchSnapshot();
  });
  it('isCurrentFormMissingMandatoryAttributes', () => {
    getMandatoryContactAttributes.mockImplementation(() => mockState.getIn(['Entities', 'contactAttributes', 'data']));
    expect(selectors.isCurrentFormMissingMandatoryAttributes()).toMatchSnapshot();
  });
  it('getExistingCategories', () => {
    expect(selectors.getExistingCategories()).toMatchSnapshot();
  });
  it('getExistingCategoryNamesInCurrentLayout', () => {
    expect(selectors.getExistingCategoryNamesInCurrentLayout()).toMatchSnapshot();
  });
  it('getContactLayoutsFormSubmitValues', () => {
    getSelectedEntityId.mockImplementation(() => 'create');
    expect(selectors.getContactLayoutsFormSubmitValues()).toMatchSnapshot();
  });
  it('getAvailableContactAttributesNames', () => {
    getContactAttributesNames.mockImplementation(() =>
      fromJS([
        'mockContactAttributeName1',
        'mockContactAttributeName2',
        'mockContactAttributeName3',
        'mockContactAttributeName4'
      ])
    );
    expect(selectors.getAvailableContactAttributesNames()).toMatchSnapshot();
  });
  describe('getContactLayoutsSubEntityFormInitialValues', () => {
    it('while creating a new category', () => {
      getSelectedSubEntityId.mockImplementation(() => 'create');
      generateUUID.mockImplementation(() => 'mokcUUID');
      expect(selectors.getContactLayoutsSubEntityFormInitialValues()).toMatchSnapshot();
    });
    it('while updating a layout item', () => {
      getSelectedSubEntityId.mockImplementation(() => 'createListItem:mockCategoryUUID1');
      expect(selectors.getContactLayoutsSubEntityFormInitialValues(mockState)).toMatchSnapshot();
    });
    it('while creating a list item in the category', () => {
      getSelectedSubEntityId.mockImplementation(() => 'updateCategoryHeader:mockCategoryUUID1');
      expect(selectors.getContactLayoutsSubEntityFormInitialValues(mockState)).toMatchSnapshot();
    });
  });
  describe('getContactLayoutsSubEntityFormSubmitValues', () => {
    it('while creating a new contactLayout Item', () => {
      const props = {
        selectedSubEntityId: 'create',
        values: fromJS({
          label: [
            {
              label: 'hierarchyInEnglish',
              language: 'en-US'
            }
          ],
          contactAttributeId: 'mockContactAttributeId4',
          name: 'mockContactAttributeName4',
          hierarchy: 'Mandatory Attributes',
          categoryUUID: 'mockCategoryUUID4'
        })
      };
      expect(selectors.getContactLayoutsSubEntityFormSubmitValues(mockState, props)).toMatchSnapshot();
    });
    it('while creating updating a contactLayout Item', () => {
      const props = {
        selectedSubEntityId: 'updateCategoryHeader:mockCategoryUUID1',
        values: fromJS({
          label: [
            {
              label: 'hierarchyInEnglish',
              language: 'en-US'
            }
          ],
          contactAttributeId: 'mockContactAttributeId4',
          name: 'mockContactAttributeName4',
          hierarchy: 'Mandatory Attributes',
          categoryUUID: 'mockCategoryUUID1'
        })
      };
      expect(selectors.getContactLayoutsSubEntityFormSubmitValues(mockState, props)).toMatchSnapshot();
    });
  });
  it('getActiveContactLayouts', () => {
    getEntities.mockImplementation(() => mockState.get('Entities'));
    expect(selectors.getActiveContactLayouts()).toMatchSnapshot();
  });
  it('shouldDisableContactLayoutsStatusToggle', () => {
    isFormDirty.mockImplementation(() => true);
    expect(selectors.shouldDisableContactLayoutsStatusToggle()).toMatchSnapshot();
  });
});
