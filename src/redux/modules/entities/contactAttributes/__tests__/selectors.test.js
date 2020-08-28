/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import * as selectors from '../selectors';
import { fromJS } from 'immutable';

import { getCurrentFormValues } from '../../../form/selectors';
import { getEntities, getSelectedEntity, getSelectedEntityId } from '../../selectors';

jest.mock('../../selectors');
jest.mock('../../../form/selectors');

// mockData:
const mockState = fromJS({
  Entities: {
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
    currentEntity: 'contactAttributes'
  },
  form: {
    contactAttributesMockId: {
      values: {
        id: 'mockContactAttributeId',
        name: 'mockAttributeName',
        default: 'mockDefault',
        mandatory: 'false',
        label: { 'en-US': 'hierarchyInEnglish', 'fr-CA': 'hierarchyInFrench' }
      }
    }
  }
});

describe('contactAttributes selector tests', () => {
  describe('getContactAttributesFormInitialValues', () => {
    it('while creating a contact attribute', () => {
      getSelectedEntity.mockImplementation(() => mockState.getIn(['form', 'contactAttributesMockId', 'values']));
      getSelectedEntityId.mockImplementation(() => 'create');
      expect(selectors.selectContactAttributeFormInitalValues()).toMatchSnapshot();
    });
    it('while updating a contact attribute', () => {
      getSelectedEntity.mockImplementation(() => mockState.getIn(['form', 'contactAttributesMockId', 'values']));
      getSelectedEntityId.mockImplementation(() => 'mockSelectedEntityId');
      expect(selectors.selectContactAttributeFormInitalValues(mockState)).toMatchSnapshot();
    });
  });
  it('getContactAttributesNames', () => {
    const props = fromJS({
      id: 'mockContactAttributeId',
      name: 'mockAttributeName',
      default: 'mockDefault',
      mandatory: 'false',
      label: { 'en-US': 'hierarchyInEnglish', 'fr-CA': 'hierarchyInFrench' }
    });
    expect(selectors.getContactAttributesNames(props)).toMatchSnapshot();
  });
  describe('getContactAttributesFormSubmitValues', () => {
    it('while creating a new contactAttributes Item', () => {
      const props = fromJS({
        active: 'true',
        default: 'mockDefault',
        mandatory: 'mockMandatory',
        label: [
          {
            label: 'hierarchyInEnglish',
            language: 'en-US'
          }
        ]
      });
      getCurrentFormValues.mockImplementation(() => props);
      getSelectedEntityId.mockImplementation(() => 'create');

      expect(selectors.getContactAttributesFormSubmitValues(props)).toMatchSnapshot();
    });
    it('while updating a contactAttributes Item', () => {
      const props = fromJS({
        active: 'true',
        default: 'mockDefault1',
        mandatory: 'mockMandatory1',
        label: [
          {
            label: 'hierarchyInChinese',
            language: 'zhs-CN'
          }
        ]
      });
      getCurrentFormValues.mockImplementation(() => props);
      getSelectedEntityId.mockImplementation(() => 'update');
      expect(selectors.getContactAttributesFormSubmitValues(props)).toMatchSnapshot();
    });
  });
  it('getContactAttributes', () => {
    getEntities.mockImplementation(() => mockState.get('Entities'));
    expect(selectors.getContactAttributes()).toMatchSnapshot();
  });
});
